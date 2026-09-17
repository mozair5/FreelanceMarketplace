import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProjectDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const projectTitle = params.title || 'Project Details';
  
  const [milestones, setMilestones] = useState([
    { id: 'm1', title: 'UI Wireframes & Design System', completed: true },
    { id: 'm2', title: 'Frontend Component Integration', completed: true },
    { id: 'm3', title: 'API Connection & State Management', completed: false },
    { id: 'm4', title: 'Final Testing & Deployment', completed: false },
  ]);

  const [deliveryNote, setDeliveryNote] = useState('');

  const toggleMilestone = (id: string) => {
    setMilestones(milestones.map(m => m.id === id ? { ...m, completed: !m.completed } : m));
  };

  const handleDeliverProject = () => {
    if (!deliveryNote.trim()) {
      Alert.alert('Error', 'Please include a submission note or link for the client.');
      return;
    }
    Alert.alert('Success', 'Project deliverables submitted to the client successfully!');
    setDeliveryNote('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Project Management</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Project Header Info */}
        <View style={styles.card}>
          <Text style={styles.projectTitle}>{projectTitle}</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Client:</Text>
            <Text style={styles.infoValue}>Sarah Jenkins</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Agreed Budget:</Text>
            <Text style={styles.priceHighlight}>$500</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Deadline:</Text>
            <Text style={styles.infoValue}>22 Sep 2026</Text>
          </View>
        </View>

        {/* Milestones Section */}
        <Text style={styles.sectionHeader}>Project Milestones & Tasks</Text>
        <View style={styles.card}>
          {milestones.map((m) => (
            <TouchableOpacity key={m.id} style={styles.milestoneRow} onPress={() => toggleMilestone(m.id)}>
              <View style={[styles.checkbox, m.completed && styles.checkedBox]}>
                {m.completed && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={[styles.milestoneText, m.completed && styles.completedText]}>{m.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Delivery / Submission Section */}
        <Text style={styles.sectionHeader}>Submit Deliverables</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.textArea}
            placeholder="Provide preview link, notes, or repo details for the client..."
            placeholderTextColor="#777"
            multiline
            numberOfLines={4}
            value={deliveryNote}
            onChangeText={setDeliveryNote}
            textAlignVertical="top"
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleDeliverProject}>
            <Text style={styles.submitButtonText}>Submit Work to Client ➔</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#1E1E1E' },
  backText: { color: '#007AFF', fontSize: 16, fontWeight: '600' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  content: { padding: 16 },
  card: { backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16, marginBottom: 20, borderWidth: 1, borderColor: '#2A2A2A' },
  projectTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 12 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  infoLabel: { color: '#888', fontSize: 14 },
  infoValue: { color: '#fff', fontSize: 14, fontWeight: '600' },
  priceHighlight: { color: '#4CD964', fontSize: 14, fontWeight: 'bold' },
  sectionHeader: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginBottom: 10, marginTop: 4 },
  milestoneRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#262626' },
  checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: '#555', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  checkedBox: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
  checkmark: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  milestoneText: { color: '#ccc', fontSize: 14, flex: 1 },
  completedText: { color: '#777', textDecorationLine: 'line-through' },
  textArea: { backgroundColor: '#121212', color: '#fff', padding: 12, borderRadius: 8, height: 100, borderWidth: 1, borderColor: '#2A2A2A', marginBottom: 12 },
  submitButton: { backgroundColor: '#007AFF', padding: 14, borderRadius: 8, alignItems: 'center' },
  submitButtonText: { color: '#fff', fontSize: 15, fontWeight: 'bold' }
});