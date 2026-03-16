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
import { fetchServiceDetails, Service, ServicePackage } from "@/lib/api";

export default function ServiceDetailsScreen() {
  const router = useRouter();

  // ✅ FIXED PARAM HANDLING
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
        console.warn(`Service ${id} not found`);
        setService(null);
        return;
      }

      setService(data);

      if (data?.packages && data.packages.length > 0) {
        const popularPkg = data.packages.find((p) => p.isPopular);
        setSelectedPackage(popularPkg || data.packages[0]);
      }
    } catch (error) {
      console.error("Failed to load service details:", error);
      setService(null);
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

    Alert.alert(
      "Booking",
      `Selected: ${selectedPackage.name}\nPrice: $${selectedPackage.price}`
    );
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

  const renderPackage = ({ item }: { item: ServicePackage }) => {
    const isSelected = selectedPackage?.id === item.id;

    return (
      <TouchableOpacity
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

  // ✅ FIXED PRICE PARSING
  const basePrice =
    selectedPackage?.price ??
    Number(service.price?.replace(/\D/g, "")) ??
    100;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.headerContainer}>
          <Image
            source={{ uri: service.image }}
            style={styles.serviceImage}
            resizeMode="cover"
          />

          <View style={styles.headerButtons}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={handleBack}
            >
              <MaterialIcons name="arrow-back" size={24} color="#18181b" />
            </TouchableOpacity>

            <View style={styles.rightButtons}>
              <TouchableOpacity style={styles.iconButton}>
                <MaterialIcons
                  name="favorite-outline"
                  size={24}
                  color="#18181b"
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconButton}>
                <MaterialIcons name="share" size={24} color="#18181b" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{service.name}</Text>

          <View style={styles.ratingBox}>
            <MaterialIcons name="star" size={18} color="#f59e0b" />
            <Text style={styles.ratingScore}>{service.rating || 4.5}</Text>
            <Text style={styles.reviewCount}>
              ({service.reviewCount || 0} reviews)
            </Text>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>About this service</Text>
            <Text style={styles.description}>{service.description}</Text>
          </View>

          {/* Packages */}
          <View style={styles.packagesContainer}>
            <Text style={styles.sectionTitle}>Service Packages</Text>

            {/* ✅ REMOVED FlatList */}
            {service.packages?.map((pkg) =>
              renderPackage({ item: pkg })
            )}
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.totalLabel}>Total Price</Text>
          <Text style={styles.totalPrice}>${basePrice}</Text>
        </View>

        <TouchableOpacity
          style={styles.bookButton}
          onPress={handleBookNow}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
          <MaterialIcons name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  headerContainer: {
    position: "relative",
    height: 288,
  },
  serviceImage: {
    width: "100%",
    height: "100%",
  },
  headerButtons: {
    position: "absolute",
    top: 16,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rightButtons: {
    flexDirection: "row",
    gap: 8,
  },
  iconButton: {
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 8,
    borderRadius: 999,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 16,
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  ratingScore: {
    fontWeight: "700",
    marginLeft: 6,
  },
  reviewCount: {
    color: "#9ca3af",
    marginLeft: 4,
  },
  descriptionContainer: {
    marginTop: 16,
  },
  sectionTitle: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 12,
  },
  description: {
    color: "#6b7280",
    lineHeight: 20,
  },
  packagesContainer: {
    marginTop: 20,
  },
  packageCard: {
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  packageCardSelected: {
    borderColor: "#3e2a56",
    backgroundColor: "#3e2a56",
  },
  packageHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  packageIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  packageInfo: {
    flex: 1,
    marginLeft: 10,
  },
  packageName: {
    fontWeight: "700",
  },
  packageDesc: {
    fontSize: 12,
    color: "#9ca3af",
  },
  packageDescSelected: {
    color: "rgba(255,255,255,0.8)",
  },
  packagePrice: {
    fontWeight: "700",
    color: "#3e2a56",
  },
  popularBadge: {
    position: "absolute",
    top: -8,
    right: 16,
    backgroundColor: "#3e2a56",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularBadgeText: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "700",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  totalLabel: {
    fontSize: 10,
    color: "#9ca3af",
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: "700",
  },
  bookButton: {
    flexDirection: "row",
    backgroundColor: "#3e2a56",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    gap: 8,
  },
  bookButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  backButton: {
    backgroundColor: "#3e2a56",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});