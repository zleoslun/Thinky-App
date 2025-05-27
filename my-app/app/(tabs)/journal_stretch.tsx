import { View, Text } from 'react-native';

export default function StretchScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff7f1' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#333' }}>
        🧘‍♀️ Let's stretch
      </Text>
      <Text style={{ fontSize: 16, color: '#666', marginTop: 12 }}>
        Stretching helps improve flexibility and reduce tension. {"\n"}
        Take a moment to stretch your body and relax your mind.
      </Text>
    </View>
  );
}