// app/login.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export const options = {
  headerShown: false,
};

export default function LoginScreen() {
  const router = useRouter();
  const [showLoginUI, setShowLoginUI] = useState(false);

  useEffect(() => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            router.back();
          },
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            setShowLoginUI(true);
          },
        },
      ],
      { cancelable: false }
    );
  }, []);

  const onPressLogin = () => {
    router.replace('/home');
  };

  if (!showLoginUI) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=7' }}
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.button} onPress={onPressLogin} activeOpacity={0.7}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#FFA037',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
