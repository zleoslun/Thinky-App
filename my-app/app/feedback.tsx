// app/feedback.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const options = {
  headerBackTitleVisible: false,
  headerTitle: 'Send Feedback',
};

export default function FeedbackScreen() {
  const [feedback, setFeedback] = useState('');

  const submitFeedback = () => {
    if (!feedback.trim()) {
      Alert.alert('Error', 'Please enter your feedback before submitting.');
      return;
    }
    Alert.alert('Thank you!', 'Your feedback has been submitted.');
    setFeedback('');
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          style={styles.inner}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <Text style={styles.prompt}>
            How can we improve? We value your feedback.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Type your feedback here..."
            value={feedback}
            onChangeText={setFeedback}
            multiline
            textAlignVertical="top"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={submitFeedback}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  inner: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  prompt: {
    fontSize: 18,
    marginBottom: 12,
    color: '#333',
  },
  input: {
    height: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#FFA037',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
