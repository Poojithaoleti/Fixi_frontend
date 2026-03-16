import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  error: string | null;
  login: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  setError: (error: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!token;

  // restore login session
  useEffect(() => {
    const loadAuth = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("authToken");
        const storedUser = await AsyncStorage.getItem("authUser");

        if (storedToken && storedUser) {
          try {
            // TODO: BACKEND INTEGRATION
            // Validate token with backend API:
            // GET /auth/validate
            // Authorization: Bearer <token>
            
            const parsedUser = JSON.parse(storedUser);
            setToken(storedToken);
            setUser(parsedUser);
          } catch (parseErr) {
            // Corrupted data, clear storage
            console.warn("Failed to parse stored user data:", parseErr);
            await AsyncStorage.removeItem("authToken");
            await AsyncStorage.removeItem("authUser");
            setError("Session data corrupted, please login again");
          }
        }
      } catch (err) {
        console.error("Auth load error:", err);
        setError("Failed to restore session");
        // Clear storage on critical errors
        try {
          await AsyncStorage.removeItem("authToken");
          await AsyncStorage.removeItem("authUser");
        } catch (clearErr) {
          console.error("Failed to clear storage:", clearErr);
        }
      } finally {
        setLoading(false);
      }
    };

    loadAuth();
  }, []);

  const login = async (userData: User, authToken: string) => {
    try {
      setLoading(true);
      
      // TODO: BACKEND INTEGRATION
      // POST /auth/login
      // Body: { email, password }
      // Returns: { token, user }

      await AsyncStorage.setItem("authToken", authToken);
      await AsyncStorage.setItem("authUser", JSON.stringify(userData));

      setUser(userData);
      setToken(authToken);
      setError(null);
    } catch (err) {
      console.error("Login storage error:", err);
      setError("Failed to save session");
      // Clear any partial data
      try {
        await AsyncStorage.removeItem("authToken");
        await AsyncStorage.removeItem("authUser");
      } catch (clearErr) {
        console.error("Failed to clear on login error:", clearErr);
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      
      // TODO: BACKEND INTEGRATION
      // POST /auth/logout
      // Authorization: Bearer <token>

      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("authUser");

      setUser(null);
      setToken(null);
      setError(null);
    } catch (err) {
      console.error("Logout error:", err);
      setError("Failed to logout properly");
      // Force clear anyway
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        loading,
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
    // Return a default safe context instead of throwing
    return {
      isAuthenticated: false,
      user: null,
      token: null,
      loading: true,
      error: null,
      login: async () => {},
      logout: async () => {},
      setError: () => {},
    };
  }

  return context;
}