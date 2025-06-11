// app/index.tsx

import React from 'react';
import { Redirect } from 'expo-router';
import { useAuth } from '../src/_context/AuthContext';

export default function Index() {
  const { user } = useAuth();
  return <Redirect href={user ? '/(tabs)/home' : '/login'} />;
}
