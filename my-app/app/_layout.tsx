// app/_layout.tsx

import React from 'react';
import { Stack } from 'expo-router';
import { ChatProvider } from '../src/_context/ChatContext';

export default function RootLayout() {
  return (
    <ChatProvider>
      <Stack>
        {/*
          1) Il primo Screen “index” deve avere `redirect={true}` (booleano),
             così che, non appena arrivo su “/” (root), Expo Router
             mi mandi automaticamente al primo sibling, cioè "(tabs)".
        */}
        <Stack.Screen 
          name="index" 
          redirect={true} 
        />

        {/*
          2) Poi dichiaro lo Screen del gruppo "(tabs)".
          Il group "(tabs)" conterrà le tue Tab Bar (home, journal, cards, people).
        */}
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
      </Stack>
    </ChatProvider>
  );
}
