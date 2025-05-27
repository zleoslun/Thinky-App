import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const FILTERS = [
  'Study Tips',
  'Exam Stress',
  'Mindful Breaks',
  'Time Management',
  'Self-Care Strategies',
];

export default function AddCommentScreen() {
  const router = useRouter();
  const [text, setText] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const send = async () => {
    if (!text.trim()) return;
    const newComment = {
      id: Date.now().toString(),
      author: 'You',
      text,
      timestamp: 'just now',
      topics: tags,
    };
    // recupera array esistente, aggiungi e salva
    const stored = await AsyncStorage.getItem('newComments');
    const arr = stored ? JSON.parse(stored) : [];
    arr.unshift(newComment);
    await AsyncStorage.setItem('newComments', JSON.stringify(arr));
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>New Comment</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Write your comment..."
        multiline
        value={text}
        onChangeText={setText}
      />

      <Text style={styles.label}>Select tags (opt):</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tagsBar}
      >
        {FILTERS.map(tag => (
          <TouchableOpacity
            key={tag}
            onPress={() => toggleTag(tag)}
            style={[
              styles.tagButton,
              tags.includes(tag) && styles.tagButtonActive,
            ]}
          >
            <Text
              style={[
                styles.tagText,
                tags.includes(tag) && styles.tagTextActive,
              ]}
            >
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => router.back()} style={styles.cancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={send} style={styles.send}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: '600' },

  input: {
    flex: 1,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },

  label: { marginBottom: 8, fontSize: 14, fontWeight: '500' },
  tagsBar: { flexDirection: 'row', paddingBottom: 16 },
  tagButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f2f2f2',
    borderRadius: 16,
    marginRight: 8,
  },
  tagButtonActive: { backgroundColor: '#FFA037' },
  tagText: { color: '#555' },
  tagTextActive: { color: '#fff' },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  cancel: { padding: 12 },
  cancelText: { color: '#888', fontSize: 16 },
  send: {
    backgroundColor: '#FFA037',
    borderRadius: 6,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  sendText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
