import React from "react";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Header from "@/components/ui/Header";
import { useSegments } from "expo-router";

type IconName = React.ComponentProps<typeof MaterialIcons>["name"];

export default function TabsLayout() {
  const segments = useSegments();

  const activeTab = segments[1] ?? "home";

  const tabTitles: Record<string, string> = {
    home: "Home",
    services: "Services",
    bookings: "Bookings",
    profile: "Profile",
  };

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
});