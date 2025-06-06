// app/index.tsx


import * as React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import EntryCard from "@/components/EntryCard";
import EntryInput from "@/components/EntryInput";
import { Ionicons } from '@expo/vector-icons';


const JournalScreen = () => {
  const [freeText, setFreeText] = useState("");
  const [promptText, setPromptText] = useState("");
  
  const [pastEntries, setPastEntries] = useState([
    { date: "April 29 at 10:11", text: "Today I had a hard time staying focused..." },
    { date: "April 28 at 18:44", text: "I managed to finish all my tasks on time!" },
    { date: "April 27 at 08:32", text: "I felt a bit overwhelmed, but I took a walk." },
    { date: "April 26 at 14:02", text: "Great talk with a friend — lifted my mood." },
    { date: "April 25 at 21:19", text: "Learned something new and it was exciting!" },
  ]);

  const addEntry = (text: string) => {
    const now = new Date();
    const today = now.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const dateTime = `${today} at ${time}`;
    setPastEntries([{ date: dateTime, text }, ...pastEntries]);
  };

  const promptList = [
    "What challenged you today and how did you respond?",
    "What are you grateful for today?",
    "Describe a moment you felt proud.",
    "What drained your energy today?",
    "What made you smile today?",
  ];
  const [promptInfo, setPromptInfo] = useState(promptList[0]);

  const getRandomPrompt = () => {
    const random = promptList[Math.floor(Math.random() * promptList.length)];
    return random;
  };



  return (
    <ScrollView contentContainerStyle={[styles.container, { paddingBottom: 100 }]}>

      <Text style={styles.title}>Today’s Journal</Text>
      <Text style={styles.subtitle}>
        Writing can help you clear your mind and reduce stress
      </Text>

      <EntryInput
        label="Free Write"
        placeholder="Write whatever’s on your mind…"
        value={freeText}
        onChangeText={setFreeText}
        onSave={() => {
          addEntry(freeText);
          setFreeText("");
        }}

      />
      <View style={{ flexDirection: 'row', alignItems: 'center', margin:'1em'}}>
      <Text style={styles.pastTitle}>Guided Prompt</Text>
        <TouchableOpacity onPress={() => setPromptInfo(getRandomPrompt())}>
          <Ionicons name="shuffle" size={20} color="#371B34" style={styles.buttonShuffle} />
        </TouchableOpacity>
      </View>
      
      <EntryInput
        label="Guided Prompt"
        placeholder="Respond..."
        info={promptInfo}
        value={promptText}
        onChangeText={setPromptText}
        onSave={() => {
          addEntry(promptText);
          setPromptText("");
        }}

      />

      <Text style={styles.pastTitle}>Past Entries</Text>
      <Text style={styles.sectionTitle}>Past Entries</Text>

      {pastEntries.map((entry, index) => (
        <EntryCard
          key={index}
          date={entry.date}
          text={entry.text}
          onDelete={() => {
            const updated = pastEntries.filter((_, i) => i !== index);
            setPastEntries(updated);
          }}
          onEdit={(newText: string) => {
            const updated = [...pastEntries];
            updated[index].text = newText;
            setPastEntries(updated);
          }}
  />
))}

      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#FBFBFB",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#371B34",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#371B34",
    marginBottom: 24,
  },
  pastTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#371B34",
  },
  deleteButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
    padding: 6,
    backgroundColor: '#ffcccc',
    borderRadius: 6,
  },
  deleteText: {
    color: '#a00',
    fontWeight: 'bold',
  },
  buttonShuffle: {
    color: "#371B34",
    borderRadius: 9,
    padding: 10,
  }

});

export default JournalScreen;
