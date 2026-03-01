import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
//backend api import (commented out for now)
// import { loginUser } from "../lib/api";
export default function Login() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated]);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [imgHeight, setImgHeight] = React.useState<number>(0);

  const colors = {
    primary: '#3e2a56',
    secondary: '#f2f1f3',
    textPrimary: '#141316',
    textSecondary: '#736c7f',
  };

  // ✅ CLEAN WORKING LOGIN FUNCTION (TEMP TEST MODE)
  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    try {
      await login(
        { id: 1, email, name: "Test User" },
        "dummy-token"
      );

      router.replace('/(tabs)');
    } catch (error: any) {
      setErrorMessage('Login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    const uri =
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD6RB5UacBvb0cSQB9Q7oEQRPQJv6BDM0UkZ6FQxqIUOEQ9cGoqZLU5QB4PTGxFG0r6l8O7fJI6nTPTYTeGCPJqvpqvNd8RTZQT_nL8bKOQrym4OxUFYxu3Bc5hut8pH9wc6YThF6s7BBEtZsdI8ekznfv-sB2noJ8Cb6muU2Z-phFLZI04iFQ-ZJqkDSewl0OqutnyaYIAI-dhAKvvQRcAvAGnugYTFGtzFjaCx-ib_dZbrPJpoo5J_lzOUxBKlS9sdNqdW6PAwuWq';

    Image.getSize(
      uri,
      (width, height) => {
        const screenWidth = Dimensions.get('window').width;
        setImgHeight((height / width) * screenWidth);
      },
      () => {}
    );
  }, []);

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: '#fff',
          padding: 24,
          flexGrow: 1,
        },
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 32,
        },
        heading: {
          fontSize: 20,
          fontWeight: '700',
          color: colors.textPrimary,
        },
        inputWrapper: {
          marginBottom: 16,
          position: 'relative',
        },
        icon: {
          position: 'absolute',
          left: 12,
          top: '50%',
          transform: [{ translateY: -10 }],
        },
        input: {
          height: 56,
          backgroundColor: colors.secondary,
          borderRadius: 12,
          fontSize: 16,
          color: colors.textPrimary,
        },
        terms: {
          fontSize: 12,
          textAlign: 'center',
          color: colors.textSecondary,
          marginTop: 24,
          marginBottom: 24,
        },
        link: {
          fontWeight: '600',
          color: colors.primary,
        },
        button: {
          height: 56,
          backgroundColor: colors.primary,
          borderRadius: 12,
          alignItems: 'center',
          justifyContent: 'center',
        },
        buttonText: {
          color: '#fff',
          fontSize: 16,
          fontWeight: '700',
        },
        image: {
          width: '100%',
          height: imgHeight || 200,
          resizeMode: 'cover',
          marginTop: 24,
        },
      }),
    [imgHeight]
  );

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/welcome')}>
          <MaterialIcons name="close" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.heading}>Sign in or join</Text>
        <View style={{ width: 24 }} />
      </View>

      <View>
        <View style={styles.inputWrapper}>
          <MaterialIcons
            name="mail"
            size={20}
            color={colors.textSecondary}
            style={styles.icon}
          />
          <TextInput
            style={[styles.input, { paddingLeft: 36 }]}
            placeholder="Email"
            placeholderTextColor={colors.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputWrapper}>
          <MaterialIcons
            name="lock"
            size={20}
            color={colors.textSecondary}
            style={styles.icon}
          />
          <TextInput
            style={[styles.input, { paddingLeft: 36 }]}
            placeholder="Password"
            placeholderTextColor={colors.textSecondary}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>

      {errorMessage ? (
        <Text style={{ color: 'red', textAlign: 'center', marginVertical: 8 }}>
          {errorMessage}
        </Text>
      ) : null}

      <Text style={styles.terms}>
        By continuing, you agree to our
        <Text style={styles.link}> Terms of Service</Text> and
        <Text style={styles.link}> Privacy Policy</Text>.
      </Text>

      <TouchableOpacity
        style={[styles.button, isLoading && { opacity: 0.6 }]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Logging in...' : 'Continue'}
        </Text>
      </TouchableOpacity>

      <Image
        source={{
          uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6RB5UacBvb0cSQB9Q7oEQRPQJv6BDM0UkZ6FQxqIUOEQ9cGoqZLU5QB4PTGxFG0r6l8O7fJI6nTPTYTeGCPJqvpqvNd8RTZQT_nL8bKOQrym4OxUFYxu3Bc5hut8pH9wc6YThF6s7BBEtZsdI8ekznfv-sB2noJ8Cb6muU2Z-phFLZI04iFQ-ZJqkDSewl0OqutnyaYIAI-dhAKvvQRcAvAGnugYTFGtzFjaCx-ib_dZbrPJpoo5J_lzOUxBKlS9sdNqdW6PAwuWq',
        }}
        style={styles.image}
      />
    </ScrollView>
  );
}