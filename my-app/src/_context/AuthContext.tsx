// src/_context/AuthContext.tsx

import React, { createContext, useContext, useState } from 'react';

const USERS = [
  { username: 'gillian', password: '1234' },
  { username: 'zabdy', password: '5678' },
];

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string): boolean => {
    const found = USERS.find(u => u.username === username && u.password === password);
    if (found) {
      setUser({ name: username, email: `${username}@thinky.app` });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
