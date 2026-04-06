import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import * as ImagePicker from "expo-image-picker";

export default function EditProfile() {
  const router = useRouter();
  const { user, updateUser } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [email, setEmail] = useState(user?.email || "");
  const [address, setAddress] = useState(user?.address || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [imageFile, setImageFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!res.canceled) {
      const img = res.assets[0];
      setAvatar(img.uri);
      setImageFile(img);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      // 🔥 MOCK API
      await new Promise((res) => setTimeout(res, 1000));

      const response = {
        user: {
          ...user,
          name,
          phone,
          email,
          address,
          avatar: imageFile ? imageFile.uri : avatar,
        },
      };

      await updateUser(response.user);

      Alert.alert("Success", "Profile updated");
      router.back();
    } catch {
      Alert.alert("Error", "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Avatar */}
      <TouchableOpacity onPress={pickImage} style={styles.center}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <Text style={{ color: "#197fe6" }}>Change Photo</Text>
      </TouchableOpacity>

      {/* Inputs */}
      <Input value={name} onChangeText={setName} placeholder="Name" />
      <Input value={phone} onChangeText={setPhone} placeholder="Phone" />
      <Input value={email} onChangeText={setEmail} placeholder="Email" />
      <Input value={address} onChangeText={setAddress} placeholder="Address" />

      <TouchableOpacity style={styles.btn} onPress={handleSave}>
        <Text style={{ color: "#fff" }}>
          {loading ? "Saving..." : "Save Changes"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const Input = (props: any) => (
  <TextInput style={styles.input} {...props} />
);
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },

  center: { alignItems: "center", marginBottom: 20 },

  avatar: { width: 100, height: 100, borderRadius: 50 },

  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },

  btn: {
    backgroundColor: "#197fe6",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
});