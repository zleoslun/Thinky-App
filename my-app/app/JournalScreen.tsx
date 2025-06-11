// app/JournalScreen.tsx
import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, Platform, Alert, View } from 'react-native';
import EntryCard from '@/components/EntryCard';
import EntryInput from '@/components/EntryInput';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../src/_context/AuthContext';

export default function JournalScreen() {
  const { user } = useAuth();
  const rawName = user?.name || user?.email?.split('@')[0] || 'friend';
  const userName = rawName.charAt(0).toUpperCase() + rawName.slice(1);

  const [freeText, setFreeText] = useState('');
  const [promptText, setPromptText] = useState('');
  const [pastEntries, setPastEntries] = useState([
    { date: 'April 29 at 10:11', text: 'Today I had a hard time staying focused...' },
    { date: 'April 28 at 18:44', text: 'I managed to finish all my tasks on time!' },
    { date: 'April 27 at 08:32', text: 'I felt a bit overwhelmed, but I took a walk.' },
    { date: 'April 26 at 14:02', text: 'Great talk with a friend — lifted my mood.' },
    { date: 'April 25 at 21:19', text: 'Learned something new and it was exciting!' },
  ]);

  const confirmAsync = (message: string): Promise<boolean> => {
    if (Platform.OS === 'web') {
      return Promise.resolve(window.confirm(message));
    }
    return new Promise(resolve => {
      Alert.alert(
        'Confirm',
        message,
        [
          { text: 'Cancel', style: 'cancel', onPress: () => resolve(false) },
          { text: 'OK', onPress: () => resolve(true) },
        ],
        { cancelable: true }
      );
    });
  };

  const addEntry = (text: string) => {
    const now = new Date();
    const today = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setPastEntries([{ date: `${today} at ${time}`, text }, ...pastEntries]);
  };

  const handleDelete = async (index: number) => {
    const ok = await confirmAsync('Are you sure you want to delete this entry?');
    if (!ok) return;
    setPastEntries(entries => entries.filter((_, i) => i !== index));
  };

  const handleEdit = async (index: number, newText: string) => {
    const ok = await confirmAsync('Do you want to save changes to this entry?');
    if (!ok) return;
    setPastEntries(entries => {
      const updated = [...entries];
      updated[index].text = newText;
      return updated;
    });
  };

  const promptList = [
    'What challenged you today and how did you respond?',
    'What are you grateful for today?',
    'Describe a moment you felt proud.',
    'What drained your energy today?',
    'What made you smile today?',
  ];
  const [promptInfo, setPromptInfo] = useState(promptList[0]);
  const getRandomPrompt = () => promptList[Math.floor(Math.random() * promptList.length)];

  return (
    <ScrollView contentContainerStyle={[styles.container, { paddingBottom: 100 }]}>
      <Text style={styles.title}>Today’s Journal</Text>
      <Text style={styles.subtitle}>
        Hello {userName} 👋 Writing can help you clear your mind and reduce stress
      </Text>

      <EntryInput
        label="Free Write"
        placeholder="Write whatever’s on your mind…"
        value={freeText}
        onChangeText={setFreeText}
        onSave={() => { addEntry(freeText); setFreeText(''); }}
      />

    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.pastTitle}>Guided Prompt</Text>
        <Ionicons
          name="shuffle"
          size={20}
          color="#371B34"
          style={styles.shuffleIcon}
          onPress={() => setPromptInfo(getRandomPrompt())}
        />
      </View>

      <EntryInput
        label="Guided Prompt"
        placeholder="Respond..."
        info={promptInfo}
        value={promptText}
        onChangeText={setPromptText}
        onSave={() => { addEntry(promptText); setPromptText(''); }}
      />

      <Text style={styles.pastTitle}>Past Entries</Text>
      {pastEntries.map((entry, index) => (
        <EntryCard
          key={index}
          date={entry.date}
          text={entry.text}
          onDelete={() => handleDelete(index)}
          onEdit={(newText: string) => handleEdit(index, newText)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#FBFBFB',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#371B34',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#371B34',
    marginBottom: 24,
  },
  shuffleIcon: {
    marginHorizontal: 16,
    color: '#371B34',
  },
  pastTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#371B34',
    marginTop: 12,
    marginBottom: 12,
  },
});
