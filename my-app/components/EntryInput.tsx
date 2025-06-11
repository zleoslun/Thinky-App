import * as React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  label: string;
  placeholder: string;
  info?: string;
  value: string;
  onChangeText: (text: string) => void;
  onSave: () => void;
}

const EntryInput = ({ label, placeholder, info, value, onChangeText, onSave }: Props) => {
  return (
    <View style={styles.container}>
      {info && <Text style={styles.info}>{info}</Text>}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#707070"
        value={value}
        onChangeText={onChangeText}
        multiline
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={onSave}>
        <Text style={styles.buttonText}>Save entry</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FEF3E7",
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  label: {
    color: "#573926",
    fontSize: 14,
    fontWeight: "500",
  },
  info: {
    fontSize: 20,
    color: "#707070",
    marginVertical: 4,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    marginTop: 8,
    color: "#000",
  },
  button: {
    backgroundColor: "#FE8235",
    borderRadius: 9,
    padding: 10,
    alignSelf: "flex-end",
    marginTop: 12,
  },
  buttonText: {
    color: "#FBFBFB",
    fontWeight: "700",
    fontSize: 12,
  },
});

export default EntryInput;
