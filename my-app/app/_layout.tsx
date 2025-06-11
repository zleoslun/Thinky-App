// app/_layout.tsx

import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from '../src/_context/AuthContext';
import { NotificationsProvider } from '../src/_context/NotificationsContext';
import { ChatProvider } from '../src/_context/ChatContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <NotificationsProvider>
        <ChatProvider>
          <Stack>
            <Stack.Screen
              name="index"
            />
            <Stack.Screen
              name="(tabs)"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="explore"
              options={{
                headerBackTitle: 'Home',
                headerTitle: 'Explore',
              }}
            />
            <Stack.Screen
              name="notifications"
              options={{
                headerBackTitle: 'Home',
                headerTitle: 'Notifications',
              }}
            />
            <Stack.Screen
              name="profile"
              options={{
                headerBackTitle: 'Explore',
                headerTitle: 'Profile',
              }}
            />
            <Stack.Screen
              name="settings"
              options={{
                headerBackTitle: 'Explore',
                headerTitle: 'Settings',
              }}
            />
            <Stack.Screen
              name="help"
              options={{
                headerBackTitle: 'Explore',
                headerTitle: 'Help',
              }}
            />
            <Stack.Screen
              name="feedback"
              options={{
                headerBackTitle: 'Explore',
                headerTitle: 'Feedback',
              }}
            />
            <Stack.Screen
              name="login"
              options={{
                headerBackTitle: 'Explore',
                headerTitle: 'Login',
                headerShown: false
              }}
            />
          </Stack>
        </ChatProvider>
      </NotificationsProvider>
    </AuthProvider>
  );
}
