import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ListRenderItem,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useFocusEffect } from 'expo-router';
import peopleJson from '../../../data/people.json';

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
  topics: string[];
}

const FILTERS = [
  'All',
  'Study Tips',
  'Exam Stress',
  'Mindful Breaks',
  'Time Management',
  'Self-Care Strategies',
];

export default function PeopleScreen() {
  const router = useRouter();
  const [data, setData] = useState<Person[]>([]);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [openCommentsFor, setOpenCommentsFor] = useState<Set<string>>(new Set());
  const [newComments, setNewComments] = useState<Record<string, string>>({});
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  // carica i post statici + quelli creati in add
  const loadData = async () => {
    const base = await Promise.all(
      (peopleJson as Person[]).map(async post => {
        try {
          const stored = await AsyncStorage.getItem(`comments-${post.id}`);
          const comments = stored ? JSON.parse(stored) : post.comments;
          return { ...post, comments };
        } catch {
          return { ...post, comments: post.comments };
        }
      })
    );
    const extra = await AsyncStorage.getItem('newComments');
    const extras: Person[] = extra ? JSON.parse(extra) : [];
    setData([...extras, ...base]);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedFilter])
  );

  const onToggleLike = (postId: string) => {
    setData(prev =>
      prev.map(post => {
        if (post.id !== postId) return post;
        const liked = likedIds.has(postId);
        return {
          ...post,
          likes: liked ? post.likes - 1 : post.likes + 1,
        };
      })
    );
    setLikedIds(prev => {
      const next = new Set(prev);
      next.has(postId) ? next.delete(postId) : next.add(postId);
      return next;
    });
  };

  const toggleComments = (postId: string) => {
    setOpenCommentsFor(prev => {
      const next = new Set(prev);
      next.has(postId) ? next.delete(postId) : next.add(postId);
      return next;
    });
  };

  const addComment = async (postId: string) => {
    const text = newComments[postId]?.trim();
    if (!text) return;
    const updated = data.map(post => {
      if (post.id !== postId) return post;
      const c: Comment = {
        id: `${postId}-${post.comments.length + 1}`,
        author: 'You',
        text,
        timestamp: 'just now',
      };
      return { ...post, comments: [...post.comments, c] };
    });
    setData(updated);
    setNewComments(prev => ({ ...prev, [postId]: '' }));
    await AsyncStorage.setItem(
      `comments-${postId}`,
      JSON.stringify(updated.find(p => p.id === postId)!.comments)
    );
  };

  const filtered = data.filter(p =>
    selectedFilter === 'All' ? true : p.topics.includes(selectedFilter)
  );

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
              <MaterialCommunityIcons
                name={liked ? 'heart' : 'heart-outline'}
                size={20}
                color={liked ? '#e74c3c' : '#888'}
              />
              <Text style={styles.footerText}>{item.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => toggleComments(item.id)}
              style={styles.iconWithText}
            >
              <Feather
                name="message-circle"
                size={20}
                color={isOpen ? '#FFA037' : '#888'}
              />
              <Text style={styles.footerText}>{item.comments.length}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialCommunityIcons name="share" size={20} color="#888" />
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
    <View style={styles.vertical}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterBar}
      >
        {FILTERS.map(filter => (
          <TouchableOpacity
            key={filter}
            onPress={() => setSelectedFilter(filter)}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.filterButtonActive,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter && styles.filterTextActive,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList<Person>
        style={styles.verticalChat}
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-start',
          padding: 16,
          paddingBottom: Platform.OS === 'ios' ? 120 : 110,
        }}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push({ pathname: '/people/add' })}
      >
        <View style={styles.fabInner}>
          <Ionicons name="pencil" size={24} color="#fff" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  vertical: {
    display: 'flex',
    flexDirection: 'column',
  },
  verticalChat: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 10,
  },
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    maxHeight: 60,
  },
  filterButton: {
    height: 36,
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginRight: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  filterButtonActive: {
    backgroundColor: '#FFA037',
  },
  filterText: {
    fontSize: 14,
    color: '#888',
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: '600',
  },

  card: {
    flexDirection: 'row',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 10,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  body: {
    flex: 1,
    marginLeft: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  time: {
    color: '#888',
    fontSize: 12,
  },
  content: {
    marginBottom: 8,
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconWithText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    marginLeft: 4,
    color: '#888',
    fontSize: 12,
  },
  commentsContainer: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  commentCard: {
    marginBottom: 8,
  },
  commentAuthor: {
    fontWeight: '600',
  },
  commentText: {
    fontSize: 14,
    marginVertical: 2,
  },
  commentTime: {
    fontSize: 12,
    color: '#888',
  },
  addCommentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },

  fab: {
    position: 'absolute',
    right: 16,
    bottom: Platform.OS === 'ios' ? 100 : 80,
    zIndex: 10,
  },
  fabInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFA037',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
});
