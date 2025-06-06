// app/help.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export const options = {
  headerBackTitleVisible: false,
  headerTitle: 'Help & Support',
};

export default function HelpScreen() {
  const showFAQAnswer = (questionKey: 'resetPassword' | 'contactSupport') => {
    if (questionKey === 'resetPassword') {
      Alert.alert(
        'How do I reset my password?',
        'To reset your password, go to Settings → Account Preferences → Reset Password and follow the instructions sent to your email.'
      );
    } else if (questionKey === 'contactSupport') {
      Alert.alert(
        'How do I contact customer support?',
        'You can email us directly at support@example.com or call +1 (555) 123-4567 between 9am–5pm (local time).'
      );
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Help & Support</Text>

        <Text style={styles.section}>Frequently Asked Questions</Text>

        <TouchableOpacity
          style={styles.item}
          onPress={() => showFAQAnswer('resetPassword')}
          activeOpacity={0.7}
        >
          <Text style={styles.question}>How do I reset my password?</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => showFAQAnswer('contactSupport')}
          activeOpacity={0.7}
        >
          <Text style={styles.question}>How do I contact customer support?</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <Text style={styles.section}>Contact Us</Text>
        <Text style={styles.text}>
          For further assistance, email us at support@example.com or call +1 (555) 123-4567.
        </Text>

        <Text style={styles.section}>Privacy Policy</Text>
        <Text style={styles.text}>
          Read our privacy policy to learn how we handle your data.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  section: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 24,
    marginBottom: 8,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  question: {
    fontSize: 16,
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
    marginBottom: 16,
  },
});
