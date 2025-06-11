// app/(tabs)/_layout.tsx

import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Tabs, useRouter } from 'expo-router';
import { Ionicons, Entypo, FontAwesome5 } from '@expo/vector-icons';
import { useNotifications } from '../../src/_context/NotificationsContext';

export default function TabLayout() {
  const router = useRouter();
  const { unreadCount } = useNotifications();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/explore')}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=9' }}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Image
            source={require('../../assets/images/T_writing.png')}
            style={styles.logo}
            resizeMode="contain"
            />
        <TouchableOpacity onPress={() => router.push('/notifications')}>
          <View >
            <Ionicons name="notifications-outline" size={24} color="#000"/>
            {unreadCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadCount}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* BOTTOM TABS */}
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            height: Platform.OS === 'ios' ? 80 : 60,
            paddingBottom: Platform.OS === 'ios' ? 20 : 10,
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#eaeaea',
          },
          tabBarIcon: ({ focused }) => {
            const color = focused ? '#FFA037' : '#CCC';
            const size = 28;
            if (route.name.includes('home')) {
              return <Entypo name="home" size={size} color={color} />;
            } else if (route.name === 'journal') {
              return <Entypo name="text-document" size={size} color={color} />;
            } else if (route.name === 'cards') {
              return <FontAwesome5 name="id-card" size={size} color={color} />;
            } else if (route.name.includes('people')) {
              return <Ionicons name="people" size={size} color={color} />;
            } else {
              return null;
            }
          },
        })}
      >
        <Tabs.Screen name="home" options={{ title: 'Home' }} />
        <Tabs.Screen name="journal" options={{ title: 'Exam Mode' }}/>
        <Tabs.Screen name="cards" />
        <Tabs.Screen name="people" options={{ title: 'People' }} />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  avatar: { width: 36, height: 36, borderRadius: 18, marginRight: 12 },
  title: { flex: 1, fontSize: 18, fontWeight: '600' },
  badge: {
    position: 'absolute',
    right: -4,
    top: -4,
    backgroundColor: '#FFA037',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold'},
  logo: {
    flex: 1,
    height: 50,
    marginHorizontal: 12,
    marginRight:24
  }
});
