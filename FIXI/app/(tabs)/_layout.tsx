import React, { useEffect } from "react";
import { Tabs, useRouter, useSegments } from "expo-router";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/ui/Header";

type IconName = React.ComponentProps<typeof MaterialIcons>["name"];

export default function TabsLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { isAuthenticated, loading } = useAuth();

  const activeTab = segments[1] ?? "index";

  const tabTitles: Record<string, string> = {
    index: "Home",
    services: "Services",
    bookings: "Bookings",
    profile: "Profile",
  };

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/welcome");
    }
  }, [loading, isAuthenticated]);

  // Show loader while auth state is being checked
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#3e2a56" />
      </View>
    );
  }

  return (
    <>
      <Header title={tabTitles[activeTab] || "Home"} showBack={false} />

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#3e2a56",
          tabBarInactiveTintColor: "#71717a",
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarLabelPosition: "below-icon",
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="home" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="services"
          options={{
            title: "Services",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="list-alt" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="bookings"
          options={{
            title: "Bookings",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="calendar-month" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="person" color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

function TabBarIcon({ name, color }: { name: IconName; color: string }) {
  return <MaterialIcons name={name} size={24} color={color} />;
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopColor: "#e4e4e7",
    borderTopWidth: 1,
    backgroundColor: "#ffffff",
    paddingVertical: 8,
    height: 60,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});