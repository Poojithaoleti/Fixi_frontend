import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// simple placeholder screen so Expo Router has a default export
export default function BookingConfirmation() {
	return (
		<ProtectedRoute requireProfileComplete>
			<View style={styles.container}>
				<Text style={styles.text}>Booking Confirmed!</Text>
			</View>
		</ProtectedRoute>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
	text: { fontSize: 18, fontWeight: '600' },
});
