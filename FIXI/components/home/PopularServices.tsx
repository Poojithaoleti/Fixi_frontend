import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

interface Service {
  id: string;
  name: string;
  price: string; //  backend should send formatted price OR number
  image: string; //  backend should send valid image URL
}

interface PopularServicesProps {
  services: Service[];
  onServicePress: (service: Service) => void;
}

export default function PopularServices({
  services,
  onServicePress,
}: PopularServicesProps) {

  //  Handle empty state
  if (!services || services.length === 0) {
    return null;
  }

  const renderService = ({ item }: { item: Service }) => {
    const imageUri =
      item.image && item.image.startsWith("http")
        ? item.image
        : "https://via.placeholder.com/150"; // fallback image

    return (
      <TouchableOpacity
        style={styles.serviceCard}
        onPress={() => onServicePress(item)}
        activeOpacity={0.7}
      >
        <Image source={{ uri: imageUri }} style={styles.image} />

        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>

        <Text style={styles.price}>
          {item.price || "₹ --"} {/* fallback */}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Popular Services</Text>

      <FlatList
        data={services}
        renderItem={renderService}
        keyExtractor={(item) => item.id} //  backend must ensure unique id
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        initialNumToRender={5} //  performance
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },

  list: {
    paddingBottom: 16,
  },

  serviceCard: {
    minWidth: 140,
    borderRadius: 12,
    padding: 12,
    marginRight: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  image: {
    width: "100%",
    height: 96,
    borderRadius: 8,
    marginBottom: 8,
  },

  name: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 4,
  },

  price: {
    fontSize: 10,
    fontWeight: "500",
    color: "#197fe6",
  },
});