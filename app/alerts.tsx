import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMission } from '../context/MissionContext';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

export default function AlertsScreen() {
  const { alerts, markAlertRead, clearAlerts, unreadCount } = useMission();

  const typeColor = { critical: '#ff3333', warning: '#ffaa00', info: '#00aaff' };
  const typeLabel = { critical: 'CRÍTICO', warning: 'ATENÇÃO', info: 'INFO' };
  const typeIcon: Record<string, IoniconsName> = {
    critical: 'alert-circle',
    warning: 'warning',
    info: 'information-circle',
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.pageHeader}>
        <View>
          <Text style={styles.header}>ALERTAS</Text>
          <Text style={styles.subtitle}>
            {unreadCount > 0 ? `${unreadCount} NÃO LIDO${unreadCount > 1 ? 'S' : ''}` : 'NENHUM ALERTA PENDENTE'}
          </Text>
        </View>
        {alerts.length > 0 && (
          <TouchableOpacity style={styles.clearBtn} onPress={clearAlerts}>
            <Ionicons name="trash" size={14} color="#555" />
            <Text style={styles.clearBtnText}>LIMPAR</Text>
          </TouchableOpacity>
        )}
      </View>

      {alerts.length === 0 ? (
        <View style={styles.emptyState}>
          <View style={styles.emptyIconBox}>
            <Ionicons name="checkmark-circle" size={48} color="#00ff88" />
          </View>
          <Text style={styles.emptyText}>TODOS OS SISTEMAS NOMINAIS</Text>
          <Text style={styles.emptySubtext}>NENHUM ALERTA REGISTRADO</Text>
        </View>
      ) : (
        alerts.map((alert) => (
          <TouchableOpacity
            key={alert.id}
            style={[styles.alertCard, { borderColor: alert.read ? '#1e1e1e' : typeColor[alert.type] }]}
            onPress={() => markAlertRead(alert.id)}
            activeOpacity={0.7}
          >
            <View style={styles.alertHeader}>
              <View style={[styles.iconBox, { backgroundColor: typeColor[alert.type] + '18', borderColor: typeColor[alert.type] + '44' }]}>
                <Ionicons name={typeIcon[alert.type]} size={18} color={typeColor[alert.type]} />
              </View>
              <View style={styles.alertMeta}>
                <Text style={[styles.typeText, { color: typeColor[alert.type] }]}>
                  {typeLabel[alert.type]}
                </Text>
                <Text style={styles.timestamp}>{alert.timestamp}</Text>
              </View>
              {!alert.read && (
                <View style={[styles.unreadDot, { backgroundColor: typeColor[alert.type] }]} />
              )}
            </View>

            <Text style={[styles.alertMessage, { color: alert.read ? '#444' : '#ccc' }]}>
              {alert.message.replace(/^[^\s]+\s/, '')}
            </Text>

            {!alert.read && (
              <Text style={styles.tapHint}>TOQUE PARA MARCAR COMO LIDO</Text>
            )}
          </TouchableOpacity>
        ))
      )}

      <Text style={styles.footer}>FIAP SPACE CONTROL CENTER · LOG DE ALERTAS</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  content: { padding: 16, paddingBottom: 32 },

  pageHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
  header: { color: '#cc0000', fontSize: 20, fontWeight: '900', letterSpacing: 6 },
  subtitle: { color: '#333', fontSize: 9, letterSpacing: 3, marginTop: 2 },

  clearBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1, borderColor: '#2a2a2a', borderRadius: 6, paddingHorizontal: 12, paddingVertical: 8 },
  clearBtnText: { color: '#555', fontSize: 10, letterSpacing: 2, fontWeight: '700' },

  emptyState: { alignItems: 'center', paddingVertical: 80 },
  emptyIconBox: { marginBottom: 16 },
  emptyText: { color: '#00ff88', fontSize: 13, fontWeight: '700', letterSpacing: 4, marginBottom: 8 },
  emptySubtext: { color: '#333', fontSize: 10, letterSpacing: 2 },

  alertCard: {
    backgroundColor: '#111',
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
  },
  alertHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  iconBox: { width: 36, height: 36, borderRadius: 8, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  alertMeta: { flex: 1 },
  typeText: { fontSize: 10, fontWeight: '700', letterSpacing: 2 },
  timestamp: { color: '#333', fontSize: 9, letterSpacing: 1, marginTop: 2 },
  unreadDot: { width: 8, height: 8, borderRadius: 4 },

  alertMessage: { fontSize: 13, lineHeight: 20, letterSpacing: 0.3, marginLeft: 46 },
  tapHint: { color: '#2a2a2a', fontSize: 9, letterSpacing: 2, marginTop: 8, marginLeft: 46 },

  footer: { color: '#1a1a1a', fontSize: 9, letterSpacing: 2, textAlign: 'center', marginTop: 16 },
});