import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ViewStyle, TextStyle, StyleSheet } from 'react-native';

const sessionCardStyle = {
  width: '90%',
  backgroundColor: '#fef2e6',
  padding: 20,
  borderRadius: 16,
  marginTop: 20,
  alignSelf: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
} satisfies ViewStyle;

const buttonPrimary = {
  backgroundColor: '#ff8c42',
  paddingVertical: 10,
  paddingHorizontal: 24,
  borderRadius: 12,
};

const buttonSecondary = {
  paddingVertical: 10,
  paddingHorizontal: 24,
  borderRadius: 12,
};

const sessionText = {
  fontSize: 16,
  color: '#666',
  marginBottom: 16,
};

const buttonTextPrimary = {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
} satisfies TextStyle;

const buttonTextSecondary = {
  color: '#ff8c42',
  fontWeight: 'bold',
  fontSize: 16,
} satisfies TextStyle;

const sessionTitle = {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#4a2c0a',
  marginBottom: 8,
} satisfies TextStyle;

const sessionSeparator = {
  height: 1,
  backgroundColor: '#eee',
  marginBottom: 12,
};

export default function JournalScreen() {
  const router = useRouter();

  const handlePress = (action: string) => {
    Alert.alert(action, `You pressed ${action}`);
  };

  const handleFocusSession = () => {
    Alert.alert("Start Focus Session", "Ready to begin a focus session?", [
      { text: "Cancel", style: "cancel" },
      { text: "Start", onPress: () => {} },
    ]);
  };

  const handleJournalPrompt = () => {
    Alert.alert("Journal Prompt", undefined, [
      { text: "Cancel", style: "cancel" },
      { text: "OK", onPress: () => {} },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', paddingTop: 30, paddingBottom: 100, backgroundColor: '#fff' }}>
      {/* Header with icon */}
      <View
        style={{
          width: '90%',
          flexDirection: 'row',
          backgroundColor: '#fff7f1',
          padding: 24,
          borderRadius: 20,
          marginBottom: 24,
          alignItems: 'center',
          justifyContent: 'space-between',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 4,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 4}}>
            Feeling overwhelmed?
          </Text>
          <Text style={{ fontSize: 18, color: '#666', marginBottom: 16 }}>
            Let's focus together.
          </Text>
          <TouchableOpacity
            onPress={handleFocusSession}
            style={{
              backgroundColor: '#ff8c42',
              paddingVertical: 10,
              paddingHorizontal: 24,
              borderRadius: 12,
              alignSelf: 'flex-start',
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
              Start focus session
            </Text>
          </TouchableOpacity>
        </View>
        <MaterialCommunityIcons name="brain" size={78} color="#ff8c42" style={{ marginLeft: 12 }} />
      </View>

      {/* Full-width Journal Prompt button */}
      <TouchableOpacity
        onPress={handleJournalPrompt}
        style={{
          width: '90%',
          backgroundColor: '#ff9a47',
          paddingVertical: 14,
          borderRadius: 12,
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 16 }}>
          Quick Journal Prompt
        </Text>
      </TouchableOpacity>

      {/* Session Cards */}
      {[
        {
          title: '5-min Guided Breathing',
          description: 'Take a short break to reset your mind\nwith a calming breathing session.',
          primary: 'Continue',
          secondary: 'Restart',
        },
        {
          title: 'Stretch Routine',
          description: 'Loosen up your body and release tension\nwith quick guided stretches.',
          primary: 'Start',
          secondary: 'How it works?',
        },
        {
          title: 'Gratitude Check-In',
          description: "Reflect on 3 things you're grateful for\nto shift your mindset toward positivity.",
          primary: 'Start',
          secondary: 'Why gratitude?',
        },
        {
          title: 'Posture Reset Reminder',
          description: 'Sit up tall, relax your shoulders, and\ntake a moment to realign your body.',
          primary: 'Start',
          secondary: 'Tips',
        },
        {
          title: 'Motivational Quote Drop',
          description: 'Get inspired with a hand-picked quote\nto keep you going strong today.',
          primary: 'Show Quote',
          secondary: 'Inspiration',
        },
      ].map((session, index) => (
        <View key={index} style={sessionCardStyle}>
          <Text style={sessionTitle}>{session.title}</Text>
          <View style={sessionSeparator} />
          <Text style={sessionText}>{session.description}</Text>
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <TouchableOpacity
              style={buttonPrimary}
              onPress={() => {
                switch (session.title) {
                  case '5-min Guided Breathing':
                    router.push('/journal/breathing');
                    break;
                  case 'Stretch Routine':
                    router.push('/journal/stretch');
                    break;
                  case 'Gratitude Check-In':
                    router.push('/journal/gratitude');
                    break;
                  case 'Posture Reset Reminder':
                    router.push('/journal/posture');
                    break;
                  case 'Motivational Quote Drop':
                    router.push('/journal/quote');
                    break;
                  default:
                    handlePress(session.primary);
                }
              }}
            >
              <Text style={buttonTextPrimary}>{session.primary}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={buttonSecondary}
              onPress={() => handlePress(session.secondary)}
            >
              <Text style={buttonTextSecondary}>{session.secondary}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
