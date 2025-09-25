import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import type { Profile } from '../lib/supabase';

interface User {
  id: string;
  email: string;
  name: string;
  credits: number;
  telegramConnected: boolean;
  telegramConnectionKey: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Transform Supabase user + profile data to our User interface
  const transformUser = (authUser: SupabaseUser, profile: Profile): User => ({
    id: authUser.id,
    email: authUser.email || profile.email,
    name: authUser.user_metadata?.name || profile.email.split('@')[0], // Fallback to email prefix
    credits: profile.credits,
    telegramConnected: profile.telegram_connected,
    telegramConnectionKey: profile.telegram_connection_key,
  });

  // Get user profile from database
  const getUserProfile = async (userId: string): Promise<Profile | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  // Create user profile after registration
  const createUserProfile = async (authUser: SupabaseUser, name: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('profiles')
        .insert({
          id: authUser.id,
          email: authUser.email!,
          credits: 5, // Start with 5 free credits
        });

      if (error) {
        console.error('Error creating profile:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error creating profile:', error);
      return false;
    }
  };

  // Initialize auth state
  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          setLoading(false);
          return;
        }

        if (session?.user) {
          const profile = await getUserProfile(session.user.id);
          if (profile) {
            setUser(transformUser(session.user, profile));
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.email);

      if (event === 'SIGNED_IN' && session?.user) {
        const profile = await getUserProfile(session.user.id);
        if (profile) {
          setUser(transformUser(session.user, profile));
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        return { 
          success: false, 
          error: error.message === 'Invalid login credentials' 
            ? 'Invalid email or password' 
            : error.message 
        };
      }

      if (data.user) {
        const profile = await getUserProfile(data.user.id);
        if (profile) {
          setUser(transformUser(data.user, profile));
          return { success: true };
        } else {
          return { success: false, error: 'Failed to load user profile' };
        }
      }

      return { success: false, error: 'Login failed' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const register = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
          }
        }
      });

      if (error) {
        console.error('Registration error:', error);
        return { 
          success: false, 
          error: error.message.includes('already registered') 
            ? 'An account with this email already exists' 
            : error.message 
        };
      }

      if (data.user) {
        // Create profile record
        const profileCreated = await createUserProfile(data.user, name);
        if (!profileCreated) {
          return { success: false, error: 'Failed to create user profile' };
        }

        // If email confirmation is disabled, user will be signed in automatically
        if (data.session) {
          const profile = await getUserProfile(data.user.id);
          if (profile) {
            setUser(transformUser(data.user, profile));
          }
        }

        return { success: true };
      }

      return { success: false, error: 'Registration failed' };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
      }
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      setUser(null); // Clear user state even if logout fails
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        loading,
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