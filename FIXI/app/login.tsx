import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
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

  const colors = {
    primary: "#3e2a56",
    secondary: "#f2f1f3",
    textPrimary: "#141316",
    textSecondary: "#736c7f",
  };

  const handleSendOtp = async () => {
    if (!phone) {
      setErrorMessage("Please enter phone number.");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    try {
      // TODO: Backend Integration
      // await sendOtp(phone);

      setOtpSent(true);
    } catch {
      setErrorMessage("Failed to send OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setErrorMessage("Please enter OTP.");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    try {
      // TODO: Backend Integration
      // const data = await verifyOtp(phone, otp);
      // await login(data.user, data.token);

      // TEMP TEST MODE
      await login(
        { id: phone || "unknown", name: "Test User", email: "" },
        "dummy-token"
      );

      // ✅ Navigate to Tabs after login
      router.replace("/(tabs)/home");

    } catch {
      setErrorMessage("Invalid OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#fff",
      padding: 24,
      flexGrow: 1,
    },
    heading: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.textPrimary,
      marginBottom: 32,
      textAlign: "center",
    },
    inputWrapper: {
      marginBottom: 16,
      position: "relative",
    },
    icon: {
      position: "absolute",
      left: 12,
      top: "50%",
      transform: [{ translateY: -10 }],
    },
    input: {
      height: 56,
      backgroundColor: colors.secondary,
      borderRadius: 12,
      fontSize: 16,
      color: colors.textPrimary,
    },
    button: {
      height: 56,
      backgroundColor: colors.primary,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 16,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "700",
    },
    errorText: {
      color: "red",
      textAlign: "center",
      marginVertical: 8,
    },
  });

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.heading}>Sign in with Phone</Text>

      {/* Phone Input */}
      <View style={styles.inputWrapper}>
        <MaterialIcons
          name="phone"
          size={20}
          color={colors.textSecondary}
          style={styles.icon}
        />
        <TextInput
          style={[styles.input, { paddingLeft: 36 }]}
          placeholder="Enter phone number"
          placeholderTextColor={colors.textSecondary}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          editable={!otpSent}
        />
      </View>

      {!otpSent && (
        <TouchableOpacity
          style={[styles.button, isLoading && { opacity: 0.6 }]}
          onPress={handleSendOtp}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Sending..." : "Send OTP"}
          </Text>
        </TouchableOpacity>
      )}

      {otpSent && (
        <>
          <View style={styles.inputWrapper}>
            <MaterialIcons
              name="lock"
              size={20}
              color={colors.textSecondary}
              style={styles.icon}
            />
            <TextInput
              style={[styles.input, { paddingLeft: 36 }]}
              placeholder="Enter OTP"
              placeholderTextColor={colors.textSecondary}
              keyboardType="number-pad"
              value={otp}
              onChangeText={setOtp}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, isLoading && { opacity: 0.6 }]}
            onPress={handleVerifyOtp}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Verifying..." : "Verify OTP"}
            </Text>
          </TouchableOpacity>
        </>
      )}

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </ScrollView>
  );
}