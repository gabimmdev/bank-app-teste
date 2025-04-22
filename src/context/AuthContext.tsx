import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  name: string;
  email: string;
};

type updatedUser = {
  name: string;
  email?: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updatedUser: updatedUser) => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const stored = await AsyncStorage.getItem('user');
      if (stored) setUser(JSON.parse(stored));
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    const storedUser = await AsyncStorage.getItem('registeredUser');

  if (!storedUser) return false;

  const parsedUser = JSON.parse(storedUser);

  if (parsedUser.email === email && parsedUser.senha === password) {
    const loggedUser = { name: parsedUser.name, email: parsedUser.email };
    setUser(loggedUser);
    await AsyncStorage.setItem('user', JSON.stringify(loggedUser));
    return true;
  }

  return false;
};

  const register = async (name: string, email: string, password: string) => {
    const newUser = { name, email };
    setUser(newUser);
    await AsyncStorage.setItem('user', JSON.stringify(newUser));
  };

  const updateUser = async (updatedUser: updatedUser) => {
    if (!user) return;

    const newUser: User = {
      name: updatedUser.name,
      email: updatedUser.email ?? user.email,
    };

    setUser(newUser);
    await AsyncStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
