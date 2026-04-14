import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

interface Booking {
  id: string;
  serviceName: string;
  providerName: string;
  providerTitle: string;
  providerImage: string;
  address: string;
  date: string;
  price: number;
}

export default function BookingDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const serviceId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBooking();
  }, []);

  const loadBooking = async () => {
    try {
      setLoading(true);

      // BACKEND INTEGRATION
      // GET /booking/details?serviceId=123

      // ---------------- MOCK DATA ----------------
      setBooking({
        id: serviceId || "1",
        serviceName: "Wiring Repair",
        providerName: "Mark Johnson",
        providerTitle: "Electrician",
        providerImage:
          "https://randomuser.me/api/portraits/men/32.jpg",
        address: "123 Main Street, Anytown",
        date: "July 20, 2024, 2:00 PM",
        price: 150,
      });
      // ------------------------------------------
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to load booking");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)/home");
    }
  };

  const handleContact = () => {
    Alert.alert("Contact", "Contact provider feature");
  };

  const handleCancel = () => {
    //  BACKEND
    // DELETE /booking/:id

    Alert.alert("Cancel", "Booking cancelled");
    router.replace("/(tabs)/bookings");
  };

  // ✅ NEW BUTTON HANDLER
  const handleContinue = () => {
    if (!booking) {
      Alert.alert("Error", "Booking not found");
      return;
    }

    //  BACKEND INTEGRATION
    // POST /payment/initiate
    // send: { bookingId: booking.id }

    router.push({
      pathname: "/payment/[id]",
      params: { id: booking.id },
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#3e2a56" />
      </SafeAreaView>
    );
  }

  if (!booking) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>No booking found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <MaterialIcons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Booking Details</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Provider */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Service Provider</Text>

        <View style={styles.row}>
          <Image source={{ uri: booking.providerImage }} style={styles.avatar} />
          <View>
            <Text style={styles.name}>{booking.providerName}</Text>
            <Text style={styles.subtitle}>{booking.providerTitle}</Text>
          </View>
        </View>
      </View>

      {/* Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Booking Information</Text>

        <InfoItem icon="location-on" label="Address" value={booking.address} />
        <InfoItem icon="calendar-month" label="Date & Time" value={booking.date} />
        <InfoItem icon="build" label="Service" value={booking.serviceName} />
        <InfoItem icon="attach-money" label="Cost" value={`$${booking.price}`} />
      </View>

      {/* Buttons */}
      <TouchableOpacity style={styles.primaryBtn} onPress={handleContact}>
        <Text style={styles.primaryText}>Contact Provider</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
        <Text style={styles.cancelText}>Cancel Booking</Text>
      </TouchableOpacity>

      {/* ✅ NEW CONTINUE BUTTON */}
      <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
        <Text style={styles.continueText}>Continue Booking</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

function InfoItem({ icon, label, value }: any) {
  return (
    <View style={styles.infoRow}>
      <MaterialIcons name={icon} size={20} color="#3e2a56" />
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f6f7f8" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: { fontSize: 18, fontWeight: "700" },

  section: { marginTop: 20 },

  sectionTitle: { fontWeight: "700", marginBottom: 10 },

  row: { flexDirection: "row", alignItems: "center" },

  avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 10 },

  name: { fontWeight: "700" },

  subtitle: { color: "#666" },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  label: { fontSize: 12, color: "#666" },

  value: { fontWeight: "600" },

  primaryBtn: {
    marginTop: 30,
    backgroundColor: "#3e2a56",
    padding: 16,
    borderRadius: 10,
  },

  primaryText: { color: "#fff", textAlign: "center", fontWeight: "700" },

  cancelBtn: {
    marginTop: 10,
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "red",
  },

  cancelText: { color: "red", textAlign: "center", fontWeight: "700" },

  // ✅ NEW STYLE
  continueBtn: {
    marginTop: 10,
    backgroundColor: "#197fe6",
    padding: 16,
    borderRadius: 10,
  },

  continueText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },

  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});