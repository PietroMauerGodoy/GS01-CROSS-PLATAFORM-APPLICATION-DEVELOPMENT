import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useMission } from '../context/MissionContext';

type SensorCardProps = {
  icon: string;
  label: string;
  value: string;
  unit: string;
  status: 'ok' | 'warning' | 'critical';
  description: string;
};

function SensorCard({ icon, label, value, unit, status, description }: SensorCardProps) {
  const colors = { ok: '#00ff88', warning: '#ffaa00', critical: '#ff3333' };
  const color = colors[status];

  return (
    <View style={[styles.card, { borderColor: status === 'critical' ? '#ff3333' : '#222' }]}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardIcon}>{icon}</Text>
        <View style={styles.cardTitleBlock}>
          <Text style={styles.cardLabel}>{label}</Text>
          <Text style={styles.cardDescription}>{description}</Text>
        </View>
        <View style={[styles.statusDot, { backgroundColor: color }]} />
      </View>
      <View style={styles.cardValueRow}>
        <Text style={[styles.cardValue, { color }]}>{value}</Text>
        <Text style={styles.cardUnit}>{unit}</Text>
      </View>
      <View style={styles.statusBar}>
        <Text style={[styles.statusLabel, { color }]}>
          {status === 'ok' ? '● NOMINAL' : status === 'warning' ? '● ATENÇÃO' : '● CRÍTICO'}
        </Text>
      </View>
    </View>
  );
}

export default function SensorsScreen() {
  const { sensors } = useMission();

  const getStatus = (value: number, warningThreshold = 40, criticalThreshold = 20): 'ok' | 'warning' | 'critical' => {
    if (value < criticalThreshold) return 'critical';
    if (value < warningThreshold) return 'warning';
    return 'ok';
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>◈ LEITURA DOS SENSORES</Text>
      <Text style={styles.subtitle}>ATUALIZAÇÃO AUTOMÁTICA A CADA 5 SEGUNDOS</Text>

      <SensorCard icon="⚡" label="ENERGIA" value={sensors.energy.toFixed(1)} unit="%" status={getStatus(sensors.energy)} description="Nível de carga dos painéis solares" />
      <SensorCard icon="📡" label="COMUNICAÇÃO" value={sensors.communication.toFixed(1)} unit="%" status={getStatus(sensors.communication, 50, 30)} description="Qualidade do sinal com a Terra" />
      <SensorCard icon="🌀" label="ESTABILIDADE ORBITAL" value={sensors.stability.toFixed(1)} unit="%" status={getStatus(sensors.stability, 50, 25)} description="Desvio da trajetória planejada" />
      <SensorCard icon="☣️" label="OXIGÊNIO" value={sensors.oxygen.toFixed(1)} unit="%" status={getStatus(sensors.oxygen, 40, 20)} description="Concentração de O₂ na cabine" />
      <SensorCard icon="🌡️" label="TEMPERATURA" value={String(sensors.temperature)} unit="°C" status="ok" description="Temperatura externa da nave" />
      <SensorCard icon="🚀" label="VELOCIDADE" value={sensors.speed.toFixed(2)} unit="km/s" status="ok" description="Velocidade relativa ao Sol" />

      <Text style={styles.footer}>FIAP SPACE CONTROL CENTER · TELEMETRIA LIVE</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  content: { padding: 16, paddingBottom: 32 },
  header: { color: '#cc0000', fontSize: 11, letterSpacing: 4, fontWeight: '700', marginBottom: 4 },
  subtitle: { color: '#333', fontSize: 9, letterSpacing: 2, marginBottom: 20 },
  card: { backgroundColor: '#111', borderWidth: 1, borderRadius: 4, padding: 16, marginBottom: 12 },
  cardHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  cardIcon: { fontSize: 22, marginRight: 12 },
  cardTitleBlock: { flex: 1 },
  cardLabel: { color: '#fff', fontSize: 12, fontWeight: '700', letterSpacing: 2, marginBottom: 2 },
  cardDescription: { color: '#444', fontSize: 10, letterSpacing: 1 },
  statusDot: { width: 10, height: 10, borderRadius: 5, marginTop: 2 },
  cardValueRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 6, marginBottom: 8 },
  cardValue: { fontSize: 40, fontWeight: '900', lineHeight: 44 },
  cardUnit: { color: '#555', fontSize: 14, marginBottom: 6, letterSpacing: 1 },
  statusBar: { borderTopWidth: 1, borderTopColor: '#1a1a1a', paddingTop: 8 },
  statusLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 3 },
  footer: { color: '#1a1a1a', fontSize: 9, letterSpacing: 2, textAlign: 'center', marginTop: 8 },
});