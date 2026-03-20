import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

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
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [popularServices, setPopularServices] = useState<Service[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      //  Backend Integration Point:
      // Replace these mock/service functions with real API calls
      // Example:
      // const cats = await api.get("/categories");
      // const offs = await api.get("/offers");
      // const servs = await api.get("/services/popular");

      const [cats, offs, servs] = await Promise.all([
        fetchCategories(),       // TODO: Replace with GET /categories
        fetchOffers(),           // TODO: Replace with GET /offers
        fetchPopularServices(),  // TODO: Replace with GET /services/popular
      ]);

      setCategories(cats);
      setOffers(offs);
      setPopularServices(servs);
    } catch (error) {
      console.error("Failed to load data:", error);

      //  Backend Error Handling:
      // Later replace with proper error handling from API response
      // Example: error.response?.data?.message

      Alert.alert("Error", "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryPress = (category: Category) => {
    //  Backend Note:
    // category.id must match backend ID format

    router.push({
      pathname: "/categories/[id]",
      params: {
        id: category.id,
        name: category.name, // optional, for UI display
      },
    });
  };

  const handleClaimOffer = (offer: Offer) => {
    //  Backend Integration Point:
    // Replace with API call:
    // await api.post(`/offers/${offer.id}/claim`);

    Alert.alert("Offer", `Claimed: ${offer.title}`);
  };

  const handleServicePress = (service: Service) => {
    //  Backend Note:
    // service.id should match backend service identifier

    router.push({
      pathname: "/services/[id]",
      params: { id: service.id },
    });
  };

  //  Loading State (important for API calls)
  if (loading) {
    return (
      <SafeAreaView style={styles.loader}>
        <ActivityIndicator size="large" color="#3e2a56" />
      </SafeAreaView>
    );
  }

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
        data={[{ key: "content" }]}
        renderItem={() => (
          <>
            {/*  Data comes from backend */}
            <Categories
              categories={categories}
              onCategoryPress={handleCategoryPress}
            />

            {/*  Offers list from backend */}
            <Offers
              offers={offers}
              onClaimPress={handleClaimOffer}
            />

            {/*  Popular services from backend */}
            <PopularServices
              services={popularServices}
              onServicePress={handleServicePress}
            />
          </>
        )}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    padding: 16,
    backgroundColor: "#fff",
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
  },

  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: "#3e2a56",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    paddingBottom: 120,
  },
});