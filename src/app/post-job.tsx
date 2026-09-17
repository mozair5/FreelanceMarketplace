import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PostJobScreen() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Web Dev');
  const [budget, setBudget] = useState('');
  const [skills, setSkills] = useState('');
  const [description, setDescription] = useState('');

  const handlePostJob = () => {
    if (!title.trim() || !budget.trim() || !description.trim()) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    Alert.alert(
      'Success!',
      'Your job has been posted to the marketplace.',
      [{ text: 'OK', onPress: () => router.push('/find-jobs') }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Post a New Job</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.formContainer}>
        {/* Job Title */}
        <Text style={styles.label}>Job Title *</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="e.g. Build an E-Commerce Mobile App"
          placeholderTextColor="#777"
        />

        {/* Category */}
        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={setCategory}
          placeholder="e.g. Mobile App, Web Dev, UI/UX"
          placeholderTextColor="#777"
        />

        {/* Budget */}
        <Text style={styles.label}>Budget ($) *</Text>
        <TextInput
          style={styles.input}
          value={budget}
          onChangeText={setBudget}
          placeholder="e.g. $800"
          placeholderTextColor="#777"
          keyboardType="numeric"
        />

        {/* Required Skills */}
        <Text style={styles.label}>Required Skills (Comma separated)</Text>
        <TextInput
          style={styles.input}
          value={skills}
          onChangeText={setSkills}
          placeholder="e.g. React Native, TypeScript, Node.js"
          placeholderTextColor="#777"
        />

        {/* Description */}
        <Text style={styles.label}>Project Description *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Provide details about the project requirements and goals..."
          placeholderTextColor="#777"
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handlePostJob}>
          <Text style={styles.submitButtonText}>Publish Job ➔</Text>
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
  label: { color: '#ccc', fontSize: 14, fontWeight: '600', marginBottom: 8, marginTop: 12 },
  input: { backgroundColor: '#1E1E1E', color: '#fff', padding: 14, borderRadius: 8, fontSize: 16, borderWidth: 1, borderColor: '#2A2A2A' },
  textArea: { height: 130, paddingTop: 14 },
  submitButton: { backgroundColor: '#4CD964', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 30 },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});