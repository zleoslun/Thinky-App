// app/notifications.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ORANGE = '#FFA500'; // Orange color constant
const READ_COLOR = '#999'; // Color for read notifications

type Notification = {
  id: number;
  title: string;
  time: string;
  message: string;
  read: boolean;
};

export default function NotificationsScreen() {
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Your Daily Focus is ready!",
      time: "2 min ago",
      message: "Try today's 5-min breathing before your next study session.",
      read: false,
    },
    {
      id: 2,
      title: "Journal Prompt",
      time: "10 min ago",
      message: "What's one thing you're proud of today?",
      read: false,
    },
    {
      id: 3,
      title: "Reminder: Take a break!",
      time: "30 min ago",
      message: "You've been focused for 50 minutes. Stretch and hydrate.",
      read: false,
    },
    {
      id: 4,
      title: "Mood check saved",
      time: "Today",
      message: "Your emotional log was saved at 8:00 AM.",
      read: false,
    },
    {
      id: 5,
      title: "Session rescheduled",
      time: "Yesterday",
      message: "Your focus session is now set for 6:00 PM.",
      read: false,
    },
  ]);

  const handleNotificationPress = (notification: Notification) => {
    // Mark as read when pressed
    const updatedNotifications = notifications.map(n => 
      n.id === notification.id ? {...n, read: true} : n
    );
    setNotifications(updatedNotifications);
    
    setSelectedNotification({...notification, read: true});
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* NOTIFICATIONS LIST */}
      <ScrollView style={styles.notificationsContainer}>
        {notifications.map((notification) => (
          <TouchableOpacity 
            key={notification.id} 
            onPress={() => handleNotificationPress(notification)}
            activeOpacity={0.7}
          >
            <View style={styles.notificationItem}>
              <View style={styles.notificationHeader}>
                <View style={styles.bellContainer}>
                  <Ionicons 
                    name="notifications-outline" 
                    size={20} 
                    color={notification.read ? READ_COLOR : ORANGE} 
                  />
                  <Text style={[
                    styles.bellNumber,
                    notification.read && {color: READ_COLOR}
                  ]}>
                    {notification.id}
                  </Text>
                </View>
                <Text style={[
                  styles.notificationTitle,
                  notification.read && {color: READ_COLOR}
                ]}>
                  {notification.title} · <Text style={styles.timeText}>{notification.time}</Text>
                </Text>
              </View>
              <Text style={[
                styles.notificationMessage,
                notification.read && {color: READ_COLOR}
              ]}>
                {notification.message}
              </Text>
            </View>
            {notification.id !== notifications.length && (
              <View style={styles.divider} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* NOTIFICATION DETAIL MODAL */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {selectedNotification && (
              <>
                <View style={styles.modalHeader}>
                  <Ionicons 
                    name="notifications-outline" 
                    size={24} 
                    color={ORANGE} 
                  />
                  <Text style={styles.modalTitle}>{selectedNotification.title}</Text>
                  <Text style={styles.modalTime}>{selectedNotification.time}</Text>
                </View>
                <Text style={styles.modalMessage}>{selectedNotification.message}</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  notificationsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  notificationItem: {
    paddingVertical: 16,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  bellContainer: {
    position: 'relative',
    width: 20,
    height: 20,
  },
  bellNumber: {
    position: 'absolute',
    top: -5,
    right: -5,
    fontSize: 10,
    fontWeight: 'bold',
    color: ORANGE,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    color: ORANGE,
  },
  timeText: {
    fontWeight: 'normal',
    color: '#666',
    fontSize: 14,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#555',
    marginLeft: 28,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#eaeaea',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    flexWrap: 'wrap',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: ORANGE,
  },
  modalTime: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    lineHeight: 24,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    alignSelf: 'flex-end',
  },
  buttonClose: {
    backgroundColor: ORANGE,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});