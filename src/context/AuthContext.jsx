import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const ADMIN_EMAIL = 'admin@lumina.art';
const ADMIN_PASSWORD = 'admin123';
const ADMIN_USER = {
  name: 'Admin User',
  email: 'admin@lumina.art',
  role: 'Administrator',
  avatar: 'AU',
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      return localStorage.getItem('lumina_admin_logged_in') === 'true';
    } catch {
      return false;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('lumina_admin_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = (email, password) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setUser(ADMIN_USER);
      localStorage.setItem('lumina_admin_logged_in', 'true');
      localStorage.setItem('lumina_admin_user', JSON.stringify(ADMIN_USER));
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('lumina_admin_logged_in');
    localStorage.removeItem('lumina_admin_user');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
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
