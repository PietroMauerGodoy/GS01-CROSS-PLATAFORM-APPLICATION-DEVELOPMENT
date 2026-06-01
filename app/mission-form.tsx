import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useMission } from '../context/MissionContext';
import { useState } from 'react';

type FormErrors = {
  name?: string;
  destination?: string;
  launchDate?: string;
  crew?: string;
};

export default function MissionFormScreen() {
  const { mission, updateMission, addAlert } = useMission();

  const [name, setName] = useState(mission.name);
  const [destination, setDestination] = useState(mission.destination);
  const [launchDate, setLaunchDate] = useState(mission.launchDate);
  const [crew, setCrew] = useState(mission.crew);
  const [status, setStatus] = useState(mission.status);
  const [errors, setErrors] = useState<FormErrors>({});
  const [saved, setSaved] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) newErrors.name = 'Nome da missão é obrigatório';
    else if (name.trim().length < 3) newErrors.name = 'Mínimo de 3 caracteres';

    if (!destination.trim()) newErrors.destination = 'Destino é obrigatório';

    if (!launchDate.trim()) newErrors.launchDate = 'Data de lançamento é obrigatória';
    else if (!/^\d{4}-\d{2}-\d{2}$/.test(launchDate)) newErrors.launchDate = 'Formato: AAAA-MM-DD';

    if (!crew.trim()) newErrors.crew = 'Número de tripulantes é obrigatório';
    else if (isNaN(Number(crew)) || Number(crew) < 1 || Number(crew) > 10)
      newErrors.crew = 'Entre 1 e 10 tripulantes';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    updateMission({ name: name.trim(), destination: destination.trim(), launchDate, crew, status });
    addAlert({ type: 'info', message: `ℹ️ Missão "${name.trim()}" atualizada com sucesso.` });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const statusOptions: Array<{ value: 'active' | 'standby' | 'aborted'; label: string; color: string }> = [
    { value: 'active', label: 'ATIVO', color: '#00ff88' },
    { value: 'standby', label: 'STANDBY', color: '#ffaa00' },
    { value: 'aborted', label: 'ABORTADO', color: '#ff3333' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.header}>◈ CONFIGURAR MISSÃO</Text>
      <Text style={styles.subtitle}>DADOS PERSISTIDOS LOCALMENTE VIA ASYNCSTORAGE</Text>

      {saved && (
        <View style={styles.successBanner}>
          <Text style={styles.successText}>✓ MISSÃO ATUALIZADA COM SUCESSO</Text>
        </View>
      )}

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>NOME DA MISSÃO *</Text>
        <TextInput
          style={[styles.input, errors.name ? styles.inputError : null]}
          value={name}
          onChangeText={(t) => { setName(t); setErrors((e) => ({ ...e, name: undefined })); }}
          placeholder="ex: FIAP-ALPHA-01"
          placeholderTextColor="#333"
          autoCapitalize="characters"
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>DESTINO *</Text>
        <TextInput
          style={[styles.input, errors.destination ? styles.inputError : null]}
          value={destination}
          onChangeText={(t) => { setDestination(t); setErrors((e) => ({ ...e, destination: undefined })); }}
          placeholder="ex: Marte"
          placeholderTextColor="#333"
        />
        {errors.destination && <Text style={styles.errorText}>{errors.destination}</Text>}
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>DATA DE LANÇAMENTO * (AAAA-MM-DD)</Text>
        <TextInput
          style={[styles.input, errors.launchDate ? styles.inputError : null]}
          value={launchDate}
          onChangeText={(t) => { setLaunchDate(t); setErrors((e) => ({ ...e, launchDate: undefined })); }}
          placeholder="ex: 2026-06-09"
          placeholderTextColor="#333"
          keyboardType="numeric"
        />
        {errors.launchDate && <Text style={styles.errorText}>{errors.launchDate}</Text>}
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>NÚMERO DE TRIPULANTES * (1-10)</Text>
        <TextInput
          style={[styles.input, errors.crew ? styles.inputError : null]}
          value={crew}
          onChangeText={(t) => { setCrew(t); setErrors((e) => ({ ...e, crew: undefined })); }}
          placeholder="ex: 3"
          placeholderTextColor="#333"
          keyboardType="numeric"
          maxLength={2}
        />
        {errors.crew && <Text style={styles.errorText}>{errors.crew}</Text>}
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>STATUS DA MISSÃO</Text>
        <View style={styles.statusRow}>
          {statusOptions.map((opt) => (
            <TouchableOpacity
              key={opt.value}
              style={[styles.statusOption, status === opt.value && { borderColor: opt.color, backgroundColor: opt.color + '11' }]}
              onPress={() => setStatus(opt.value)}
            >
              <Text style={[styles.statusOptionText, { color: status === opt.value ? opt.color : '#444' }]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.8}>
        <Text style={styles.saveBtnText}>◈ SALVAR MISSÃO</Text>
      </TouchableOpacity>

      <View style={styles.teamCard}>
        <Text style={styles.teamTitle}>◈ EQUIPE DE DESENVOLVIMENTO</Text>
        <Text style={styles.teamMember}>Patrick Mansour · RM 562970</Text>
        <Text style={styles.teamMember}>Pietro Mauer · RM 564345</Text>
        <Text style={styles.teamMember}>Samir Assad · RM 561562</Text>
        <Text style={styles.teamCourse}>CIÊNCIA DA COMPUTAÇÃO · FIAP · 2026</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  content: { padding: 16, paddingBottom: 32 },
  header: { color: '#cc0000', fontSize: 11, letterSpacing: 4, fontWeight: '700', marginBottom: 4 },
  subtitle: { color: '#333', fontSize: 9, letterSpacing: 2, marginBottom: 20 },
  successBanner: { backgroundColor: '#001a0d', borderWidth: 1, borderColor: '#00ff88', borderRadius: 4, padding: 12, marginBottom: 16, alignItems: 'center' },
  successText: { color: '#00ff88', fontSize: 11, fontWeight: '700', letterSpacing: 2 },
  fieldGroup: { marginBottom: 18 },
  fieldLabel: { color: '#555', fontSize: 10, letterSpacing: 3, fontWeight: '700', marginBottom: 8 },
  input: { backgroundColor: '#111', borderWidth: 1, borderColor: '#222', borderRadius: 4, paddingHorizontal: 14, paddingVertical: 12, color: '#fff', fontSize: 14, letterSpacing: 1 },
  inputError: { borderColor: '#ff3333' },
  errorText: { color: '#ff3333', fontSize: 10, letterSpacing: 1, marginTop: 6 },
  statusRow: { flexDirection: 'row', gap: 10 },
  statusOption: { flex: 1, borderWidth: 1, borderColor: '#222', borderRadius: 4, paddingVertical: 12, alignItems: 'center' },
  statusOptionText: { fontSize: 10, fontWeight: '700', letterSpacing: 2 },
  saveBtn: { backgroundColor: '#cc0000', borderRadius: 4, paddingVertical: 16, alignItems: 'center', marginTop: 8, marginBottom: 24 },
  saveBtnText: { color: '#fff', fontSize: 13, fontWeight: '900', letterSpacing: 4 },
  teamCard: { backgroundColor: '#111', borderWidth: 1, borderColor: '#1a1a1a', borderRadius: 4, padding: 16 },
  teamTitle: { color: '#333', fontSize: 9, letterSpacing: 3, fontWeight: '700', marginBottom: 12 },
  teamMember: { color: '#444', fontSize: 11, letterSpacing: 1, marginBottom: 4 },
  teamCourse: { color: '#222', fontSize: 9, letterSpacing: 2, marginTop: 8 },
});