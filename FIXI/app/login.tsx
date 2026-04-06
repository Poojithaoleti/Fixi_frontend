import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { loginUser, signupUser } from "../services/authService";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const [isSignup, setIsSignup] = React.useState<boolean>(false);

  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleAuth = async (): Promise<void> => {
    if (isLoading) return;

    if (!email || !password) {
      setErrorMessage("Email and password required");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Enter a valid email");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      return;
    }

    if (isSignup && !name.trim()) {
      setErrorMessage("Name is required");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    try {
      let data;

      if (isSignup) {
        // 🔹 SIGNUP
        data = await signupUser(name, email, password);
      } else {
        try {
          // 🔹 LOGIN
          data = await loginUser(email, password);
        } catch (error: unknown) {
          if (
            error instanceof Error &&
            error.message.toLowerCase().includes("not found")
          ) {
            // 🔥 AUTO SWITCH TO SIGNUP
            setIsSignup(true);
            setErrorMessage("Account not found. Please create one.");
            setIsLoading(false);
            return;
          }
          throw error;
        }
      }

      await login(data.user, data.token);
      router.replace("/(tabs)/home");

    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Authentication failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>
          {isSignup ? "Create Account" : "Login"}
        </Text>

        {isSignup && (
          <View style={styles.inputWrapper}>
            <MaterialIcons name="person" size={20} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>
        )}

        <View style={styles.inputWrapper}>
          <MaterialIcons name="email" size={20} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputWrapper}>
          <MaterialIcons name="lock" size={20} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, isLoading && styles.disabled]}
          onPress={handleAuth}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading
              ? "Please wait..."
              : isSignup
              ? "Sign Up"
              : "Login"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setIsSignup(!isSignup);
            setErrorMessage("");
          }}
        >
          <Text style={styles.toggle}>
            {isSignup
              ? "Already have an account? Login"
              : "Don't have an account? Sign up"}
          </Text>
        </TouchableOpacity>

        {errorMessage ? (
          <Text style={styles.error}>{errorMessage}</Text>
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  container: { flexGrow: 1, padding: 24, justifyContent: "center" },

  heading: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 32,
  },

  inputWrapper: {
    marginBottom: 16,
    position: "relative",
  },

  icon: {
    position: "absolute",
    left: 14,
    top: 18,
  },

  input: {
    height: 56,
    borderRadius: 12,
    paddingLeft: 44,
    borderWidth: 1,
    borderColor: "#e4e4e7",
    backgroundColor: "#f9f9f9",
  },

  button: {
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3e2a56",
    marginTop: 16,
  },

  disabled: { opacity: 0.6 },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  toggle: {
    textAlign: "center",
    marginTop: 16,
    color: "#3e2a56",
    fontWeight: "600",
  },

  error: {
    color: "red",
    textAlign: "center",
    marginTop: 12,
  },
});