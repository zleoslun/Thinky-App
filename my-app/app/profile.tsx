// app/profile.tsx

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const options = {
  headerBackTitleVisible: false,
  headerTitle: 'My Profile',
};

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=7' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content:   { flex: 1, justifyContent: 'center', alignItems: 'center' },
  avatar:    { width: 100, height: 100, borderRadius: 50, marginBottom: 20 },
  name:      { fontSize: 24, fontWeight: '600', marginBottom: 8 },
  email:     { fontSize: 16, color: '#555' },
});
