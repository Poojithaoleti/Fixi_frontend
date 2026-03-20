import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { fetchAllServices, Service } from "@/lib/api"; // ✅ correct import

export default function CategoryServices() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // ✅ safe param handling
  const categoryId =
    typeof params.id === "string" ? params.id : undefined;

  const categoryName =
    typeof params.name === "string" ? params.name : "Category";

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryId) {
      loadServices();
    }
  }, [categoryId]);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/(tabs)/home");
    }
  };

  const handleServicePress = (service: Service) => {
    router.push({
      pathname: "/services/[id]",
      params: { id: service.id },
    });
  };

  const loadServices = async () => {
    try {
      setLoading(true);

      // 🔥 BACKEND INTEGRATION
      // GET /services?categoryId=...

      const allServices = await fetchAllServices();

      const filtered = allServices.filter(
        (s: Service) => s.categoryId === categoryId
      );

      setServices(filtered);
    } catch (error) {
      console.log("Failed to load services", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#197fe6" />
      </SafeAreaView>
    );
  }

  // 🔥 Empty state
  if (!services || services.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={handleBack}>
            <MaterialIcons name="arrow-back" size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.center}>
          <Text style={styles.header}>{categoryName}</Text>
          <Text style={styles.comingSoon}>
            Services coming soon 🚀
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const renderService = ({ item }: { item: Service }) => {
    const imageUri =
      item.image && item.image.startsWith("http")
        ? item.image
        : "https://via.placeholder.com/300";

    return (
      <View style={styles.card}>
        <Image source={{ uri: imageUri }} style={styles.image} />

        {item.rating && (
          <View style={styles.rating}>
            <MaterialIcons name="star" size={14} color="#f59e0b" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        )}

        <View style={styles.cardContent}>
          <Text style={styles.serviceName}>{item.name}</Text>

          <Text style={styles.reviewText}>
            {item.reviewCount || 0} reviews •{" "}
            {item.description || "Service available"}
          </Text>

          <View style={styles.row}>
            <Text style={styles.price}>{item.price}</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleServicePress(item)}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={handleBack}>
          <MaterialIcons name="arrow-back" size={24} />
        </TouchableOpacity>

        <Text style={styles.header}>
          {categoryName} Services
        </Text>
      </View>

      <FlatList
        data={services}
        renderItem={renderService}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f7f8",
  },

  listContent: {
    padding: 16,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  header: {
    fontSize: 22,
    fontWeight: "700",
    marginLeft: 10,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  comingSoon: {
    fontSize: 16,
    color: "#6b7280",
    marginTop: 10,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 180,
  },

  rating: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
  },

  ratingText: {
    marginLeft: 4,
    fontWeight: "600",
  },

  cardContent: {
    padding: 14,
  },

  serviceName: {
    fontSize: 18,
    fontWeight: "700",
  },

  reviewText: {
    color: "#6b7280",
    marginTop: 2,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#197fe6",
  },

  button: {
    backgroundColor: "#197fe6",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});