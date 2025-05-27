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

  const post = async () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newComment = {
      id: Date.now().toString(),
      author: 'You',
      text: trimmed,
      timestamp: 'just now',
      topics: tags,
    };
    const stored = await AsyncStorage.getItem('newComments');
    const arr = stored ? JSON.parse(stored) : [];
    arr.unshift(newComment);
    await AsyncStorage.setItem('newComments', JSON.stringify(arr));
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>New Comment</Text>
      </View>

      {/* AREA DI TESTO */}
      <TextInput
        style={styles.input}
        placeholder="Write your comment..."
        multiline
        value={text}
        onChangeText={setText}
      />

      {/* SELEZIONE TAG */}
      <Text style={styles.label}>Select tags (optional):</Text>
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

      {/* AZIONI IN FONDO */}
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => router.back()} style={styles.cancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={post} style={styles.post}>
          <Text style={styles.postText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        paddingBottom: Platform.OS === 'ios' ? 100 : 80
    },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },

  input: {
    height: 180,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },

  label: { marginBottom: 8, fontSize: 14, fontWeight: '500' },
  tagsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    height: 60,
    marginBottom: 16,      // spazio ridotto prima dei bottoni
  },
  tagButton: {
    height: 36,
    paddingHorizontal: 12,
    justifyContent: 'center',
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
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingTop: 12,       // ridotto
  },
  cancel: { paddingVertical: 8 }, 
  cancelText: { color: '#888', fontSize: 16 },

  post: {
    backgroundColor: '#FFA037',
    borderRadius: 6,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  postText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
