// app/explore.tsx

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../src/_context/AuthContext';


export const options = {
  headerBackTitleVisible: false,
  headerTitle: 'Explore',
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: '#fff',
    shadowColor: 'transparent',
    elevation: 0,
    height: Platform.OS === 'ios' ? 44 : 56,
  },
};

export default function ExploreScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { logout } = useAuth();


  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* CONTENUTO PRINCIPALE */}
      <View style={styles.content}>
        {/* My Profile */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/profile')}
          activeOpacity={0.7}
        >
          <Ionicons name="person-circle-outline" size={24} color="#371B34" />
          <Text style={styles.menuText}>My Profile</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        {/* Settings */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/settings')}
          activeOpacity={0.7}
        >
          <Ionicons name="settings-outline" size={24} color="#371B34" />
          <Text style={styles.menuText}>Settings</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        {/* Help & Support */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/help')}
          activeOpacity={0.7}
        >
          <Ionicons name="help-circle-outline" size={24} color="#371B34" />
          <Text style={styles.menuText}>Help & Support</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        {/* Send Feedback */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/feedback')}
          activeOpacity={0.7}
        >
          <Ionicons name="chatbox-ellipses-outline" size={24} color="#371B34" />
          <Text style={styles.menuText}>Send Feedback</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity
          style={[styles.menuItem, styles.logoutItem]}
          onPress={async () => {
            await AsyncStorage.removeItem('user');
            logout(); // <-- ajoute ça pour réinitialiser le contexte
            router.replace({ pathname: '/login', params: { logout: 'true' } });
          }}



          activeOpacity={0.7}
        >
          <Ionicons name="log-out-outline" size={24} color="#A00" />
          <Text style={[styles.menuText, { color: '#A00' }]}>Logout</Text>
          <Ionicons name="chevron-forward" size={20} color="#A00" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    color: '#371B34',
    fontWeight: '500',
  },
  logoutItem: {
    borderBottomWidth: 0,
    marginTop: 24,
  },
});
