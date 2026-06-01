import { MissionProvider } from '../context/MissionContext';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function RootLayout() {
  return (
    <MissionProvider>
      <StatusBar style="light" />
      <Tabs
        screenOptions={{
          headerStyle: { backgroundColor: '#0a0a0a', borderBottomColor: '#cc0000', borderBottomWidth: 1 },
          headerTintColor: '#ff3333',
          headerTitleStyle: { fontWeight: 'bold', letterSpacing: 2, fontSize: 14 },
          tabBarStyle: {
            backgroundColor: '#0d0d0d',
            borderTopColor: '#cc0000',
            borderTopWidth: 1,
            height: 60,
            paddingBottom: 8,
          },
          tabBarActiveTintColor: '#ff3333',
          tabBarInactiveTintColor: '#555',
          tabBarLabelStyle: { fontSize: 10, letterSpacing: 1, fontWeight: '600' },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: 'MISSÃO',
            tabBarIcon: ({ color, size }) => <Ionicons name="rocket" size={size} color={color} />,
            headerTitle: '⬡  FIAP SPACE CONTROL',
          }}
        />
        <Tabs.Screen
          name="sensors"
          options={{
            tabBarLabel: 'SENSORES',
            tabBarIcon: ({ color, size }) => <Ionicons name="pulse" size={size} color={color} />,
            headerTitle: '⬡  SENSORES',
          }}
        />
        <Tabs.Screen
          name="alerts"
          options={{
            tabBarLabel: 'ALERTAS',
            tabBarIcon: ({ color, size }) => <Ionicons name="warning" size={size} color={color} />,
            headerTitle: '⬡  ALERTAS',
          }}
        />
        <Tabs.Screen
          name="mission-form"
          options={{
            tabBarLabel: 'CONFIG',
            tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} />,
            headerTitle: '⬡  CONFIGURAR MISSÃO',
          }}
        />
      </Tabs>
    </MissionProvider>
  );
}