import React from 'react';
import { Slot } from 'expo-router';
import { AuthProvider } from '@/context/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

// The root layout simply provides the auth context and renders the stack.
// Navigation decisions (redirecting to tabs when already signed in) are
// handled within individual screens such as `welcome.tsx` so that we don't
// attempt to navigate before the router is mounted.

export default function RootLayout() {
  // simply wrap the rest of the app in the auth provider; routing is
  // entirely handled by expo-router's file-based system.  Individual
  // route components will render inside <Slot />.
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <AuthProvider>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <Slot />
      </SafeAreaProvider>
    </AuthProvider>
    </GestureHandlerRootView>
  );
}

