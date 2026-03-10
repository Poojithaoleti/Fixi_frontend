import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';

interface Service {
  id: string;
  name: string;
  price: string;
  image: string;
}

interface PopularServicesProps {
  services: Service[];
  onServicePress: (service: Service) => void;
}

export default function PopularServices({ services, onServicePress }: PopularServicesProps) {
  const renderService = ({ item }: { item: Service }) => (
    <TouchableOpacity
      style={styles.serviceCard}
      onPress={() => onServicePress(item)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Popular Services</Text>
      <FlatList
        data={services}
        renderItem={renderService}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
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
    fontWeight: '600',
    color: '#141316',
    marginBottom: 16,
  },
  list: {
    paddingBottom: 16,
  },
  serviceCard: {
    minWidth: 140,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 12,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  image: {
    width: '100%',
    height: 96,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  price: {
    fontSize: 10,
    fontWeight: '500',
    color: '#197fe6',
  },
});