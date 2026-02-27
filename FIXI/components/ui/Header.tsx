import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface HeaderProps {
  title: string;
  onBackClick?: () => void;
  showBack?: boolean;
}

export default function Header({ title, onBackClick, showBack = true }: HeaderProps) {
  return (
    <View style={styles.headerContainer}>
      {showBack ? (
        <TouchableOpacity style={styles.backButton} onPress={onBackClick}> 
          <MaterialIcons name="arrow-back" size={24} color="#18181b" />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 40 }} />
      )}
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16, // 1rem
    gap: 16,
  },
  backButton: {
    backgroundColor: 'transparent',
    padding: 0,
    color: '#18181b',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18, // 1.125rem
    fontWeight: 'bold',
    color: '#18181b',
  },
  spacer: {
    width: 32, // 2rem
  },
});
