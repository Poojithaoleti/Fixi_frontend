import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import {
  fetchServiceDetails,
  Service,
  ServicePackage,
} from "@/lib/api";

export default function ServiceDetailsScreen() {
  const router = useRouter();

  const params = useLocalSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] =
    useState<ServicePackage | null>(null);

  useEffect(() => {
    loadServiceDetails();
  }, [id]);

  const loadServiceDetails = async () => {
    try {
      setLoading(true);

      if (!id) {
        setService(null);
        return;
      }

      const data = await fetchServiceDetails(id);

      if (!data) {
        setService(null);
        return;
      }

      setService(data);

      if (data.packages && data.packages.length > 0) {
        const popularPkg = data.packages.find((p) => p.isPopular);
        setSelectedPackage(popularPkg || data.packages[0]);
      }
    } catch (error) {
      console.error("Failed to load service details:", error);
      Alert.alert("Error", "Failed to load service details");
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

 const handleBookNow = () => {
  if (!selectedPackage) {
    Alert.alert("Error", "Please select a package");
    return;
  }

  // 🔥 BACKEND INTEGRATION
  // POST /booking
  // send:
  // {
  //   serviceId: service.id,
  //   packageId: selectedPackage.id
  // }

  // ✅ Navigate to booking details screen
  router.push({
    pathname: "/bookings/[id]",
    params: {
      id: service?.id || " ",
      packageId: selectedPackage.id,
    },
  });
};

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3e2a56" />
      </SafeAreaView>
    );
  }

  if (!service) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>Service not found</Text>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // ✅ Safe image
  const imageUri =
    service.image && service.image.startsWith("http")
      ? service.image
      : "https://via.placeholder.com/300";

  // ✅ Safe price parsing
  const basePrice =
    selectedPackage?.price ??
    (service.price
      ? parseInt(service.price.replace(/[^\d]/g, ""))
      : 0);

  const renderPackage = (item: ServicePackage) => {
    const isSelected = selectedPackage?.id === item.id;

    return (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.packageCard,
          isSelected && styles.packageCardSelected,
        ]}
        onPress={() => setSelectedPackage(item)}
        activeOpacity={0.7}
      >
        <View style={styles.packageHeader}>
          <View style={styles.packageIconContainer}>
            <MaterialIcons
              name={item.isPopular ? "star" : "bolt"}
              size={20}
              color={isSelected ? "#fff" : "#3e2a56"}
            />
          </View>

          <View style={styles.packageInfo}>
            <Text
              style={[
                styles.packageName,
                isSelected && { color: "#fff" },
              ]}
            >
              {item.name}
            </Text>

            <Text
              style={[
                styles.packageDesc,
                isSelected && styles.packageDescSelected,
              ]}
            >
              {item.description}
            </Text>
          </View>

          <Text
            style={[
              styles.packagePrice,
              isSelected && { color: "#fff" },
            ]}
          >
            ${item.price}
          </Text>
        </View>

        {item.isPopular && !isSelected && (
          <View style={styles.popularBadge}>
            <Text style={styles.popularBadgeText}>POPULAR</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Image source={{ uri: imageUri }} style={styles.serviceImage} />

          <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.iconButton} onPress={handleBack}>
              <MaterialIcons name="arrow-back" size={24} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{service.name}</Text>

          <Text style={styles.description}>
            {service.description || "No description available"}
          </Text>

          {/* Packages */}
          <View style={styles.packagesContainer}>
            <Text style={styles.sectionTitle}>Service Packages</Text>

            {service.packages && service.packages.length > 0 ? (
              service.packages.map(renderPackage)
            ) : (
              <Text>No packages available</Text>
            )}
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom */}
      <View style={styles.bottomBar}>
        <Text style={styles.totalPrice}>${basePrice}</Text>

        <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { fontSize: 16, marginBottom: 10 },

  headerContainer: { height: 250 },
  serviceImage: { width: "100%", height: "100%" },

  headerButtons: {
    position: "absolute",
    top: 16,
    left: 16,
  },

  iconButton: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 20,
  },

  content: { padding: 16 },
  title: { fontSize: 22, fontWeight: "700" },
  description: { marginTop: 10, color: "#666" },

  packagesContainer: { marginTop: 20 },
  sectionTitle: { fontWeight: "700", marginBottom: 10 },

  packageCard: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  packageCardSelected: {
    backgroundColor: "#3e2a56",
    borderColor: "#3e2a56",
  },

  packageHeader: { flexDirection: "row", alignItems: "center" },

  packageIconContainer: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },

  packageInfo: { flex: 1, marginLeft: 10 },

  packageName: { fontWeight: "700" },
  packageDesc: { fontSize: 12, color: "#888" },
  packageDescSelected: { color: "#ddd" },

  packagePrice: { fontWeight: "700" },

  popularBadge: {
    position: "absolute",
    top: -8,
    right: 10,
    backgroundColor: "#3e2a56",
    padding: 4,
    borderRadius: 6,
  },

  popularBadgeText: { color: "#fff", fontSize: 10 },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
  },

  totalPrice: { fontSize: 20, fontWeight: "700" },

  bookButton: {
    backgroundColor: "#3e2a56",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },

  bookButtonText: { color: "#fff", fontWeight: "700" },

  backButton: {
    backgroundColor: "#3e2a56",
    padding: 10,
    borderRadius: 6,
  },

  backButtonText: { color: "#fff" },
});