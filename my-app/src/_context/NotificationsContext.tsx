
import React, { createContext, useState, ReactNode, useContext } from 'react';

export interface Notification {
  id: number;
  title: string;
  time: string;
  message: string;
  read: boolean;
}

interface NotificationsContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: number) => void;
}

const NotificationsContext = createContext<NotificationsContextType | null>(null);

export const useNotifications = () => {
  const ctx = useContext(NotificationsContext);
  if (!ctx) {
    throw new Error('useNotifications must be used within NotificationsProvider');
  }
  return ctx;
};

interface NotificationsProviderProps {
  children: ReactNode;
}

export const NotificationsProvider: React.FC<NotificationsProviderProps> = ({ children }) => {
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

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id
          ? { ...n, read: true }
          : n
      )
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationsContext.Provider value={{ notifications, unreadCount, markAsRead }}>
      {children}
    </NotificationsContext.Provider>
  );
};
