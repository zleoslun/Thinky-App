// app/(tabs)/people/index.tsx
import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  ScrollView,
  Modal,
  Alert,
  Share,
} from 'react-native';
import {
  Ionicons,
  MaterialCommunityIcons,
  Feather,
} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useFocusEffect } from 'expo-router';
import peopleJson from '../../../data/people.json';

const FILTERS = ['All', 'Study Tips', 'Exam Stress', 'Mindful Breaks', 'Time Management', 'Self-Care Strategies'];

export default function PeopleScreen() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [likedIds, setLikedIds] = useState(new Set());
  const [openCommentsFor, setOpenCommentsFor] = useState(new Set());
  const [newComments, setNewComments] = useState({});
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const loadLikes = async () => {
    const raw = await AsyncStorage.getItem('likedIds');
    const arr = raw ? JSON.parse(raw) : [];
    return new Set(arr);
  };

  const loadData = async () => {
    const storedLikes = await loadLikes();
    const base = await Promise.all(
      peopleJson.map(async post => {
        const stored = await AsyncStorage.getItem(`comments-${post.id}`);
        const comments = stored ? JSON.parse(stored) : post.comments;
        const isLiked = storedLikes.has(post.id);
        return { ...post, comments, likes: post.likes + (isLiked ? 1 : 0) };
      })
    );
    const rawExtras = await AsyncStorage.getItem('newComments');
    const commentsOnly = rawExtras ? JSON.parse(rawExtras) : [];
    const extras = commentsOnly.map(c => ({
      id: c.id,
      name: c.author,
      avatar: 'https://i.pravatar.cc/150?img=9',
      timestamp: c.timestamp,
      content: c.text,
      likes: storedLikes.has(c.id) ? 1 : 0,
      comments: [],
      topics: c.topics || [],
      isExtra: true,
    }));
    setLikedIds(storedLikes);
    setData([...extras, ...base]);
  };

  useEffect(() => {
    loadData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedFilter])
  );

  const onToggleLike = postId => {
    setLikedIds(prev => {
      const next = new Set(prev);
      const delta = next.has(postId) ? -1 : 1;
      next.has(postId) ? next.delete(postId) : next.add(postId);
      setData(d =>
        d.map(post =>
          post.id !== postId ? post : { ...post, likes: post.likes + delta }
        )
      );
      AsyncStorage.setItem('likedIds', JSON.stringify(Array.from(next)));
      return next;
    });
  };

  const shareItem = async item => {
    try {
      if (Platform.OS === 'web' && navigator.share) {
        await navigator.share({ title: item.name, text: item.content });
      } else {
        await Share.share({ title: item.name, message: item.content });
      }
    } catch {}
  };

  const toggleComments = postId => {
    setOpenCommentsFor(prev => {
      const next = new Set(prev);
      next.has(postId) ? next.delete(postId) : next.add(postId);
      return next;
    });
  };

  const addComment = async postId => {
    const text = (newComments[postId] || '').trim();
    if (!text) return;
    const updated = data.map(post =>
      post.id !== postId
        ? post
        : {
            ...post,
            comments: [
              ...post.comments,
              { id: `${postId}-${post.comments.length + 1}`, author: 'You', text, timestamp: 'just now' },
            ],
          }
    );
    setData(updated);
    setNewComments(nc => ({ ...nc, [postId]: '' }));
    await AsyncStorage.setItem(`comments-${postId}`, JSON.stringify(updated.find(p => p.id === postId).comments));
  };

  const confirmDeleteExtra = id => {
    setPendingDeleteId(id);
    setShowConfirm(true);
  };
  const deleteExtra = async id => {
    const raw = await AsyncStorage.getItem('newComments');
    const arr = raw ? JSON.parse(raw) : [];
    const filtered = arr.filter(c => c.id !== id);
    await AsyncStorage.setItem('newComments', JSON.stringify(filtered));
    loadData();
  };
  const onConfirmDelete = () => {
    if (pendingDeleteId) deleteExtra(pendingDeleteId);
    setShowConfirm(false);
    setPendingDeleteId(null);
  };
  const onCancelDelete = () => {
    setShowConfirm(false);
    setPendingDeleteId(null);
  };

  const confirmDeleteReply = (postId, commentId) => {
    if (Platform.OS === 'web') {
      if (window.confirm('Are you sure you want to delete this comment?')) deleteReply(postId, commentId);
    } else {
      Alert.alert('Delete comment?', 'Are you sure you want to delete this comment?', [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => deleteReply(postId, commentId) },
      ]);
    }
  };
  const deleteReply = async (postId, commentId) => {
    const updated = data.map(post =>
      post.id !== postId ? post : { ...post, comments: post.comments.filter(c => c.id !== commentId) }
    );
    setData(updated);
    await AsyncStorage.setItem(`comments-${postId}`, JSON.stringify(updated.find(p => p.id === postId).comments));
  };

  const filtered = data.filter(p => (selectedFilter === 'All' ? true : p.topics.includes(selectedFilter)));

  const renderItem = ({ item }) => {
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
            <View style={styles.leftIcons}>
              <TouchableOpacity onPress={() => onToggleLike(item.id)} style={styles.iconWithText}>
                <MaterialCommunityIcons name={liked ? 'heart' : 'heart-outline'} size={20} color={liked ? '#e74c3c' : '#888'} />
                <Text style={styles.footerText}>{item.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toggleComments(item.id)} style={styles.iconWithText}>
                <Feather name="message-circle" size={20} color={isOpen ? '#FFA037' : '#888'} />
                <Text style={styles.footerText}>{item.comments.length}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => shareItem(item)}>
                <MaterialCommunityIcons name="share" size={20} color="#888" />
              </TouchableOpacity>
            </View>
            {item.isExtra && (
              <TouchableOpacity onPress={() => confirmDeleteExtra(item.id)} style={styles.trashIcon}>
                <MaterialCommunityIcons name="delete-outline" size={20} color="#888" />
              </TouchableOpacity>
            )}
          </View>
          {isOpen && (
            <View style={styles.commentsContainer}>
              {item.comments.map(c => (
                <View key={c.id} style={styles.commentCard}>
                  <Text style={styles.commentAuthor}>{c.author}</Text>
                  <Text style={styles.commentText}>{c.text}</Text>
                  <Text style={styles.commentTime}>{c.timestamp}</Text>
                  {c.author === 'You' && (
                    <TouchableOpacity onPress={() => confirmDeleteReply(item.id, c.id)} style={styles.replyTrash}>
                      <MaterialCommunityIcons name="trash-can-outline" size={16} color="#888" />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
              <View style={styles.addCommentRow}>
                <TextInput
                  style={styles.input}
                  placeholder="Write a comment..."
                  placeholderTextColor="#999"
                  value={newComments[item.id] || ''}
                  onChangeText={t => setNewComments(nc => ({ ...nc, [item.id]: t }))}
                />
                <TouchableOpacity style={styles.sendButton} onPress={() => addComment(item.id)}>
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
      <Text style={styles.subtitle}>Wellness Hub</Text>
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterBar}>
          {FILTERS.map(filter => (
            <TouchableOpacity
              key={filter}
              onPress={() => setSelectedFilter(filter)}
              style={[styles.filterButton, selectedFilter === filter && styles.filterButtonActive]}>
              <Text style={[styles.filterText, selectedFilter === filter && styles.filterTextActive]}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <FlatList data={filtered} keyExtractor={i => i.id} renderItem={renderItem} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: Platform.OS === 'ios' ? 120 : 110, marginTop: 12 }} />
      <TouchableOpacity style={styles.fab} onPress={() => router.push({ pathname: '/people/add' })}>
        <View style={styles.fabInner}>
          <Ionicons name="pencil" size={24} color="#fff" />
        </View>
      </TouchableOpacity>
      <Modal transparent visible={showConfirm} animationType="fade" onRequestClose={onCancelDelete}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Delete post?</Text>
            <Text style={styles.modalMessage}>Are you sure you want to delete this post?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalBtn, styles.modalCancel]} onPress={onCancelDelete}>
                <Text style={styles.modalBtnText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, styles.modalConfirm]} onPress={onConfirmDelete}>
                <Text style={styles.modalBtnText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  vertical: { flex: 1, backgroundColor: '#fff' },
  subtitle: { fontSize: 30, fontWeight: '600', padding: 16 },
  filterContainer: { height: 60, justifyContent: 'center', paddingBottom: 16 },
  filterBar: { paddingHorizontal: 16, paddingVertical: 8, alignItems: 'center' },
  filterButton: { height: 36, paddingHorizontal: 16, justifyContent: 'center', backgroundColor: '#eee', borderRadius: 12, marginRight: 8 },
  filterButtonActive: { backgroundColor: '#FFA037' },
  filterText: { fontSize: 14, color: '#888' },
  filterTextActive: { color: '#fff', fontWeight: '600' },
  card: { flexDirection: 'row', marginBottom: 24, borderBottomWidth: 1, borderColor: '#eee', paddingBottom: 10 },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  body: { flex: 1, marginLeft: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  name: { fontWeight: 'bold', fontSize: 16 },
  time: { color: '#888', fontSize: 12 },
  content: { marginBottom: 8, fontSize: 14 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  leftIcons: { flexDirection: 'row', alignItems: 'center' },
  iconWithText: { flexDirection: 'row', alignItems: 'center', marginRight: 16 },
  footerText: { marginLeft: 4, color: '#888', fontSize: 12 },
  trashIcon: { paddingHorizontal: 8 },
  commentsContainer: { marginTop: 12, borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 12 },
  commentCard: { marginBottom: 8, position: 'relative', paddingRight: 24 },
  commentAuthor: { fontWeight: '600' },
  commentText: { fontSize: 14, marginVertical: 2 },
  commentTime: { fontSize: 12, color: '#888' },
  replyTrash: { position: 'absolute', right: 0, top: 0, padding: 4 },
  addCommentRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, position: 'relative', paddingRight: 40 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 6, marginRight: 8 },
  sendButton: { position: 'absolute', right: 0, bottom: 0, padding: 8 },
  fab: { position: 'absolute', right: 16, bottom: Platform.OS === 'ios' ? 100 : 80, zIndex: 10 },
  fabInner: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#FFA037', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.2, shadowOffset: { width: 0, height: 4 }, shadowRadius: 6, elevation: 4 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { width: '80%', backgroundColor: '#fff', borderRadius: 12, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 5 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  modalMessage: { fontSize: 14, marginBottom: 16, color: '#333' },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end' },
  modalBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6, marginLeft: 8 },
  modalCancel: { backgroundColor: '#eee' },
  modalConfirm: { backgroundColor: '#FFA037' },
  modalBtnText: { fontSize: 14, fontWeight: '600', color: '#000' },
});
