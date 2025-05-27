import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function GratitudeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 24, backgroundColor: '#fff7f1', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 20 }}>
        🙏 Gratitude
        {"\n"}Let's take a moment to appreciate the little things.
      </Text>
      <Text style={{ fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 40 }}>
        What are you grateful for today?{"\n"}
        Take a deep breath and reflect on the positive moments in your life.
      </Text>

      <TouchableOpacity
      onPress={() => router.push('/journal')}
      style={{
        backgroundColor: '#ff9a47',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
      }}
    >
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>← Back to Journal</Text>
    </TouchableOpacity>
    </View>
  );
}