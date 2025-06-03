// app/(tabs)/home/_layout.tsx
import React from 'react';
import { Slot } from 'expo-router'; 

export default function HomeLayout() {
  // `Slot` si occupa di montare `index.tsx` quando sei in /home
  // e di montare `chat.tsx` quando sei in /home/chat, senza creare
  // un tab aggiuntivo per chat.
  return <Slot />;
}
