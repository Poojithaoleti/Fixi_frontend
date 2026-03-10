import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  icon: string;
}

interface OffersProps {
  offers: Offer[];
  onClaimPress: (offer: Offer) => void;
}

export default function Offers({ offers, onClaimPress }: OffersProps) {
  if (offers.length === 0) return null;

  const offer = offers[0]; // Assuming one featured offer

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <View style={styles.content}>
          <Text style={styles.title}>{offer.title}</Text>
          <Text style={styles.description}>{offer.description}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onClaimPress(offer)}
          >
            <Text style={styles.buttonText}>Claim Now</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconContainer}>
          <MaterialIcons name={offer.icon as any} size={120} color="rgba(255,255,255,0.2)" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  banner: {
    backgroundColor: '#197fe6',
    borderRadius: 12,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#197fe6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  content: {
    flex: 1,
    zIndex: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    maxWidth: '60%',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: '#197fe6',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  iconContainer: {
    position: 'absolute',
    right: -16,
    bottom: -16,
  },
});