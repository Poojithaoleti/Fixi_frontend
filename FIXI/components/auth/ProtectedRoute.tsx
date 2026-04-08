import React from "react";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "@/context/AuthContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requireProfileComplete?: boolean;
  onlyIncompleteProfile?: boolean;
};

export default function ProtectedRoute({
  children,
  requireProfileComplete = false,
  onlyIncompleteProfile = false,
}: ProtectedRouteProps) {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size="large" color="#3e2a56" />
      </View>
    );
  }

  if (!isAuthenticated || !user) {
    return <Redirect href="/login" />;
  }

  const isProfileComplete = Boolean(user?.isProfileComplete);

  if (requireProfileComplete && !isProfileComplete) {
    return <Redirect href={"/complete-profile" as any} />;
  }

  if (onlyIncompleteProfile && isProfileComplete) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <>{children}</>;
}
