import React, { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

function RootNavigation() {
  const { isAuthenticated, loading, user } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const first = String(segments[0] ?? "");
    const inTabs = first === "(tabs)";
    const inPublicRoute = first === "login" || first === "welcome" || first === "";
    const inCompleteProfileRoute = first === "complete-profile";

    if (!isAuthenticated && !inPublicRoute) {
      router.replace("/login");
      return;
    }

    if (isAuthenticated && user) {
      if (!user.isProfileComplete && !inCompleteProfileRoute) {
        router.replace("/complete-profile" as any);
        return;
      }

      if (user.isProfileComplete && (inPublicRoute || inCompleteProfileRoute || !inTabs)) {
        router.replace("/(tabs)/home");
      }
    }
  }, [loading, isAuthenticated, user, segments, router]);

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