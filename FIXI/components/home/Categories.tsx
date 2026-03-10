import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface CategoriesProps {
  categories: Category[];
  onCategoryPress: (category: Category) => void;
}

export default function Categories({ categories, onCategoryPress }: CategoriesProps) {

  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => onCategoryPress(item)}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.color + "20" }]}>
        <MaterialIcons name={item.icon as any} size={26} color={item.color} />
      </View>

      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.title}>All Categories</Text>

        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 18,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },

  viewAll: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563eb',
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
    color: "#374151",
    textAlign: "center",
  },

});