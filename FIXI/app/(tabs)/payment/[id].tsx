import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function PaymentScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const bookingId = Array.isArray(id) ? id[0] : id;

  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)/bookings");
    }
  };

  const handlePayNow = async () => {
    try {
      setLoading(true);

      // BACKEND INTEGRATION
      // POST /payment/confirm
      // body:
      // {
      //   bookingId: bookingId,
      //   paymentMethod: "UPI" | "CARD"
      // }

      // simulate API delay
      await new Promise((res) => setTimeout(res, 1500));

      Alert.alert("Success", "Payment completed successfully!");

    router.replace({
  pathname: "/payment/success",
  params: { id: bookingId },
});

    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <MaterialIcons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Payment</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.label}>Booking ID</Text>
        <Text style={styles.value}>{bookingId}</Text>

        <Text style={styles.sectionTitle}>Select Payment Method</Text>

        {/* Mock Payment Options */}
        <View style={styles.methodBox}>
          <MaterialIcons name="account-balance-wallet" size={24} />
          <Text style={styles.methodText}>UPI</Text>
        </View>

        <View style={styles.methodBox}>
          <MaterialIcons name="credit-card" size={24} />
          <Text style={styles.methodText}>Credit / Debit Card</Text>
        </View>

        {/* Pay Button */}
        <TouchableOpacity
          style={styles.payButton}
          onPress={handlePayNow}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.payText}>Pay Now</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },

  title: { fontSize: 18, fontWeight: "700" },

  content: { padding: 20 },

  label: { fontSize: 12, color: "#6b7280" },

  value: { fontSize: 16, fontWeight: "600", marginBottom: 20 },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },

  methodBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    marginBottom: 10,
  },

  methodText: {
    marginLeft: 10,
    fontWeight: "600",
  },

  payButton: {
    marginTop: 30,
    backgroundColor: "#3e2a56",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  payText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});