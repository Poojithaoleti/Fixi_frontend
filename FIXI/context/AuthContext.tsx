import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEYS = {
  TOKEN: "authToken",
  USER: "authUser",
};

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  avatar?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  authLoading: boolean;
  error: string | null;
  login: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
  setError: (error: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!token && !!user;

  // 🔄 Restore session
  useEffect(() => {
    const loadAuth = async () => {
      try {
        const storedToken = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
        const storedUser = await AsyncStorage.getItem(STORAGE_KEYS.USER);

        if (storedToken && storedUser) {
          const parsedUser = JSON.parse(storedUser);

          // -----------------------------------------
          // 🔥 BACKEND (OPTIONAL BUT RECOMMENDED)
          // Validate token:
          // GET /auth/validate
          // Authorization: Bearer token
          //
          // If invalid → clear storage
          // -----------------------------------------

          setToken(storedToken);
          setUser(parsedUser);
        }
      } catch (err) {
        console.error("Restore session error:", err);
        setError("Failed to restore session");
      } finally {
        setLoading(false);
      }
    };

    loadAuth();
  }, []);

  // 🔐 LOGIN
  const login = async (userData: User, authToken: string) => {
    try {
      setAuthLoading(true);

      // -----------------------------------------
      // 🔥 BACKEND
      // Called AFTER:
      // POST /auth/login OR /auth/signup
      //
      // authToken = JWT token from backend
      // -----------------------------------------

      await AsyncStorage.multiSet([
        [STORAGE_KEYS.TOKEN, authToken],
        [STORAGE_KEYS.USER, JSON.stringify(userData)],
      ]);

      setUser(userData);
      setToken(authToken);
      setError(null);
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to save login session");
    } finally {
      setAuthLoading(false);
    }
  };

  // 🔓 LOGOUT
  const logout = async () => {
    try {
      setAuthLoading(true);

      // -----------------------------------------
      // 🔥 BACKEND (OPTIONAL)
      // POST /auth/logout
      // Authorization: Bearer token
      // -----------------------------------------

      await AsyncStorage.multiRemove([
        STORAGE_KEYS.TOKEN,
        STORAGE_KEYS.USER,
      ]);

      setUser(null);
      setToken(null);
      setError(null);
    } catch (err) {
      console.error("Logout error:", err);

      // fallback: still clear state
      setUser(null);
      setToken(null);
    } finally {
      setAuthLoading(false);
    }
  };

  // 🔥 UPDATE USER PROFILE
  const updateUser = async (data: Partial<User>) => {
    if (!user) return;

    try {
      setAuthLoading(true);

      // -----------------------------------------
      // 🔥 BACKEND (IMPORTANT)
      // PUT /user/profile
      //
      // headers:
      // Authorization: Bearer token
      //
      // body:
      // {
      //   name,
      //   phone,
      //   email,
      //   address,
      //   avatar
      // }
      //
      // response:
      // updated user object
      // -----------------------------------------

      // ⏳ MOCK UPDATE (remove later)
      const updatedUser = { ...user, ...data };

      setUser(updatedUser);

      await AsyncStorage.setItem(
        STORAGE_KEYS.USER,
        JSON.stringify(updatedUser)
      );

    } catch (err) {
      console.error("Update user error:", err);
      setError("Failed to update profile");
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        loading,
        authLoading,
        error,
        login,
        logout,
        updateUser,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside provider");
  return context;
}