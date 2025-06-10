import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../src/_context/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const { login, user } = useAuth();
  useEffect(() => {
    if (user) {
      console.log('Redirection vers / car user est connecté :', user);
      router.replace('/(tabs)/home');

    }
  }, [user]);



  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    console.log('Login attempt with:', username, password);
    const ok = login(username, password);
    console.log('Result of login():', ok);
    if (!ok) {
      setError('Incorrect username or password.');
    } else {
      setError('');
    }
  };




  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=7' }}
          style={styles.avatar}
        />
        <TextInput
          placeholder="Nom d'utilisateur"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Mot de passe"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        {error !== '' && (
          <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  inner: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 32 },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    padding: 10,
  },
  button: {
    backgroundColor: '#FFA037',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
