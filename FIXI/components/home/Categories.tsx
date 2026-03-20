import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type IconName = React.ComponentProps<typeof MaterialIcons>["name"];

interface Category {
  id: string;
  name: string;
  icon: string; // 🔥 backend sends string
  color: string; // 🔥 backend sends hex color
}

interface CategoriesProps {
  categories: Category[];
  onCategoryPress: (category: Category) => void;
  onViewAllPress?: () => void;
}

// 🔥 Map backend icon → MaterialIcons
const getIconName = (icon: string): IconName => {
  const iconMap: Record<string, IconName> = {
    cleaning: "cleaning-services",
    plumbing: "plumbing",
    electrical: "electrical-services",
    repair: "build",
    home: "home",
  };

  return iconMap[icon] || "category"; // fallback icon
};

export default function Categories({
  categories,
  onCategoryPress,
  onViewAllPress,
}: CategoriesProps) {

  // 🔥 Handle empty state (backend safe)
  if (!categories || categories.length === 0) {
    return null;
  }

  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => onCategoryPress(item)}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: item.color + "20", // TODO: ensure valid hex from backend
          },
        ]}
      >
        <MaterialIcons
          name={getIconName(item.icon)} // ✅ safe mapping
          size={26}
          color={item.color}
        />
      </View>

      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.title}>All Categories</Text>

        {onViewAllPress && (
          <TouchableOpacity onPress={onViewAllPress}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id} // 🔥 backend must ensure unique IDs
        numColumns={4}
        scrollEnabled={false}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 18,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
  },

  viewAll: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2563eb",
  },

  row: {
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 20,
  },

  categoryCard: {
    width: 72,
    alignItems: "center",
  },

  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },

  categoryText: {
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
  },
});