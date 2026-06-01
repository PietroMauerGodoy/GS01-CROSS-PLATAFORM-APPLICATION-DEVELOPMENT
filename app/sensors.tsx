import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMission } from '../context/MissionContext';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

type SensorCardProps = {
  icon: IoniconsName;
  label: string;
  value: string;
  unit: string;
  status: 'ok' | 'warning' | 'critical';
  description: string;
};

function SensorCard({ icon, label, value, unit, status, description }: SensorCardProps) {
  const colors = { ok: '#00ff88', warning: '#ffaa00', critical: '#ff3333' };
  const color = colors[status];
  const isCritical = status === 'critical';

  return (
    <View style={[styles.card, isCritical && styles.cardCritical]}>
      <View style={styles.cardHeader}>
        <View style={[styles.iconBox, { borderColor: color + '44', backgroundColor: color + '11' }]}>
          <Ionicons name={icon} size={20} color={color} />
        </View>
        <View style={styles.cardTitleBlock}>
          <Text style={styles.cardLabel}>{label}</Text>
          <Text style={styles.cardDescription}>{description}</Text>
        </View>
        <View style={[styles.statusPill, { backgroundColor: color + '22' }]}>
          <Text style={[styles.statusPillText, { color }]}>
            {status === 'ok' ? 'NOMINAL' : status === 'warning' ? 'ATENÇÃO' : 'CRÍTICO'}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.cardValueRow}>
        <Text style={[styles.cardValue, { color }]}>{value}</Text>
        <Text style={styles.cardUnit}>{unit}</Text>
      </View>
    </View>
  );
}

export default function SensorsScreen() {
  const { sensors } = useMission();

  const getStatus = (value: number, warn = 40, crit = 20): 'ok' | 'warning' | 'critical' => {
    if (value < crit) return 'critical';
    if (value < warn) return 'warning';
    return 'ok';
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.pageHeader}>
        <Text style={styles.header}>TELEMETRIA</Text>
        <Text style={styles.subtitle}>ATUALIZAÇÃO A CADA 5 SEGUNDOS</Text>
      </View>

      <SensorCard icon="flash" label="ENERGIA" value={sensors.energy.toFixed(1)} unit="%" status={getStatus(sensors.energy)} description="Nível de carga dos painéis solares" />
      <SensorCard icon="radio" label="COMUNICAÇÃO" value={sensors.communication.toFixed(1)} unit="%" status={getStatus(sensors.communication, 50, 30)} description="Qualidade do sinal com a Terra" />
      <SensorCard icon="navigate-circle" label="ESTABILIDADE ORBITAL" value={sensors.stability.toFixed(1)} unit="%" status={getStatus(sensors.stability, 50, 25)} description="Desvio da trajetória planejada" />
      <SensorCard icon="water" label="OXIGÊNIO" value={sensors.oxygen.toFixed(1)} unit="%" status={getStatus(sensors.oxygen, 40, 20)} description="Concentração de O₂ na cabine" />
      <SensorCard icon="thermometer" label="TEMPERATURA" value={String(sensors.temperature)} unit="°C" status="ok" description="Temperatura externa da nave" />
      <SensorCard icon="speedometer" label="VELOCIDADE" value={sensors.speed.toFixed(2)} unit="km/s" status="ok" description="Velocidade relativa ao Sol" />

      <Text style={styles.footer}>FIAP SPACE CONTROL CENTER · TELEMETRIA LIVE</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  content: { padding: 16, paddingBottom: 32 },

  pageHeader: { marginBottom: 20 },
  header: { color: '#cc0000', fontSize: 20, fontWeight: '900', letterSpacing: 6 },
  subtitle: { color: '#333', fontSize: 9, letterSpacing: 3, marginTop: 2 },

  card: {
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#1e1e1e',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  cardCritical: { borderColor: '#ff3333', backgroundColor: '#1a0a0a' },

  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitleBlock: { flex: 1 },
  cardLabel: { color: '#fff', fontSize: 12, fontWeight: '700', letterSpacing: 2 },
  cardDescription: { color: '#444', fontSize: 10, letterSpacing: 1, marginTop: 2 },

  statusPill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  statusPillText: { fontSize: 9, fontWeight: '700', letterSpacing: 2 },

  divider: { height: 1, backgroundColor: '#1e1e1e', marginBottom: 12 },

  cardValueRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 6 },
  cardValue: { fontSize: 36, fontWeight: '900', lineHeight: 40 },
  cardUnit: { color: '#555', fontSize: 13, marginBottom: 4, letterSpacing: 1 },

  footer: { color: '#1a1a1a', fontSize: 9, letterSpacing: 2, textAlign: 'center', marginTop: 8 },
});