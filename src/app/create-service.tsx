import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateServiceScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    if (!title || !category || !price || !description) {
      Alert.alert('Error', 'Please fill in all required service details.');
      return;
    }
    Alert.alert('Success', 'Service created successfully!');
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Create New Service</Text>
        <Text style={styles.subtitle}>List your professional gig for clients</Text>

        <TextInput
          style={styles.input}
          placeholder="Service Title (e.g., React Native App)"
          placeholderTextColor="#888"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={styles.input}
          placeholder="Category (e.g., Mobile App)"
          placeholderTextColor="#888"
          value={category}
          onChangeText={setCategory}
        />

        <TextInput
          style={styles.input}
          placeholder="Price (e.g., $50/hr)"
          placeholderTextColor="#888"
          value={price}
          onChangeText={setPrice}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Service Description"
          placeholderTextColor="#888"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        <TouchableOpacity style={styles.button} onPress={handleCreate}>
          <Text style={styles.buttonText}>Publish Service</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  content: { padding: 20 },
  backButton: { marginBottom: 15 },
  backButtonText: { color: '#007AFF', fontSize: 16, fontWeight: '600' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginBottom: 5 },
  subtitle: { fontSize: 14, color: '#aaa', marginBottom: 25 },
  input: { backgroundColor: '#1E1E1E', color: '#fff', padding: 15, borderRadius: 8, fontSize: 16, marginBottom: 15 },
  textArea: { height: 100, textAlignVertical: 'top' },
  button: { backgroundColor: '#007AFF', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});