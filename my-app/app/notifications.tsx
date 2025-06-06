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
import { useNotifications, Notification } from '../src/_context/NotificationsContext';

const ORANGE = '#FFA500'; // Orange color constant
const READ_COLOR = '#999'; // Color for read notifications

export default function NotificationsScreen() {
  const { notifications, markAsRead, unreadCount } = useNotifications();
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleNotificationPress = (notification: Notification) => {
    markAsRead(notification.id);
    setSelectedNotification({ ...notification, read: true });
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
                  {!notification.read && (
                    <View style={[styles.bellDot, { backgroundColor: ORANGE }]} />
                  )}
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
    flexWrap: 'wrap',
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
  bellDot: {
    position: 'absolute',
    top: -3,
    right: -3,
    width: 8,
    height: 8,
    borderRadius: 4,
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
