import { View, Text } from 'react-native';

export default function PostureScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff7f1' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#333' }}>
        🧘‍♀️ Posture Check
      </Text>
      <Text style={{ fontSize: 16, color: '#666', marginTop: 12 }}>
        Yoga and stretching can help improve your posture and reduce stress.
      </Text>
    </View>
  );
}