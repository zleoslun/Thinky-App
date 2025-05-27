import { View, Text } from 'react-native';

export default function QuoteScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff7f1' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#333' }}>
        🧘‍♀️ Motivational Quote of the day
      </Text>
      <Text style={{ fontSize: 16, color: '#666', marginTop: 12 }}>
        "Slow progress is better than no progress. Keep moving forward!"
      </Text>
    </View>
  );
}