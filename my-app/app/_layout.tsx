// app/_layout.tsx

import React from 'react';
import { Stack } from 'expo-router';
import { ChatProvider } from './context/ChatContext';

export default function RootLayout() {
  return (
    <ChatProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
      </Stack>
    </ChatProvider>
  );
}
