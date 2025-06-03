// app/(tabs)/home/chat.tsx

import React, { useContext, useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  FlatList,
  Animated,
  Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Markdown from 'react-native-markdown-display';

import { ChatContext, ChatMessage } from '../../context/ChatContext';

export default function ChatScreen() {
  const router = useRouter();
  const chatCtx = useContext(ChatContext);
  if (!chatCtx) {
    throw new Error('ChatContext non disponibile');
  }

  const { messages, sendUserMessage, loading } = chatCtx;
  const [text, setText] = useState('');

  // Riferimenti per l’animazione dei puntini “in scrittura”
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  // Ref al FlatList per scrollare in fondo
  const flatListRef = useRef<FlatList<ChatMessage>>(null);

  useEffect(() => {
    // Ogni volta che messages cambia, scrolliamo alla fine
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  useEffect(() => {
    if (loading) {
      startDotAnimation();
    } else {
      dot1.setValue(0);
      dot2.setValue(0);
      dot3.setValue(0);
    }
  }, [loading]);

  const startDotAnimation = () => {
    Animated.loop(
      Animated.stagger(200, [
        Animated.sequence([
          Animated.timing(dot1, {
            toValue: 1,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(dot1, {
            toValue: 0,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(dot2, {
            toValue: 1,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(dot2, {
            toValue: 0,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(dot3, {
            toValue: 1,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(dot3, {
            toValue: 0,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  };

  const onSend = () => {
    if (text.trim().length === 0 || loading) return;
    sendUserMessage(text);
    setText('');
  };

  const onSubmitEditing = () => {
    if (!loading) onSend();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header con la freccia “indietro” */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.headerTitle}>Chatbot</Text>
        </View>
        <View style={{ width: 24 }} />
      </View>

      {/* Lista dei messaggi */}
      <FlatList
        ref={flatListRef}
        style={styles.messageList}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isUser = item.sender === 'user';
          return (
            <View
              style={[
                styles.bubble,
                isUser ? styles.bubbleUser : styles.bubbleBot,
              ]}
            >
              {/* 
                Qui usiamo Markdown con stili dedicati sia per il “body” che per il “strong”
                affinché il grassetto venga renderizzato anche su web/desktop.
              */}
              <Markdown style={markdownStyles(isUser) as any}>
                {item.text}
              </Markdown>
            </View>
          );
        }}
        // Aggiunge spazio sufficiente in fondo così la bolla non viene nascosta
        contentContainerStyle={{
          padding: 16,
          paddingBottom: Platform.OS === 'ios' ? 350 : 330,
        }}
        ListFooterComponent={<View style={{ height: 50 }} />}
      />

      {/* Indicatore “typing” con 3 puntini animati */}
      {loading && (
        <View style={styles.typingContainer}>
          <Animated.View style={[styles.dot, { opacity: dot1 }]} />
          <Animated.View style={[styles.dot, { opacity: dot2 }]} />
          <Animated.View style={[styles.dot, { opacity: dot3 }]} />
        </View>
      )}

      {/* Area di input testo */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 60}
      >
        <View
          style={[
            styles.inputContainer,
            { marginBottom: Platform.OS === 'ios' ? 80 : 60 },
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor="#999"
            value={text}
            onChangeText={setText}
            onSubmitEditing={onSubmitEditing}
            editable={!loading}
            multiline
          />
          <TouchableOpacity
            onPress={onSend}
            style={styles.sendBtn}
            disabled={loading}
          >
            <Ionicons
              name="send"
              size={24}
              color={loading ? '#CCC' : '#FFA037'}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  messageList: {
    flex: 1,
  },
  bubble: {
    maxWidth: '80%',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    flexShrink: 1,
  },
  bubbleUser: {
    alignSelf: 'flex-end',
    backgroundColor: '#FFA037',
  },
  bubbleBot: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f1f1',
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#AAA',
    marginHorizontal: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    borderTopWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    marginRight: 8,
    maxHeight: 100,
  },
  sendBtn: {
    padding: 8,
  },
});

// Stili Markdown, compresi quelli per il “strong”
const markdownStyles = (isUser: boolean) => ({
  body: {
    color: isUser ? '#fff' : '#000',
    fontSize: 14,
    lineHeight: 20,
  },
  strong: {
    fontWeight: '700',    // Grassetto
  },
  em: {
    fontStyle: 'italic',  // Corsivo
  },
  // Se hai bisogno di h1, h2, link, elenchi ecc., aggiungi qui.
});
