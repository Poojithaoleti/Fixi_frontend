import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router"; // ✅ Router added

import Categories from "../../components/home/Categories";
import Offers from "../../components/home/Offers";
import PopularServices from "../../components/home/PopularServices";

import {
  fetchCategories,
  fetchOffers,
  fetchPopularServices,
  Category,
  Offer,
  Service,
} from "../../lib/api";

export default function HomeScreen() {
  const router = useRouter(); // ✅ Initialize router

  const [categories, setCategories] = useState<Category[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [popularServices, setPopularServices] = useState<Service[]>([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [cats, offs, servs] = await Promise.all([
        fetchCategories(),
        fetchOffers(),
        fetchPopularServices(),
      ]);

      setCategories(cats);
      setOffers(offs);
      setPopularServices(servs);
    } catch (error) {
      console.error("Failed to load data:", error);
      Alert.alert("Error", "Failed to load data");
    }
  };

  const handleCategoryPress = (category: Category) => {
    // push using the object form; this builds a proper nested state
    // which often avoids hydration errors when going back.
    router.push(
      {
        pathname: "/categories/[id]",
        params: { id: category.id, name: category.name },
      } as any
    );
  };
  const handleClaimOffer = (offer: Offer) => {
    Alert.alert("Offer", `Claimed: ${offer.title}`);
  };

  const handleServicePress = (service: Service) => {
    // Navigate to service details page
    // Service can be from any category or popular services
    router.push({
      pathname: "/services/[id]",
      params: { id: service.id },
    } as any);
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <MaterialIcons
                name="home-repair-service"
                size={24}
                color="#ffffff"
              />
            </View>
            <Text style={styles.title}>Fixi</Text>
          </View>

          <TouchableOpacity style={styles.notificationButton}>
            <MaterialIcons name="notifications" size={24} color="#6b7280" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <MaterialIcons
              name="search"
              size={20}
              color="#9ca3af"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for services"
              placeholderTextColor="#9ca3af"
              value={search}
              onChangeText={setSearch}
            />
          </View>

          <TouchableOpacity style={styles.filterButton}>
            <MaterialIcons name="tune" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <FlatList
        data={offers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Offers offers={[item]} onClaimPress={handleClaimOffer} />
        )}
        ListHeaderComponent={
          <Categories
            categories={categories}
            onCategoryPress={handleCategoryPress}
          />
        }
        ListFooterComponent={
          <PopularServices
            services={popularServices}
            onServicePress={handleServicePress}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  header: {
    padding: 16,
    paddingTop: 8,
    backgroundColor: "#ffffff",
  },

  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  logo: {
    width: 40,
    height: 40,
    backgroundColor: "#3e2a56",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#141316",
  },

  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f2f1f3",
    justifyContent: "center",
    alignItems: "center",
  },

  searchContainer: {
    flexDirection: "row",
    gap: 12,
  },

  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f1f3",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },

  searchIcon: {
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#141316",
  },

  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: "#3e2a56",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});