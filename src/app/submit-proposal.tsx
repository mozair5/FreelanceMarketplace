import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SubmitProposalScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const jobTitle = params.jobTitle || 'Selected Job';
  const defaultBudget = params.budget || '$500';

  const [proposedPrice, setProposedPrice] = useState(defaultBudget);
  const [deliveryTime, setDeliveryTime] = useState('7 Days');
  const [coverLetter, setCoverLetter] = useState('');

  const handleSubmit = () => {
    if (!coverLetter.trim()) {
      Alert.alert('Error', 'Please enter a cover letter for your proposal.');
      return;
    }

    Alert.alert(
      'Success!',
      'Your proposal has been submitted successfully.',
      [{ text: 'OK', onPress: () => router.push('/my-proposals') }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Submit Proposal</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.formContainer}>
        {/* Job Info Card */}
        <View style={styles.jobContextCard}>
          <Text style={styles.contextLabel}>Applying For:</Text>
          <Text style={styles.contextTitle}>{jobTitle}</Text>
        </View>

        {/* Proposed Price Input */}
        <Text style={styles.label}>Proposed Price ($)</Text>
        <TextInput
          style={styles.input}
          value={proposedPrice}
          onChangeText={setProposedPrice}
          placeholder="e.g. $500"
          placeholderTextColor="#777"
          keyboardType="numeric"
        />

        {/* Delivery Time Input */}
        <Text style={styles.label}>Estimated Delivery Time</Text>
        <TextInput
          style={styles.input}
          value={deliveryTime}
          onChangeText={setDeliveryTime}
          placeholder="e.g. 5 Days"
          placeholderTextColor="#777"
        />

        {/* Cover Letter Input */}
        <Text style={styles.label}>Cover Letter</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={coverLetter}
          onChangeText={setCoverLetter}
          placeholder="Explain why you are the best fit for this project..."
          placeholderTextColor="#777"
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Send Proposal ➔</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#1E1E1E' },
  backText: { color: '#007AFF', fontSize: 16, fontWeight: '600' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  formContainer: { padding: 20 },
  jobContextCard: { backgroundColor: '#1E1E1E', padding: 16, borderRadius: 10, marginBottom: 20, borderWidth: 1, borderColor: '#2A2A2A' },
  contextLabel: { color: '#007AFF', fontSize: 12, fontWeight: 'bold', marginBottom: 4, textTransform: 'uppercase' },
  contextTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  label: { color: '#ccc', fontSize: 14, fontWeight: '600', marginBottom: 8, marginTop: 12 },
  input: { backgroundColor: '#1E1E1E', color: '#fff', padding: 14, borderRadius: 8, fontSize: 16, borderWidth: 1, borderColor: '#2A2A2A' },
  textArea: { height: 130, paddingTop: 14 },
  submitButton: { backgroundColor: '#007AFF', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 30 },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});