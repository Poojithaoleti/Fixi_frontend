import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Welcome() {
  const router = useRouter();

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
            <Text style={styles.title}>Welcome to Fixi</Text>

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
    paddingHorizontal: 32, // 2rem
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
    marginBottom: 20, // 1.25rem
  },
  title: {
    fontSize: 30, // 1.875rem
    fontWeight: '800',
    color: '#3e2a56',
    marginBottom: 12, // 0.75rem
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16, // 1rem
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20, // 1.25rem
    lineHeight: 24,
  },
  actions: {
    marginTop: 16, // 1rem
    width: '100%',
    gap: 12, // 0.75rem
  },
  primaryBtn: {
    backgroundColor: '#3e2a56',
    paddingVertical: 12, // 0.75rem
    paddingHorizontal: 16, // 1rem
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryBtnText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryBtn: {
    backgroundColor: '#ffffff',
    paddingVertical: 12, // 0.75rem
    paddingHorizontal: 16, // 1rem
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryBtnText: {
    color: '#374151',
    fontWeight: '600',
    fontSize: 16,
  },
  disabledBtn: {
    opacity: 0.85,
  },
});
