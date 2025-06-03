// app/index.tsx

import React from 'react';
import { Redirect } from 'expo-router';

export default function Index() {
  // Appena l’utente apre “/”, Redirect lo manda a “/home”
  return <Redirect href="/home" />;
}
