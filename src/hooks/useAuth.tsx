import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeSocket, disconnectSocket } from '../utils/socket';
import { supabase } from '../utils/supabaseClient';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'student' | 'teacher' | 'parent' | 'admin';
  grade?: string;
  studentId?: string;
  specialization?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
  otpSent: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
    role?: string;
    studentId?: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  sendOtp: (contact: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<void>;
  clearMessages: () => void;
  tempUserData: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [tempUserData, setTempUserData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        // Map supabase user to our User interface (mocking role for now)
        const mappedUser: User = {
          id: session.user.id,
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
          email: session.user.email || '',
          phone: session.user.phone || '',
          role: session.user.user_metadata?.role || 'student', // Defaulting to student, should come from metadata
        };
        setUser(mappedUser);
        initializeSocket(session.access_token);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const mappedUser: User = {
          id: session.user.id,
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
          email: session.user.email || '',
          phone: session.user.phone || '',
          role: session.user.user_metadata?.role || 'student',
        };
        setUser(mappedUser);
        initializeSocket(session.access_token);
      } else {
        setUser(null);
        disconnectSocket();
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const clearMessages = () => {
    setError(null);
    setSuccessMessage(null);
  };

  const handleError = (err: any) => {
    const message = err.message || 'An error occurred';
    setError(message);
    setLoading(false);
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      clearMessages();

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      setSuccessMessage('Login successful');

      // The onAuthStateChange listener will handle setting the user and socket
      const role = data.user?.user_metadata?.role || 'student';
      const roleRoutes: Record<string, string> = {
        student: '/student/dashboard',
        teacher: '/teacher/dashboard',
        parent: '/parent/dashboard',
        admin: '/admin/dashboard',
      };
      navigate(roleRoutes[role] || '/');
    } catch (error: any) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: { name: string; email: string; phone: string; password: string; role?: string }) => {
    try {
      setLoading(true);
      clearMessages();

      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            phone: data.phone,
            role: data.role || 'student', // Store custom role in metadata
          }
        }
      });

      if (error) throw error;

      setSuccessMessage('Registration successful. Please check your email to verify your account.');
    } catch (error: any) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async (contact: string) => {
    try {
      setLoading(true);
      clearMessages();

      const { error } = await supabase.auth.signInWithOtp({
        email: contact,
      });

      if (error) throw error;

      setOtpSent(true);
      setSuccessMessage('OTP sent successfully');
    } catch (error: any) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (otp: string) => {
    try {
      setLoading(true);
      clearMessages();

      const { data, error } = await supabase.auth.verifyOtp({
        email: tempUserData?.email, // Assuming email is stored in tempUserData when OTP is requested
        token: otp,
        type: 'magiclink' // Or 'signup'/'recovery' depending on context
      });

      if (error) throw error;

      setSuccessMessage('Verified successfully');
      setTempUserData(null);
      setOtpSent(false);

      const role = data.user?.user_metadata?.role || 'student';
      const roleRoutes: Record<string, string> = {
        student: '/student/dashboard',
        teacher: '/teacher/dashboard',
        parent: '/parent/dashboard',
        admin: '/admin/dashboard',
      };
      navigate(roleRoutes[role] || '/');
    } catch (error: any) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      clearMessages();

      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      navigate('/');
    } catch (error: any) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        successMessage,
        otpSent,
        login,
        register,
        logout,
        sendOtp,
        verifyOtp,
        clearMessages,
        tempUserData,
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
