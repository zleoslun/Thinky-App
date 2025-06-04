import * as React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet } from "react-native";

interface Props {
  date: string;
  text: string;
}

const EntryCard = ({ date, text }: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.date}>{date}</Text>
      <View style={styles.separator} />
      <Text style={styles.text}>{text}</Text>
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
});

export default EntryCard;
