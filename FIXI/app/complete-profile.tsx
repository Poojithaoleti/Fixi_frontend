import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { completeUserProfile } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";

export default function CompleteProfileScreen() {
  const router = useRouter();
  const { user, updateUser, authLoading } = useAuth();
  const role = user?.role === "technician" ? "technician" : "customer";

  const [phone, setPhone] = useState(user?.phone ?? "");
  const [addressText, setAddressText] = useState(
    user?.address_text || user?.address || ""
  );
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [servicesInput, setServicesInput] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [pricePerHour, setPricePerHour] = useState("");
  const [saving, setSaving] = useState(false);

  const parseNumber = (value: string) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  };

  const submit = async () => {
    if (!phone.trim()) {
      Alert.alert("Missing details", "Please fill phone number.");
      return;
    }

    const latNumber = parseNumber(lat);
    const lngNumber = parseNumber(lng);

    if (latNumber === null || lngNumber === null) {
      Alert.alert("Missing details", "Please enter valid latitude and longitude.");
      return;
    }

    try {
      setSaving(true);

      if (role === "technician") {
        const services = servicesInput
          .split(",")
          .map((entry) => entry.trim())
          .filter(Boolean);
        const experienceNumber = parseNumber(experienceYears);
        const priceNumber = parseNumber(pricePerHour);

        if (!services.length || experienceNumber === null || priceNumber === null) {
          Alert.alert(
            "Missing details",
            "Please fill services, experience years, and price per hour."
          );
          return;
        }

        const technicianPayload = {
          phone: phone.trim(),
          services,
          experienceYears: experienceNumber,
          pricePerHour: priceNumber,
          location: {
            type: "Point" as const,
            coordinates: [lngNumber, latNumber] as [number, number],
          },
        };

        const updated = await completeUserProfile(technicianPayload, role);

        await updateUser({
          ...updated,
          ...technicianPayload,
          role,
          isProfileComplete: true,
        });
      } else {
        if (!addressText.trim()) {
          Alert.alert("Missing details", "Please fill address.");
          return;
        }

        const customerPayload = {
          phone: phone.trim(),
          address_text: addressText.trim(),
          lat: latNumber,
          lng: lngNumber,
        };

        const updated = await completeUserProfile(customerPayload, role);

        await updateUser({
          ...updated,
          phone: customerPayload.phone,
          address: customerPayload.address_text,
          address_text: customerPayload.address_text,
          location: {
            type: "Point",
            coordinates: [customerPayload.lng, customerPayload.lat],
          },
          role,
          isProfileComplete: true,
        });
      }

      router.replace("/(tabs)/home" as any);
    } catch (error) {
      console.error("Complete profile failed:", error);
      Alert.alert("Error", "Failed to complete profile. Try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <ProtectedRoute onlyIncompleteProfile>
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.badge}>
            <MaterialIcons name="verified-user" size={24} color="#3e2a56" />
          </View>

          <Text style={styles.title}>Complete Your Profile</Text>
          <Text style={styles.subtitle}>
            {role === "technician"
              ? "Add technician details before accepting jobs."
              : "Add your details before booking services."}
          </Text>

          <View style={styles.inputWrapper}>
            <MaterialIcons name="call" size={20} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Phone number"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <View style={styles.inputWrapper}>
            <MaterialIcons name="location-on" size={20} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder={role === "technician" ? "Service area (optional text)" : "Address"}
              value={addressText}
              onChangeText={setAddressText}
            />
          </View>

          <View style={styles.inputWrapper}>
            <MaterialIcons name="my-location" size={20} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Latitude (e.g. 13.0827)"
              keyboardType="decimal-pad"
              value={lat}
              onChangeText={setLat}
            />
          </View>

          <View style={styles.inputWrapper}>
            <MaterialIcons name="explore" size={20} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Longitude (e.g. 80.2707)"
              keyboardType="decimal-pad"
              value={lng}
              onChangeText={setLng}
            />
          </View>

          {role === "technician" ? (
            <>
              <View style={styles.inputWrapper}>
                <MaterialIcons name="build" size={20} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Services (comma separated: Plumber, Electrician)"
                  value={servicesInput}
                  onChangeText={setServicesInput}
                />
              </View>

              <View style={styles.inputWrapper}>
                <MaterialIcons name="timeline" size={20} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Experience years"
                  keyboardType="number-pad"
                  value={experienceYears}
                  onChangeText={setExperienceYears}
                />
              </View>

              <View style={styles.inputWrapper}>
                <MaterialIcons name="currency-rupee" size={20} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Price per hour"
                  keyboardType="number-pad"
                  value={pricePerHour}
                  onChangeText={setPricePerHour}
                />
              </View>
            </>
          ) : null}

          <TouchableOpacity
            style={[styles.button, (saving || authLoading) && styles.disabled]}
            onPress={submit}
            disabled={saving || authLoading}
          >
            {saving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Save and Continue</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  badge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#f5eefe",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    color: "#3e2a56",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 22,
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 14,
    position: "relative",
  },
  icon: {
    position: "absolute",
    left: 12,
    top: 17,
    color: "#52525b",
    zIndex: 1,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: "#e4e4e7",
    borderRadius: 12,
    paddingLeft: 40,
    backgroundColor: "#fafafa",
  },
  button: {
    backgroundColor: "#3e2a56",
    borderRadius: 12,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  disabled: {
    opacity: 0.65,
  },
});
