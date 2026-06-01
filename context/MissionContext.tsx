import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type SensorData = {
  energy: number;
  communication: number;
  stability: number;
  temperature: number;
  oxygen: number;
  speed: number;
};

export type Alert = {
  id: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
  read: boolean;
};

export type Mission = {
  name: string;
  destination: string;
  launchDate: string;
  crew: string;
  status: 'active' | 'standby' | 'aborted';
};

type MissionContextType = {
  sensors: SensorData;
  alerts: Alert[];
  mission: Mission;
  updateSensors: (data: Partial<SensorData>) => void;
  addAlert: (alert: Omit<Alert, 'id' | 'timestamp' | 'read'>) => void;
  markAlertRead: (id: string) => void;
  clearAlerts: () => void;
  updateMission: (data: Partial<Mission>) => void;
  unreadCount: number;
};

const defaultSensors: SensorData = {
  energy: 87,
  communication: 94,
  stability: 76,
  temperature: -142,
  oxygen: 91,
  speed: 7.8,
};

const defaultMission: Mission = {
  name: 'FIAP-ALPHA-01',
  destination: 'Marte',
  launchDate: '2026-06-09',
  crew: '3',
  status: 'active',
};

const MissionContext = createContext<MissionContextType>({} as MissionContextType);

export const MissionProvider = ({ children }: { children: React.ReactNode }) => {
  const [sensors, setSensors] = useState<SensorData>(defaultSensors);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [mission, setMission] = useState<Mission>(defaultMission);

  useEffect(() => {
    const load = async () => {
      try {
        const savedMission = await AsyncStorage.getItem('@mission');
        const savedAlerts = await AsyncStorage.getItem('@alerts');
        const savedSensors = await AsyncStorage.getItem('@sensors');
        if (savedMission) setMission(JSON.parse(savedMission));
        if (savedAlerts) setAlerts(JSON.parse(savedAlerts));
        if (savedSensors) setSensors(JSON.parse(savedSensors));
      } catch (e) {
        console.warn('Erro ao carregar dados:', e);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSensors((prev) => {
        const next = {
          ...prev,
          energy: Math.max(0, Math.min(100, prev.energy + (Math.random() * 4 - 2))),
          communication: Math.max(0, Math.min(100, prev.communication + (Math.random() * 3 - 1.5))),
          stability: Math.max(0, Math.min(100, prev.stability + (Math.random() * 5 - 2.5))),
          oxygen: Math.max(0, Math.min(100, prev.oxygen + (Math.random() * 2 - 1))),
          speed: Math.max(0, parseFloat((prev.speed + (Math.random() * 0.2 - 0.1)).toFixed(1))),
        };

        if (next.energy < 20) addAlert({ type: 'critical', message: '⚡ ENERGIA CRÍTICA: ' + next.energy.toFixed(0) + '%' });
        if (next.stability < 30) addAlert({ type: 'critical', message: '🚨 ESTABILIDADE ORBITAL CRÍTICA: ' + next.stability.toFixed(0) + '%' });
        if (next.oxygen < 25) addAlert({ type: 'critical', message: '☣️ NÍVEL DE OXIGÊNIO CRÍTICO: ' + next.oxygen.toFixed(0) + '%' });
        if (next.communication < 40) addAlert({ type: 'warning', message: '📡 COMUNICAÇÃO FRACA: ' + next.communication.toFixed(0) + '%' });

        AsyncStorage.setItem('@sensors', JSON.stringify(next));
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const addAlert = (alert: Omit<Alert, 'id' | 'timestamp' | 'read'>) => {
    setAlerts((prev) => {
      const newAlert: Alert = {
        ...alert,
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString('pt-BR'),
        read: false,
      };
      const updated = [newAlert, ...prev].slice(0, 50);
      AsyncStorage.setItem('@alerts', JSON.stringify(updated));
      return updated;
    });
  };

  const markAlertRead = (id: string) => {
    setAlerts((prev) => {
      const updated = prev.map((a) => (a.id === id ? { ...a, read: true } : a));
      AsyncStorage.setItem('@alerts', JSON.stringify(updated));
      return updated;
    });
  };

  const clearAlerts = () => {
    setAlerts([]);
    AsyncStorage.removeItem('@alerts');
  };

  const updateSensors = (data: Partial<SensorData>) => {
    setSensors((prev) => {
      const updated = { ...prev, ...data };
      AsyncStorage.setItem('@sensors', JSON.stringify(updated));
      return updated;
    });
  };

  const updateMission = (data: Partial<Mission>) => {
    setMission((prev) => {
      const updated = { ...prev, ...data };
      AsyncStorage.setItem('@mission', JSON.stringify(updated));
      return updated;
    });
  };

  const unreadCount = alerts.filter((a) => !a.read).length;

  return (
    <MissionContext.Provider value={{ sensors, alerts, mission, updateSensors, addAlert, markAlertRead, clearAlerts, updateMission, unreadCount }}>
      {children}
    </MissionContext.Provider>
  );
};

export const useMission = () => useContext(MissionContext);