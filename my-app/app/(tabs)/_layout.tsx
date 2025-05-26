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

export default function TabLayout() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/explore')}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=4' }}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Text style={styles.title}>THINKY</Text>
        <View>
            <Ionicons
              name="notifications-outline"
              size={24}
              color="#000"
              onPress={() => router.push('/notifications')}
            />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
        </View>
      </View>

      {/* BOTTOM TABS */}
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,

          // Style della barra
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

          // NASCONDI SOLO L’ITEM “explore” filtrando per route.name
          tabBarItemStyle: {
            display: route.name === 'explore' ? 'none' : 'flex',
          },

          // Icone degli altri tab
          tabBarIcon: ({ focused }) => {
            const color = focused ? '#FFA037' : '#CCC';
            const size = 28;
            switch (route.name) {
              case 'index':
                return <Entypo name="home" size={size} color={color} />;
              case 'journal':
                return (
                  <Entypo name="text-document" size={size} color={color} />
                );
              case 'cards':
                return <FontAwesome5 name="id-card" size={size} color={color} />;
              case 'people':
                return <Ionicons name="people" size={size} color={color} />;
              default:
                return null;
            }
          },
        })}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="journal" />
        <Tabs.Screen name="cards" />
        <Tabs.Screen name="people" />
        {/* Non serve inserire esplicitamente <Tabs.Screen name="explore" /> */}
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
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
});
