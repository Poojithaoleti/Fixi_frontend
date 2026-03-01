import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useAuth } from '../../context/AuthContext';
import { Tabs, useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/ui/Header';

type IconName = React.ComponentProps<typeof MaterialIcons>['name'];

export default function TabsLayout() {
  return <TabRoutes />;
}

function TabRoutes() {
  const navigation = useNavigation<any>();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const [historyLen, setHistoryLen] = React.useState(0);
  const [activeTab, setActiveTab] = React.useState('index');
  const historyRef = React.useRef<string[]>([]);

  const allowedTabs = React.useMemo(
    () => new Set(['index', 'services', 'bookings', 'profile']),
    []
  );

  const tabTitles: { [key: string]: string } = {
    index: 'Home',
    services: 'Services',
    bookings: 'Bookings',
    profile: 'Profile',
  };

  const tabPath = (name: string) => {
    if (name === 'index') return '/(tabs)';
    return `/(tabs)/${name}`;
  };

  const pushHistory = (routeName: string) => {
    if (!allowedTabs.has(routeName)) return;

    setActiveTab(routeName);
    const path = tabPath(routeName);
    const h = historyRef.current;

    if (h.length === 0 || h[h.length - 1] !== path) {
      h.push(path);
      setHistoryLen(h.length);
    }
  };

  // record initial tab once
  React.useEffect(() => {
    if (historyRef.current.length === 0) {
      pushHistory('index');
    }
  }, []);

  // 🔒 protect tabs (removed setTimeout)
  React.useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/welcome');
    }
  }, [isAuthenticated]);

  const goBack = () => {
    const h = historyRef.current;

    if (h.length > 1) {
      h.pop();
      const prev = h[h.length - 1];
      setHistoryLen(h.length);

      if (prev) {
        try {
          router.push(prev as any);
          return;
        } catch {}
        navigation.navigate(prev as never);
      }
    }

    router.back();
  };

  const listenersFor = (routeName: string) => ({
    focus: () => pushHistory(routeName),
    tabPress: () => pushHistory(routeName),
  });

  return (
    <>
      <Header
        title={tabTitles[activeTab] || 'Home'}
        onBackClick={goBack}
        showBack={true}
      />

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#3e2a56',
          tabBarInactiveTintColor: '#71717a',
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarLabelPosition: 'below-icon',
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="home" color={color} />
            ),
          }}
          listeners={listenersFor('index')}
        />

        <Tabs.Screen
          name="services"
          options={{
            title: 'Services',
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="list-alt" color={color} />
            ),
          }}
          listeners={listenersFor('services')}
        />

        <Tabs.Screen
          name="bookings"
          options={{
            title: 'Bookings',
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="calendar-month" color={color} />
            ),
          }}
          listeners={listenersFor('bookings')}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="person" color={color} />
            ),
          }}
          listeners={listenersFor('profile')}
        />
      </Tabs>
    </>
  );
}

function TabBarIcon({ name, color }: { name: IconName; color: string }) {
  return <MaterialIcons size={24} name={name} color={color} />;
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopColor: '#e4e4e7',
    borderTopWidth: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    height: 60,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
});
