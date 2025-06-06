// app/components/EntryCard.tsx

import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';

interface Props {
  date: string;
  text: string;
  onDelete: () => void;
  onEdit: (newText: string) => void;
}

const EntryCard = ({ date, text, onDelete, onEdit }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  useEffect(() => {
    setEditedText(text);
  }, [text]);

  return (
    <View style={styles.card}>
      <Text style={styles.date}>{date}</Text>
      <View style={styles.separator} />

      {isEditing ? (
        <TextInput
          style={styles.textInput}
          value={editedText}
          onChangeText={setEditedText}
          multiline
        />
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}

      <View style={styles.buttonRow}>
        {isEditing ? (
          <TouchableOpacity
            onPress={() => {
              onEdit(editedText);
              setIsEditing(false);
            }}
            style={[styles.button, { backgroundColor: "#4CAF50" }]}
          >
            <Ionicons name="checkmark" size={16} color="#fff" />
            <Text style={styles.buttonText}> Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setIsEditing(true)}
            style={styles.button}
          >
            <Ionicons name="pencil" size={16} color="#fff" />
            <Text style={styles.buttonText}> Edit</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={onDelete}
          style={[styles.button, { backgroundColor: "#f88" }]}
        >
          <Ionicons name="trash" size={16} color="#fff" />
          <Text style={styles.buttonText}> Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F4F3F1",
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
  },
  date: {
    fontSize: 14,
    fontWeight: "700",
    color: "#573926",
  },
  separator: {
    height: 1,
    backgroundColor: "#D9D8D8",
    marginVertical: 8,
    opacity: 0.3,
  },
  text: {
    fontSize: 14,
    color: "#707070",
  },
  textInput: {
    fontSize: 14,
    backgroundColor: "white",
    color: "#000",
    borderRadius: 8,
    padding: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    gap: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FE8235",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
  },
});

export default EntryCard;
