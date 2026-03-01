import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useAuth } from '../context/AuthContext';

export default function Welcome() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated) {
      // simply jump to home if already signed in
      setTimeout(() => router.replace('/(tabs)'), 0);
    }
  }, [isAuthenticated, router]);

  const handleHouseholdPress = () => {
    router.push('/login');
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        <View style={styles.main}>
          <View style={styles.card}>
            {/* Logo Circle */}
            <View style={styles.logoCircle}>
              <MaterialIcons name="home" size={40} color="#3e2a56" />
            </View>

            {/* Title */}
            <Text style={styles.title}>Welcome to HomeFix</Text>

            {/* Subtitle */}
            <Text style={styles.subtitle}>
              Your trusted platform for connecting with skilled professionals for all your home service needs.
            </Text>

            {/* Action Buttons */}
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={handleHouseholdPress}
              >
                <Text style={styles.primaryBtnText}>I'm a Household</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.secondaryBtn, styles.disabledBtn]}
                disabled
              >
                <Text style={styles.secondaryBtnText}>I'm a Service Provider</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 32,
  },
  card: {
    width: '100%',
    maxWidth: 520,
    alignItems: 'center',
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f5eefe',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#3e2a56',
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: 'Manrope',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
    fontFamily: 'Manrope',
  },
  actions: {
    marginTop: 16,
    width: '100%',
    gap: 16,
  },
  primaryBtn: {
    backgroundColor: '#3e2a56',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    width: '100%',
    flexDirection: 'row',
    shadowColor: '#3e2a56',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  primaryBtnText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Manrope',
  },
  secondaryBtn: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#3e2a56',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    width: '100%',
    flexDirection: 'row',
  },
  secondaryBtnText: {
    color: '#3e2a56',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Manrope',
  },
  disabledBtn: {
    opacity: 0.85,
  },
});
