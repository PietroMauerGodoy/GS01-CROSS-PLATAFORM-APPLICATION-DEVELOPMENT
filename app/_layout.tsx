import { MissionProvider } from '../context/MissionContext';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';

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
            title: 'MISSÃO',
            tabBarLabel: 'MISSÃO',
            tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🛸</Text>,
            headerTitle: '⬡  FIAP SPACE CONTROL',
          }}
        />
        <Tabs.Screen
          name="sensors"
          options={{
            title: 'SENSORES',
            tabBarLabel: 'SENSORES',
            tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>📡</Text>,
            headerTitle: '⬡  SENSORES',
          }}
        />
        <Tabs.Screen
          name="alerts"
          options={{
            title: 'ALERTAS',
            tabBarLabel: 'ALERTAS',
            tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🚨</Text>,
            headerTitle: '⬡  ALERTAS',
          }}
        />
        <Tabs.Screen
          name="mission-form"
          options={{
            title: 'CONFIG',
            tabBarLabel: 'CONFIG',
            tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>⚙️</Text>,
            headerTitle: '⬡  CONFIGURAR MISSÃO',
          }}
        />
      </Tabs>
    </MissionProvider>
  );
}