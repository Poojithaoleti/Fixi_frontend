import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await logout();
            // ❗ Do NOT navigate manually
            // RootLayout will redirect to login
          },
        },
      ]
    );
  };

  const menu = [
    {
      title: "Edit Profile",
      icon: "person",
      action: () => router.push("/profile/edit"),
    },
    { title: "Saved Addresses", icon: "location-on" },
    { title: "Payment History", icon: "receipt-long" },
    { title: "Notifications", icon: "notifications" },
    { title: "Help & Support", icon: "help" },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: user?.profilePic || "https://via.placeholder.com/150",
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.phone}>{user?.phone}</Text>
      </View>

      {/* Menu */}
      <View style={styles.menu}>
        {menu.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={styles.item}
            onPress={item.action}
            activeOpacity={0.7}
          >
            <MaterialIcons name={item.icon as any} size={20} />
            <Text style={styles.text}>{item.title}</Text>
            <MaterialIcons name="chevron-right" size={20} />
          </TouchableOpacity>
        ))}

        {/* Logout */}
        <TouchableOpacity
          style={styles.logout}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <MaterialIcons name="logout" size={20} color="red" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f7f8",
  },

  header: {
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 10,
  },

  phone: {
    color: "#6b7280",
    marginTop: 4,
  },

  menu: {
    padding: 16,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 10,
    justifyContent: "space-between",
  },

  text: {
    flex: 1,
    marginLeft: 10,
    fontWeight: "500",
  },

  logout: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 10,
  },

  logoutText: {
    color: "red",
    marginLeft: 10,
    fontWeight: "600",
  },
});