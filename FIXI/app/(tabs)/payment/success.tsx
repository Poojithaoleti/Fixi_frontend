import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function PaymentSuccess() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const bookingId = Array.isArray(id) ? id[0] : id;

  const handleGoHome = () => {
    router.replace("/(tabs)/home");
  };

  const handleViewBookings = () => {
    router.replace("/(tabs)/bookings");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Success Icon */}
      <View style={styles.iconContainer}>
        <MaterialIcons name="check-circle" size={80} color="#22c55e" />
      </View>

      {/* Title */}
      <Text style={styles.title}>Payment Successful 🎉</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Your booking has been confirmed
      </Text>

      {/* Booking Info */}
      <View style={styles.card}>
        <Text style={styles.label}>Booking ID</Text>
        <Text style={styles.value}>{bookingId}</Text>
      </View>

      {/* Buttons */}
      <TouchableOpacity style={styles.primaryBtn} onPress={handleViewBookings}>
        <Text style={styles.primaryText}>View Bookings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryBtn} onPress={handleGoHome}>
        <Text style={styles.secondaryText}>Go to Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },

  iconContainer: {
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
  },

  subtitle: {
    marginTop: 10,
    color: "#6b7280",
    marginBottom: 30,
  },

  card: {
    width: "100%",
    backgroundColor: "#f6f7f8",
    padding: 16,
    borderRadius: 12,
    marginBottom: 30,
  },

  label: {
    fontSize: 12,
    color: "#6b7280",
  },

  value: {
    fontSize: 16,
    fontWeight: "700",
  },

  primaryBtn: {
    width: "100%",
    backgroundColor: "#22c55e",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },

  primaryText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },

  secondaryBtn: {
    width: "100%",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#3e2a56",
  },

  secondaryText: {
    textAlign: "center",
    fontWeight: "700",
    color: "#3e2a56",
  },
});