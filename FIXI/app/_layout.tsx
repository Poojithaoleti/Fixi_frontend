import React, { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

function RootNavigation() {
  const { isAuthenticated, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();


  return <Slot />;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <StatusBar style="auto" />
          <RootNavigation /> {/* ✅ THIS IS IMPORTANT */}
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}