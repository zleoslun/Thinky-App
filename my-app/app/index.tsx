// app/index.tsx
import React from 'react';
import { Redirect } from 'expo-router';

export default function RootRedirect() {
  return <Redirect href="/home" />;
}
