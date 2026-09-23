import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types.js';
import { api } from '../services/api.js';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAdmin: boolean;
  isModerator: boolean;
  loading: boolean;
  login: (credentials: { username?: string; email?: string; phone?: string; password: string }) => Promise<void>;
  register: (data: { name: string; email?: string; phone?: string; password: string; avatar?: string }) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('boalkhali_token'));
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCurrentUser = async () => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const data = await api.getMe();
      setUser(data.user);
    } catch (err) {
      console.warn('Session expired or invalid token:', err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, [token]);

  const login = async (credentials: { username?: string; email?: string; phone?: string; password: string }) => {
    const res = await api.login(credentials);
    if (res.token && res.user) {
      localStorage.setItem('boalkhali_token', res.token);
      setToken(res.token);
      setUser(res.user);
    }
  };

  const register = async (data: { name: string; email?: string; phone?: string; password: string; avatar?: string }) => {
    const res = await api.register(data);
    if (res.token && res.user) {
      localStorage.setItem('boalkhali_token', res.token);
      setToken(res.token);
      setUser(res.user);
    }
  };

  const logout = () => {
    localStorage.removeItem('boalkhali_token');
    setToken(null);
    setUser(null);
  };

  const refreshUser = async () => {
    if (token) {
      try {
        const data = await api.getMe();
        setUser(data.user);
      } catch (err) {
        console.error('Failed to refresh user data:', err);
      }
    }
  };

  const isAdmin = user?.role === 'admin';
  const isModerator = user?.role === 'admin' || user?.role === 'moderator';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAdmin,
        isModerator,
        loading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
