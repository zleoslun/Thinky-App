// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons, Entypo, FontAwesome5 } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eaeaea',
          height: 80,
        },
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'index') {
            return <Entypo name="home" size={28} color={focused ? '#FFA037' : '#ccc'} />;
          } else if (route.name === 'journal') {
            return (
              <Entypo
                name="text-document"
                size={28}
                color={'white'}
                style={{
                  backgroundColor: '#FFA037',
                  padding: 12,
                  borderRadius: 12,
                }}
              />
            );
          } else if (route.name === 'cards') {
            return <FontAwesome5 name="id-card" size={24} color={focused ? '#A59A90' : '#ccc'} />;
          } else if (route.name === 'people') {
            return <Ionicons name="people" size={24} color={focused ? '#ccc' : '#eee'} />;
          }
        },
      })}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="journal" />
      <Tabs.Screen name="cards" />
      <Tabs.Screen name="people" />
    </Tabs>
  );
}