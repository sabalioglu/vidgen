import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  credits: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simple user storage simulation
const USERS_KEY = 'videogen_users';
const SESSION_KEY = 'videogen_session';

interface StoredUser {
  id: string;
  email: string;
  name: string;
  password: string;
  credits: number;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load session on mount
  useEffect(() => {
    const sessionData = localStorage.getItem(SESSION_KEY);
    if (sessionData) {
      try {
        const session = JSON.parse(sessionData);
        const users = getUsers();
        const foundUser = users.find(u => u.id === session.userId);
        if (foundUser) {
          setUser({
            id: foundUser.id,
            email: foundUser.email,
            name: foundUser.name,
            credits: foundUser.credits
          });
        }
      } catch (error) {
        localStorage.removeItem(SESSION_KEY);
      }
    }
  }, []);

  const getUsers = (): StoredUser[] => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  };

  const saveUsers = (users: StoredUser[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    const users = getUsers();
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userData = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        credits: foundUser.credits
      };
      
      setUser(userData);
      localStorage.setItem(SESSION_KEY, JSON.stringify({ userId: foundUser.id }));
      return true;
    }
    
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    const users = getUsers();
    
    // Check if user already exists
    if (users.some(u => u.email === email)) {
      return false;
    }
    
    const newUser: StoredUser = {
      id: Date.now().toString() + Math.random().toString(36),
      email,
      name,
      password,
      credits: 5 // Start with 5 free credits
    };
    
    users.push(newUser);
    saveUsers(users);
    
    // Auto login after registration
    const userData = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      credits: newUser.credits
    };
    
    setUser(userData);
    localStorage.setItem(SESSION_KEY, JSON.stringify({ userId: newUser.id }));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};