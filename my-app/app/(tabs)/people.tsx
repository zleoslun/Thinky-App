// app/(tabs)/people.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ListRenderItem,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import peopleJson from '../../data/people.json';

// Tipi per persona e commento
interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}
interface Person {
  id: string;
  name: string;
  avatar: string;
  timestamp: string;
  content: string;
  likes: number;
  comments: Comment[];
}

export default function PeopleScreen() {
  const [data, setData] = useState<Person[]>([]);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [openCommentsFor, setOpenCommentsFor] = useState<Set<string>>(new Set());
  const [newComments, setNewComments] = useState<Record<string, string>>({});

  // Carica dati iniziali + commenti salvati
  useEffect(() => {
    (async () => {
      const loaded = await Promise.all(
        peopleJson.map(async post => {
          try {
            const stored = await AsyncStorage.getItem(`comments-${post.id}`);
            const comments = stored ? JSON.parse(stored) : post.comments;
            return { ...post, comments };
          } catch {
            return { ...post, comments: post.comments };
          }
        })
      );
      setData(loaded);
    })();
  }, []);

  // Toggle like
  const onToggleLike = (postId: string) => {
    setData(prev =>
      prev.map(post => {
        if (post.id !== postId) return post;
        const isLiked = likedIds.has(postId);
        return { ...post, likes: isLiked ? post.likes - 1 : post.likes + 1 };
      })
    );
    setLikedIds(prev => {
      const next = new Set(prev);
      next.has(postId) ? next.delete(postId) : next.add(postId);
      return next;
    });
  };

  // Toggle visualizzazione commenti
  const toggleComments = (postId: string) => {
    setOpenCommentsFor(prev => {
      const next = new Set(prev);
      next.has(postId) ? next.delete(postId) : next.add(postId);
      return next;
    });
  };

  // Aggiungi commento e salva localmente
  const addComment = async (postId: string) => {
    const text = newComments[postId]?.trim();
    if (!text) return;
    // aggiorna state
    const updated = data.map(post => {
      if (post.id !== postId) return post;
      const newComment: Comment = {
        id: `${postId}-${post.comments.length + 1}`,
        author: 'You',
        text,
        timestamp: 'just now',
      };
      return { ...post, comments: [...post.comments, newComment] };
    });
    setData(updated);
    // reset input
    setNewComments(prev => ({ ...prev, [postId]: '' }));
    // salva su AsyncStorage
    const savedComments = updated.find(p => p.id === postId)?.comments;
    if (savedComments) {
      await AsyncStorage.setItem(
        `comments-${postId}`,
        JSON.stringify(savedComments)
      );
    }
  };

  const renderItem: ListRenderItem<Person> = ({ item }) => {
    const liked = likedIds.has(item.id);
    const isOpen = openCommentsFor.has(item.id);

    return (
      <View style={styles.card}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.body}>
          <View style={styles.header}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.time}>{item.timestamp}</Text>
          </View>

          <Text style={styles.content}>{item.content}</Text>

          <View style={styles.footer}>
            <TouchableOpacity
              onPress={() => onToggleLike(item.id)}
              style={styles.iconWithText}
            >
              <Ionicons
                name={liked ? 'thumbs-up' : 'thumbs-up-outline'}
                size={20}
                color={liked ? '#FFA037' : '#888'}
              />
              <Text style={styles.footerText}>{item.likes}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => toggleComments(item.id)}
              style={styles.iconWithText}
            >
              <Ionicons
                name={isOpen ? 'chatbubble' : 'chatbubble-outline'}
                size={20}
                color={isOpen ? '#FFA037' : '#888'}
              />
              <Text style={styles.footerText}>{item.comments.length}</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Ionicons name="share-outline" size={20} color="#888" />
            </TouchableOpacity>
          </View>

          {isOpen && (
            <View style={styles.commentsContainer}>
              {item.comments.map(c => (
                <View key={c.id} style={styles.commentCard}>
                  <Text style={styles.commentAuthor}>{c.author}</Text>
                  <Text style={styles.commentText}>{c.text}</Text>
                  <Text style={styles.commentTime}>{c.timestamp}</Text>
                </View>
              ))}

              <View style={styles.addCommentRow}>
                <TextInput
                  style={styles.input}
                  placeholder="Write a comment..."
                  value={newComments[item.id] || ''}
                  onChangeText={t =>
                    setNewComments(prev => ({ ...prev, [item.id]: t }))
                  }
                />
                <TouchableOpacity onPress={() => addComment(item.id)}>
                  <Ionicons name="send" size={20} color="#FFA037" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <FlatList<Person>
      data={data}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 16 }}
    />
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', marginBottom: 24 },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  body: { flex: 1, marginLeft: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  name: { fontWeight: 'bold', fontSize: 16 },
  time: { color: '#888', fontSize: 12 },
  content: { marginBottom: 8, fontSize: 14 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  iconWithText: { flexDirection: 'row', alignItems: 'center' },
  footerText: { marginLeft: 4, color: '#888', fontSize: 12 },
  commentsContainer: { marginTop: 12, borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 12 },
  commentCard: { marginBottom: 8 },
  commentAuthor: { fontWeight: '600' },
  commentText: { fontSize: 14, marginVertical: 2 },
  commentTime: { fontSize: 12, color: '#888' },
  addCommentRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
});
