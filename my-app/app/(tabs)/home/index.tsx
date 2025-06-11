// app/(tabs)/home/index.tsx

import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../../../src/_context/AuthContext';


const { width: screenWidth } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const rawName = user?.name || user?.email?.split('@')[0] || 'friend';
  const userName = rawName.charAt(0).toUpperCase() + rawName.slice(1);


  const feelings = [
    { label: 'Happy', color: '#FBCFE8', iconName: 'emoticon-happy-outline' },
    { label: 'Calm', color: '#DDD6FE', iconName: 'yin-yang' },
    { label: 'Manic', color: '#A7F3D0', iconName: 'weather-windy' },
    { label: 'Angry', color: '#FECACA', iconName: 'emoticon-angry-outline' },
    { label: 'Sad', color: '#BFDBFE', iconName: 'emoticon-sad-outline' },
    { label: 'Excited', color: '#FEF3C7', iconName: 'star-outline' },
    { label: 'Tired', color: '#E0E7FF', iconName: 'weather-night' },
    { label: 'Anxious', color: '#FDE68A', iconName: 'alert-circle-outline' },
  ];

  const handleFeelingPress = (feeling: string) => {
    router.push({
      pathname: '/home/mood-tips',
      params: { mood: feeling }
    });
  };

  const buttonWidth = Math.max(85, (screenWidth - 40) / 5);

  return (
    <View style={styles.container}>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.readyText}>
          Ready to take on the day,{' '}
          <Text style={{ fontWeight: 'bold' }}>{userName}</Text>?
        </Text>

        <Text style={styles.feelingText}>How are you feeling today?</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.feelingScroll}
          contentContainerStyle={styles.feelingContent}
          decelerationRate="fast"
          snapToInterval={buttonWidth + 6}
          snapToAlignment="center"
        >
          {feelings.map((f) => (
            <TouchableOpacity
              key={f.label}
              onPress={() => handleFeelingPress(f.label)}
              style={[
                styles.feelingButton,
                {
                  backgroundColor: f.color,
                  width: buttonWidth,
                },
              ]}
            >
              <MaterialCommunityIcons name={f.iconName} size={32} color="#333" />
              <Text style={styles.feelingLabel}>{f.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={styles.focusCard}
          onPress={() => router.push('/home/focus')}
        >
          <View style={styles.focusTextContainer}>
            <Text style={styles.focusTitle}>Daily Focus Suggestion</Text>
            <Text style={styles.focusSubtitle}>
              Try a 5-min breathing exercise{'\n'}before studying
            </Text>
            <Text style={styles.focusLink}>
              Start Now <Text style={{ fontSize: 16 }}>→</Text>
            </Text>
          </View>
          <MaterialCommunityIcons name="yoga" size={64} color="#A0522D" />
        </TouchableOpacity>

        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/home/pomodoro')}
          >
            <MaterialCommunityIcons name="timer-sand" size={24} color="#7C4F20" />
            <Text style={styles.actionButtonText}>Exam Mode</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/cards')}
          >
            <MaterialCommunityIcons
              name="notebook-outline"
              size={24}
              color="#7C4F20"
            />
            <Text style={styles.actionButtonText}>Journal</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.quoteCard}>
          <Text style={styles.quoteText}>
            You don't have to be perfect.{'\n'}Just do your best today
          </Text>
          <MaterialCommunityIcons name="format-quote-close" size={20} color="#ccc" />
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.fab,
          { bottom: Platform.OS === 'ios' ? 100 : 80 }
        ]}
        onPress={() => {
          router.push('/home/chat');
        }}
      >
        <View style={styles.fabInner}>
          <FontAwesome5 name="robot" size={24} color="#fff" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 20,
    paddingBottom: 100,
    paddingHorizontal: 20,
  },
  readyText: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'left',
  },
  feelingText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  feelingScroll: {
    marginBottom: 35,
    marginTop: 4,
    flexGrow: 0,
  },
  feelingContent: {
    alignItems: 'flex-start',
  },
  feelingButton: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 16,
    marginRight: 6,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  feelingLabel: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
    marginTop: 4,
    textAlign: 'center',
  },
  focusCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    borderRadius: 20,
    padding: 24,
    minHeight: 140,
    marginBottom: 35,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  focusTextContainer: {
    flex: 1,
  },
  focusTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3B3B3B',
    marginBottom: 4,
  },
  focusSubtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  focusLink: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F97316',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 35,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9F5F2',
    borderRadius: 16,
    paddingVertical: 16,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    color: '#3B3B3B',
  },
  quoteCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    padding: 24,
    minHeight: 120,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  quoteText: {
    fontSize: 18,
    color: '#666',
    flex: 1,
    marginRight: 8,
    lineHeight: 26,
    fontStyle: 'italic',
    fontWeight: '400',
  },
  fab: {
    position: 'absolute',
    right: 20,
    width: 56,
    height: 56,
    zIndex: 10,
  },
  fabInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFA037',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
});