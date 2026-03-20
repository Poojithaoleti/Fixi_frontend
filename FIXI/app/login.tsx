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

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const [phone, setPhone] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [otpSent, setOtpSent] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSendOtp = async () => {
    if (!phone || phone.length < 10) {
      setErrorMessage("Enter a valid phone number");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    try {
      // TODO: Replace with API call → sendOtp(phone)
      setOtpSent(true);
    } catch {
      setErrorMessage("Failed to send OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length < 4) {
      setErrorMessage("Enter valid OTP");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    try {
      // TODO: Replace with API call → verifyOtp(phone, otp)

      // TEMP TEST LOGIN
      await login(
        { id: phone || "unknown", name: "Test User", email: "" },
        "dummy-token"
      );

      router.replace("/(tabs)/home");
    } catch {
      setErrorMessage("Invalid OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.heading}>Sign in with Phone</Text>

        {/* TODO: Replace with <Input /> component */}
        <View style={styles.inputWrapper}>
          <MaterialIcons name="phone" size={20} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            editable={!otpSent}
          />
        </View>

        {!otpSent && (
          <TouchableOpacity
            style={[styles.button, isLoading && styles.disabled]}
            onPress={handleSendOtp}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Sending..." : "Send OTP"}
            </Text>
          </TouchableOpacity>
        )}

        {otpSent && (
          <>
            {/* TODO: Replace with <Input /> component */}
            <View style={styles.inputWrapper}>
              <MaterialIcons name="lock" size={20} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                keyboardType="number-pad"
                maxLength={6}
                value={otp}
                onChangeText={setOtp}
              />
            </View>

            <TouchableOpacity
              style={[styles.button, isLoading && styles.disabled]}
              onPress={handleVerifyOtp}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>
                {isLoading ? "Verifying..." : "Verify OTP"}
              </Text>
            </TouchableOpacity>
          </>
        )}

        {errorMessage ? (
          <Text style={styles.error}>{errorMessage}</Text>
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
  },
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
    zIndex: 1,
  },
  input: {
    height: 56,
    borderRadius: 12,
    paddingLeft: 44,
    paddingRight: 12,
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
  disabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  error: {
    color: "#ef4444",
    textAlign: "center",
    marginTop: 12,
    fontSize: 14,
  },
});