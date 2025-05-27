import { View, Text } from 'react-native';

export default function BreathingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff7f1' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#333' }}>
        🧘‍♀️ Breathing Session
      </Text>
      <Text style={{ fontSize: 16, color: '#666', marginTop: 12 }}>
        Inhale... Exhale... Relax your mind.
      </Text>
    </View>
  );
}