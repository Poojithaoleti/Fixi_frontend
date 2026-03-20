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
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  authLoading: boolean; // ✅ new
  error: string | null;
  login: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  setError: (error: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // initial load
  const [authLoading, setAuthLoading] = useState(false); // login/logout
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!token;

  // 🔥 Restore session
  useEffect(() => {
    const loadAuth = async () => {
      try {
        const storedToken = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
        const storedUser = await AsyncStorage.getItem(STORAGE_KEYS.USER);

        if (storedToken && storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);

            // 🔥 TODO: Validate token with backend
            // GET /auth/validate

            setToken(storedToken);
            setUser(parsedUser);
          } catch (parseErr) {
            await AsyncStorage.multiRemove([
              STORAGE_KEYS.TOKEN,
              STORAGE_KEYS.USER,
            ]);
            setError("Session corrupted, please login again");
          }
        }
      } catch (err) {
        console.error("Auth load error:", err);
        setError("Failed to restore session");
      } finally {
        setLoading(false);
      }
    };

    loadAuth();
  }, []);

  const login = async (userData: User, authToken: string) => {
    try {
      setAuthLoading(true);

      // 🔥 BACKEND
      // POST /auth/login

      await AsyncStorage.multiSet([
        [STORAGE_KEYS.TOKEN, authToken],
        [STORAGE_KEYS.USER, JSON.stringify(userData)],
      ]);

      setUser(userData);
      setToken(authToken);
      setError(null);
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed");
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    try {
      setAuthLoading(true);

      // 🔥 BACKEND
      // POST /auth/logout

      await AsyncStorage.multiRemove([
        STORAGE_KEYS.TOKEN,
        STORAGE_KEYS.USER,
      ]);

      setUser(null);
      setToken(null);
      setError(null);
    } catch (err) {
      console.error("Logout error:", err);
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
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}