import { ScrollView, StyleSheet, Text, View, Animated } from 'react-native';
import { useMission } from '../context/MissionContext';
import { useEffect, useRef } from 'react';

function StatusBadge({ status }: { status: string }) {
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 0.3, duration: 800, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const color = status === 'active' ? '#00ff88' : status === 'standby' ? '#ffaa00' : '#ff3333';
  const label = status === 'active' ? 'ATIVO' : status === 'standby' ? 'STANDBY' : 'ABORTADO';

  return (
    <View style={styles.badgeRow}>
      <Animated.View style={[styles.dot, { backgroundColor: color, opacity: pulse }]} />
      <Text style={[styles.badgeText, { color }]}>{label}</Text>
    </View>
  );
}

function GaugeBar({ value, label, color }: { value: number; label: string; color: string }) {
  const isWarning = value < 30;
  const barColor = isWarning ? '#ff3333' : color;

  return (
    <View style={styles.gaugeContainer}>
      <View style={styles.gaugeLabelRow}>
        <Text style={styles.gaugeLabel}>{label}</Text>
        <Text style={[styles.gaugeValue, { color: barColor }]}>{value.toFixed(0)}%</Text>
      </View>
      <View style={styles.gaugeTrack}>
        <View style={[styles.gaugeFill, { width: `${value}%`, backgroundColor: barColor }]} />
      </View>
    </View>
  );
}

export default function DashboardScreen() {
  const { mission, sensors, alerts, unreadCount } = useMission();
  const criticalAlerts = alerts.filter((a) => a.type === 'critical' && !a.read).length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.missionCard}>
        <View style={styles.missionHeader}>
          <Text style={styles.missionCode}>◈ MISSÃO</Text>
          <StatusBadge status={mission.status} />
        </View>
        <Text style={styles.missionName}>{mission.name}</Text>
        <View style={styles.missionDetails}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>DESTINO</Text>
            <Text style={styles.detailValue}>{mission.destination}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>LANÇAMENTO</Text>
            <Text style={styles.detailValue}>{mission.launchDate}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>TRIPULAÇÃO</Text>
            <Text style={styles.detailValue}>{mission.crew} MEMBROS</Text>
          </View>
        </View>
      </View>

      {criticalAlerts > 0 && (
        <View style={styles.criticalBanner}>
          <Text style={styles.criticalText}>⚠ {criticalAlerts} ALERTA{criticalAlerts > 1 ? 'S' : ''} CRÍTICO{criticalAlerts > 1 ? 'S' : ''} NÃO LIDO{criticalAlerts > 1 ? 'S' : ''}</Text>
        </View>
      )}

      <View style={styles.speedCard}>
        <Text style={styles.speedLabel}>VELOCIDADE ORBITAL</Text>
        <Text style={styles.speedValue}>{sensors.speed.toFixed(1)}</Text>
        <Text style={styles.speedUnit}>km/s</Text>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>◈ SISTEMAS</Text>
        <GaugeBar value={sensors.energy} label="ENERGIA" color="#ffcc00" />
        <GaugeBar value={sensors.communication} label="COMUNICAÇÃO" color="#00aaff" />
        <GaugeBar value={sensors.stability} label="ESTABILIDADE" color="#cc44ff" />
        <GaugeBar value={sensors.oxygen} label="OXIGÊNIO" color="#00ff88" />
      </View>

      <View style={styles.tempCard}>
        <Text style={styles.tempLabel}>TEMPERATURA EXTERNA</Text>
        <Text style={styles.tempValue}>{sensors.temperature}°C</Text>
      </View>

      <Text style={styles.footer}>FIAP SPACE CONTROL CENTER · 2026</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  content: { padding: 16, paddingBottom: 32 },
  missionCard: { backgroundColor: '#111', borderWidth: 1, borderColor: '#cc0000', borderRadius: 4, padding: 16, marginBottom: 12 },
  missionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  missionCode: { color: '#cc0000', fontSize: 11, letterSpacing: 3, fontWeight: '700' },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  badgeText: { fontSize: 11, fontWeight: '700', letterSpacing: 2 },
  missionName: { color: '#fff', fontSize: 24, fontWeight: '900', letterSpacing: 4, marginBottom: 16 },
  missionDetails: { flexDirection: 'row', justifyContent: 'space-between' },
  detailItem: { alignItems: 'center' },
  detailLabel: { color: '#555', fontSize: 9, letterSpacing: 2, marginBottom: 4 },
  detailValue: { color: '#ff3333', fontSize: 12, fontWeight: '700', letterSpacing: 1 },
  criticalBanner: { backgroundColor: '#2a0000', borderWidth: 1, borderColor: '#ff3333', borderRadius: 4, padding: 12, marginBottom: 12, alignItems: 'center' },
  criticalText: { color: '#ff3333', fontSize: 12, fontWeight: '700', letterSpacing: 2 },
  speedCard: { backgroundColor: '#0d0d0d', borderWidth: 1, borderColor: '#333', borderRadius: 4, padding: 20, alignItems: 'center', marginBottom: 12 },
  speedLabel: { color: '#555', fontSize: 10, letterSpacing: 3, marginBottom: 4 },
  speedValue: { color: '#ff3333', fontSize: 56, fontWeight: '900', lineHeight: 64 },
  speedUnit: { color: '#888', fontSize: 14, letterSpacing: 2 },
  sectionCard: { backgroundColor: '#111', borderWidth: 1, borderColor: '#222', borderRadius: 4, padding: 16, marginBottom: 12 },
  sectionTitle: { color: '#cc0000', fontSize: 11, letterSpacing: 3, fontWeight: '700', marginBottom: 16 },
  gaugeContainer: { marginBottom: 14 },
  gaugeLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  gaugeLabel: { color: '#888', fontSize: 11, letterSpacing: 2 },
  gaugeValue: { fontSize: 11, fontWeight: '700', letterSpacing: 1 },
  gaugeTrack: { height: 6, backgroundColor: '#1a1a1a', borderRadius: 3, overflow: 'hidden' },
  gaugeFill: { height: '100%', borderRadius: 3 },
  tempCard: { backgroundColor: '#111', borderWidth: 1, borderColor: '#222', borderRadius: 4, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  tempLabel: { color: '#555', fontSize: 10, letterSpacing: 2 },
  tempValue: { color: '#00aaff', fontSize: 22, fontWeight: '700', letterSpacing: 2 },
  footer: { color: '#222', fontSize: 9, letterSpacing: 2, textAlign: 'center', marginTop: 16 },
});