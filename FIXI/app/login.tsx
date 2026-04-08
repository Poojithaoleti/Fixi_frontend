import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAuth } from "@/context/AuthContext";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

type Role = "customer" | "technician";

export default function Login() {
  const router = useRouter();
  const params = useLocalSearchParams<{ role?: string }>();
  const { login } = useAuth();

  const selectedRole: Role =
    params.role === "technician" ? "technician" : "customer";

  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const googleClientId =
    process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID ||
    process.env.VITE_GOOGLE_CLIENT_ID ||
    "";

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: googleClientId,
    androidClientId: googleClientId,
    iosClientId: googleClientId,
    webClientId: googleClientId,
  });

  React.useEffect(() => {
    const handleGoogleResponse = async () => {
      if (!response) return;

      if (response.type !== "success") {
        setErrorMessage("Google sign-in cancelled");
        return;
      }

      const idToken = response.params?.id_token;

      if (!idToken) {
        setErrorMessage("Failed to get Google idToken");
        return;
      }

      try {
        setIsLoading(true);
        setErrorMessage("");

        const sessionUser = await login(idToken, selectedRole);

        if (sessionUser) {
          router.replace(
            sessionUser.isProfileComplete
              ? "/(tabs)/home"
              : ("/complete-profile" as any)
          );
        }
      } catch (error) {
        console.error(error);
        setErrorMessage("Google login failed");
      } finally {
        setIsLoading(false);
      }
    };

    handleGoogleResponse();
  }, [response, selectedRole, login, router]);

  const handleGoogleLogin = async () => {
    if (!googleClientId) {
      setErrorMessage("Google Client ID is missing in .env");
      return;
    }

    setErrorMessage("");
    await promptAsync();
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.iconCircle}>
          <MaterialIcons name="lock" size={28} color="#3e2a56" />
        </View>

        <Text style={styles.heading}>Continue with Google</Text>
        <Text style={styles.subtitle}>
          Role: {selectedRole === "technician" ? "Technician" : "Customer"}
        </Text>

        <TouchableOpacity
          style={[styles.button, (isLoading || !request) && styles.disabled]}
          onPress={handleGoogleLogin}
          disabled={isLoading || !request}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Continue with Google</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.replace("/welcome")}
          style={styles.backBtn}
        >
          <Text style={styles.backText}>Change role</Text>
        </TouchableOpacity>

        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5eefe",
    alignSelf: "center",
    marginBottom: 18,
  },
  heading: {
    fontSize: 24,
    fontWeight: "800",
    color: "#3e2a56",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: "#71717a",
    marginTop: 8,
    marginBottom: 22,
    fontSize: 14,
  },
  button: {
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3e2a56",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  disabled: { opacity: 0.6 },
  backBtn: {
    marginTop: 14,
    alignItems: "center",
  },
  backText: {
    color: "#3e2a56",
    fontWeight: "600",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 12,
  },
});