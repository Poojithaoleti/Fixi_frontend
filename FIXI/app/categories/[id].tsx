import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

interface Service {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  duration: string;
  image: string;
}

export default function CategoryServices() {

  const router = useRouter();
  const { id, name } = useLocalSearchParams();

  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    loadServices();
  }, []);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)/home");
    }
  };

  const loadServices = async () => {
    try {

      // -------------------------------------------
      // TODO: BACKEND INTEGRATION
      // Example API:
      // GET /services?categoryId=1
      //
      // const res = await fetch(
      //   `https://your-backend.com/services?categoryId=${id}`
      // );
      // const data = await res.json();
      // setServices(data);
      // -------------------------------------------

      if (id === "1") {
        setServices([
          {
            id: "1",
            name: "Home Deep Cleaning",
            price: 2499,
            rating: 4.5,
            reviews: 1200,
            duration: "3-4 hours",
            image:
              "https://lh3.googleusercontent.com/aida-public/AB6AXuA59AfUZv66mMoIfylLASWDLWkQbdRV3V6yeB5mGhMXMrsFUaIhrkJlUyd3IOvBejbJ_s6P62RJsZdKafYeNm1LJdw12hZx6WjMsKS_ZOQqM5JGjMqFR6n9pUkxrmSkd3hBAAWdmzGbZ7_QcE5s7qf1x_tDVg03Kt1wtk-b3SZcjGep8oI0F-SV3hauTCSwtFb26YB7NsI_MEmYFufe8iKnEMwbUuQqqatGxCy1I9-Z9yYL6mG-Xh6bojvgkhZ6CnQJuqkcGLYINJY",
          },
          {
            id: "2",
            name: "Bathroom Cleaning",
            price: 499,
            rating: 4.8,
            reviews: 850,
            duration: "1-2 hours",
            image:
              "https://lh3.googleusercontent.com/aida-public/AB6AXuCult5WY5fIXEJEm6God6QOHb_P8opaRZ_7oBpdbgyZ3bjHhSyCxT06SfFvEFyVQzVya0deOIQzKWLW59Q_5s5O1wpBPZ5QqwSFm4Bl5JsFluZQt6CW9RuBZmGUqj8OxDB-Dq-Ojw4uzgUSh1KZi7VYUQj3WXvYynmI0Cp0zhhsAYE1y2MoB33RDiSFDQDschc7djuPlRVk-B8UzbrfvqXWVb4L9ork0ENol7XKqapJNckvmA6VGtIv9D7tRClbJoUE_UdGY03o9tI",
          },
          {
            id: "3",
            name: "Kitchen Deep Cleaning",
            price: 1299,
            rating: 4.7,
            reviews: 520,
            duration: "2-3 hours",
            image:
              "https://lh3.googleusercontent.com/aida-public/AB6AXuAkf4FG7TiTGiUfA8Qmygp_T8QllVbBkILHzse4TqN_hwbDmHM0NoECcjVd4UnhyKMNqeHlWQSt0zNfKwJOO7I7R40S8MGv2ogGQAPtP7xDeQuRlA4q83Wu0yNTpYZis1wBTNhSJ-5IA9yNlJyGVIowmEhYj_h55eklOhv_4Y8QAuwOzVnHhDduzuBiEsApKNXPJV0EVgJnMIyXA-gSaEe0OGN7sJPk8qOR29sjnEFx5oKY15eOdgD6DOZefDB648DzUfIgQyjZ-ks",
          },
        ]);
      } else {
        setServices([]);
      }

    } catch (error) {
      console.log("Failed to load services", error);
    }
  };

  if (services.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={handleBack}>
            <MaterialIcons name="arrow-back" size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.center}>
          <Text style={styles.header}>{name}</Text>
          <Text style={styles.comingSoon}>
            Services coming soon 🚀
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const renderService = ({ item }: { item: Service }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.rating}>
        <MaterialIcons name="star" size={14} color="#f59e0b" />
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.serviceName}>{item.name}</Text>

        <Text style={styles.reviewText}>
          {item.reviews} reviews • {item.duration}
        </Text>

        <View style={styles.row}>
          <Text style={styles.price}>₹{item.price}</Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.headerRow}>
        <TouchableOpacity onPress={handleBack}>
          <MaterialIcons name="arrow-back" size={24} />
        </TouchableOpacity>

        <Text style={styles.header}>{name} Services</Text>
      </View>

      <FlatList
        data={services}
        renderItem={renderService}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f7f8",
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