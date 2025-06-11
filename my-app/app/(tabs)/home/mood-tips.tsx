// app/(tabs)/home/mood-tips.tsx

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const moodTips = {
  Happy: {
    color: '#FBCFE8',
    icon: 'emoticon-happy-outline',
    tips: [
      "Share your happiness with others - it's contagious!",
      "Take a moment to appreciate what's making you happy",
      "Consider journaling about your happy feelings",
      "Engage in activities you enjoy to prolong the feeling",
      "Practice gratitude to enhance your positive mood"
    ],
    activities: [
      "Call a friend to share good news",
      "Go for a walk in nature",
      "Listen to uplifting music",
      "Do something creative"
    ]
  },
  Calm: {
    color: '#DDD6FE',
    icon: 'yin-yang',
    tips: [
      "Use this peaceful state for mindfulness practice",
      "Enjoy some quiet time with a book or tea",
      "Practice deep breathing to maintain your calm",
      "Avoid overstimulation to preserve this state",
      "Consider gentle yoga or stretching"
    ],
    activities: [
      "Meditate for 5-10 minutes",
      "Write in your journal",
      "Take a warm bath",
      "Practice mindful breathing"
    ]
  },
  Manic: {
    color: '#A7F3D0',
    icon: 'weather-windy',
    tips: [
      "Channel your energy into productive activities",
      "Be mindful not to overcommit or overspend",
      "Prioritize sleep even if you feel energetic",
      "Avoid stimulants like caffeine",
      "Consider physical exercise to burn energy"
    ],
    activities: [
      "Organize your space",
      "Engage in creative projects",
      "Go for a run or workout",
      "Practice grounding techniques"
    ]
  },
  Angry: {
    color: '#FECACA',
    icon: 'emoticon-angry-outline',
    tips: [
      "Take deep breaths before reacting",
      "Identify the source of your anger",
      "Express your feelings calmly when ready",
      "Remove yourself from the situation if needed",
      "Practice progressive muscle relaxation"
    ],
    activities: [
      "Write down what's bothering you",
      "Try vigorous exercise",
      "Splash cold water on your face",
      "Count slowly to 10 before speaking"
    ]
  },
  Sad: {
    color: '#BFDBFE',
    icon: 'emoticon-sad-outline',
    tips: [
      "Allow yourself to feel without judgment",
      "Reach out to someone you trust",
      "Remember this feeling is temporary",
      "Be kind to yourself",
      "Engage in comforting activities"
    ],
    activities: [
      "Listen to soothing music",
      "Watch a favorite movie",
      "Write about your feelings",
      "Take a warm shower"
    ]
  },
  Excited: {
    color: '#FEF3C7',
    icon: 'star-outline',
    tips: [
      "Channel your excitement into productive energy",
      "Share your enthusiasm with others",
      "Set goals to capitalize on this motivation",
      "Stay grounded to avoid impulsive decisions",
      "Enjoy the positive energy"
    ],
    activities: [
      "Start a new project",
      "Plan something fun",
      "Exercise to burn energy",
      "Connect with friends"
    ]
  },
  Tired: {
    color: '#E0E7FF',
    icon: 'weather-night',
    tips: [
      "Listen to your body and rest if needed",
      "Stay hydrated and eat nourishing foods",
      "Take short breaks if you must stay awake",
      "Avoid caffeine late in the day",
      "Consider a short power nap (20-30 min)"
    ],
    activities: [
      "Take a short walk",
      "Do gentle stretches",
      "Drink water",
      "Practice deep breathing"
    ]
  },
  Anxious: {
    color: '#FDE68A',
    icon: 'alert-circle-outline',
    tips: [
      "Practice grounding techniques (5-4-3-2-1 method)",
      "Focus on your breathing",
      "Challenge anxious thoughts with facts",
      "Limit caffeine intake",
      "Break tasks into smaller steps"
    ],
    activities: [
      "Try box breathing (4-4-4-4)",
      "Write down your worries",
      "Use a stress ball",
      "Name things you can see/hear/feel"
    ]
  }
};

export default function MoodTipsScreen() {
  const router = useRouter();
  const { mood } = useLocalSearchParams();
  
  // Type guard to ensure mood is a string and a valid key
  const moodKey = typeof mood === 'string' && moodTips[mood as keyof typeof moodTips] 
    ? mood as keyof typeof moodTips 
    : 'Happy';

  const currentMood = moodTips[moodKey];

  return (
    <ScrollView style={[styles.container, { backgroundColor: currentMood.color }]}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.back()}
      >
        <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
      </TouchableOpacity>

      <View style={styles.header}>
        <MaterialCommunityIcons 
          name={currentMood.icon} 
          size={48} 
          color="#333" 
        />
        <Text style={styles.moodTitle}>{moodKey}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tips for Your Mood</Text>
          {currentMood.tips.map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <MaterialCommunityIcons 
                name="check-circle" 
                size={20} 
                color="#333" 
                style={styles.tipIcon}
              />
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suggested Activities</Text>
          {currentMood.activities.map((activity, index) => (
            <View key={index} style={styles.tipItem}>
              <MaterialCommunityIcons 
                name="lightbulb-on-outline" 
                size={20} 
                color="#333" 
                style={styles.tipIcon}
              />
              <Text style={styles.tipText}>{activity}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.journalButton}
          onPress={() => router.push('/cards')}
        >
          <Text style={styles.journalButtonText}>Journal About This Mood</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    marginBottom: 80,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 20,
    padding: 8,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  moodTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  content: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    minHeight: '70%',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tipIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
  },
  journalButton: {
    backgroundColor: '#333',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  journalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});