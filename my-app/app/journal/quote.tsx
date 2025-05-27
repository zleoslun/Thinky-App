import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function QuoteScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 24, backgroundColor: '#fff7f1', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 20 }}>
        💭 Motivational Quote of the Day
      </Text>
      <Text style={{ fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 40 }}>
        "Slow progress is better than no progress. Keep moving forward!"
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