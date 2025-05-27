import { View, Text } from 'react-native';

export default function GratitudeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff7f1' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#333' }}>
        🧘‍♀️ Gratitude. {"\n"}
        Let's take a moment to appreciate the little things.
      </Text>
      <Text style={{ fontSize: 16, color: '#666', marginTop: 12 }}>
        What are you grateful for today? {"\n"}
        Take a deep breath and reflect on the positive moments in your life.
      </Text>
    </View>
  );
}