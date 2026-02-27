import React from 'react';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="welcome"
    >
      <Stack.Screen name="welcome" options={{ title: 'Welcome' }} />
      <Stack.Screen name="login" options={{ title: 'Login' }} />
      <Stack.Screen name="(tabs)" options={{ title: 'Home' }} />
      <Stack.Screen name="booking-confirmation" options={{ title: 'Booking Confirmation' }} />
    </Stack>
  );
}

