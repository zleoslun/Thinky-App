// app/index.tsx


import * as React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import EntryCard from "@/components/EntryCard";
import EntryInput from "@/components/EntryInput";


const JournalScreen = () => {
  const [freeText, setFreeText] = useState("");
  const [promptText, setPromptText] = useState("");
  const pastEntries = [
    { date: "April 29", text: "Today I had a hard time staying focused..." },
    { date: "April 28", text: "I managed to finish all my tasks on time!" },
    { date: "April 27", text: "I felt a bit overwhelmed, but I took a walk." },
    { date: "April 26", text: "Great talk with a friend — lifted my mood." },
    { date: "April 25", text: "Learned something new and it was exciting!" },
  ];


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
        onSave={() => console.log("Saved Free Text:", freeText)}
      />

      <EntryInput
        label="Guided Prompt"
        placeholder="Respond..."
        info="What challenged you today and how did you respond?"
        value={promptText}
        onChangeText={setPromptText}
        onSave={() => console.log("Saved Prompt:", promptText)}
      />

      <Text style={styles.pastTitle}>Past Entries</Text>
      <Text style={styles.sectionTitle}>Past Entries</Text>

      {pastEntries.map((entry, index) => (
        <EntryCard key={index} date={entry.date} text={entry.text} />
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
    marginTop: 40,
    color: "#371B34",
  },
});

export default JournalScreen;
