import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type IconName = React.ComponentProps<typeof MaterialIcons>["name"];

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  icon: string; // 🔥 backend sends string
}

interface OffersProps {
  offers: Offer[];
  onClaimPress: (offer: Offer) => void;
}

// 🔥 Map backend icon → MaterialIcons
const getIconName = (icon: string): IconName => {
  const iconMap: Record<string, IconName> = {
    discount: "local-offer",
    sale: "sell",
    cleaning: "cleaning-services",
    home: "home",
  };

  return iconMap[icon] || "local-offer";
};

export default function Offers({ offers, onClaimPress }: OffersProps) {
  // ✅ Case 0: No offers
  if (!offers || offers.length === 0) return null;

  const renderOffer = ({ item }: { item: Offer }) => (
    <View style={styles.banner}>
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => onClaimPress(item)}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Claim Now</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.iconContainer}>
        <MaterialIcons
          name={getIconName(item.icon)}
          size={100}
          color="rgba(255,255,255,0.2)"
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 🔥 Case 1 → Single offer */}
      {offers.length === 1 ? (
        renderOffer({ item: offers[0] })
      ) : (
        /* 🔥 Case 2 → Multiple offers (horizontal scroll) */
        <FlatList
          data={offers}
          renderItem={renderOffer}
          keyExtractor={(item) => item.id} // backend must ensure unique id
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 16,
  },

  listContent: {
    paddingRight: 16,
  },

  banner: {
    width: 280, // 🔥 fixed width for horizontal scroll
    backgroundColor: "#197fe6",
    borderRadius: 12,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },

  content: {
    flex: 1,
    zIndex: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 6,
  },

  description: {
    fontSize: 13,
    color: "rgba(255,255,255,0.9)",
    marginBottom: 12,
  },

  button: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
  },

  buttonText: {
    color: "#197fe6",
    fontSize: 12,
    fontWeight: "700",
  },

  iconContainer: {
    position: "absolute",
    right: -10,
    bottom: -10,
  },
});