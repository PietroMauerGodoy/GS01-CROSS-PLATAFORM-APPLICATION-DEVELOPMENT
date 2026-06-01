import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useMission } from '../context/MissionContext';

export default function AlertsScreen() {
  const { alerts, markAlertRead, clearAlerts, unreadCount } = useMission();

  const typeColor = { critical: '#ff3333', warning: '#ffaa00', info: '#00aaff' };
  const typeLabel = { critical: 'CRÍTICO', warning: 'ATENÇÃO', info: 'INFO' };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.header}>◈ CENTRAL DE ALERTAS</Text>
          {unreadCount > 0 && (
            <Text style={styles.unreadBadge}>{unreadCount} NÃO LIDO{unreadCount > 1 ? 'S' : ''}</Text>
          )}
        </View>
        {alerts.length > 0 && (
          <TouchableOpacity style={styles.clearBtn} onPress={clearAlerts}>
            <Text style={styles.clearBtnText}>LIMPAR</Text>
          </TouchableOpacity>
        )}
      </View>

      {alerts.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>✓</Text>
          <Text style={styles.emptyText}>NENHUM ALERTA</Text>
          <Text style={styles.emptySubtext}>TODOS OS SISTEMAS OPERANDO NORMALMENTE</Text>
        </View>
      ) : (
        alerts.map((alert) => (
          <TouchableOpacity
            key={alert.id}
            style={[styles.alertCard, { borderColor: alert.read ? '#1a1a1a' : typeColor[alert.type] }]}
            onPress={() => markAlertRead(alert.id)}
            activeOpacity={0.7}
          >
            <View style={styles.alertHeader}>
              <View style={[styles.typeBadge, { backgroundColor: typeColor[alert.type] + '22' }]}>
                <Text style={[styles.typeText, { color: typeColor[alert.type] }]}>
                  {typeLabel[alert.type]}
                </Text>
              </View>
              <Text style={styles.timestamp}>{alert.timestamp}</Text>
              {!alert.read && <View style={[styles.unreadDot, { backgroundColor: typeColor[alert.type] }]} />}
            </View>
            <Text style={[styles.alertMessage, { color: alert.read ? '#444' : '#ddd' }]}>
              {alert.message}
            </Text>
            {!alert.read && <Text style={styles.tapHint}>TOQUE PARA MARCAR COMO LIDO</Text>}
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
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  header: { color: '#cc0000', fontSize: 11, letterSpacing: 4, fontWeight: '700', marginBottom: 4 },
  unreadBadge: { color: '#ff3333', fontSize: 10, letterSpacing: 2, fontWeight: '700' },
  clearBtn: { borderWidth: 1, borderColor: '#333', borderRadius: 4, paddingHorizontal: 12, paddingVertical: 6 },
  clearBtnText: { color: '#555', fontSize: 10, letterSpacing: 2, fontWeight: '700' },
  emptyState: { alignItems: 'center', paddingVertical: 64 },
  emptyIcon: { color: '#00ff88', fontSize: 48, marginBottom: 16 },
  emptyText: { color: '#00ff88', fontSize: 14, fontWeight: '700', letterSpacing: 4, marginBottom: 8 },
  emptySubtext: { color: '#333', fontSize: 10, letterSpacing: 2 },
  alertCard: { backgroundColor: '#111', borderWidth: 1, borderRadius: 4, padding: 14, marginBottom: 10 },
  alertHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  typeBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 2 },
  typeText: { fontSize: 9, fontWeight: '700', letterSpacing: 2 },
  timestamp: { color: '#333', fontSize: 10, letterSpacing: 1, flex: 1 },
  unreadDot: { width: 8, height: 8, borderRadius: 4 },
  alertMessage: { fontSize: 13, lineHeight: 20, letterSpacing: 0.5 },
  tapHint: { color: '#333', fontSize: 9, letterSpacing: 2, marginTop: 8 },
  footer: { color: '#1a1a1a', fontSize: 9, letterSpacing: 2, textAlign: 'center', marginTop: 16 },
});