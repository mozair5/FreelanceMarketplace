import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MyServicesScreen() {
  const router = useRouter();
  const [myServices, setMyServices] = useState([
    { id: '1', title: 'React Native Mobile App', category: 'Mobile App', price: '$45/hr' },
    { id: '2', title: 'UI/UX Wireframing', category: 'Design', price: '$35/hr' }
  ]);

  const handleDelete = (id: string) => {
    Alert.alert('Delete Service', 'Are you sure you want to delete this service?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => setMyServices(myServices.filter(s => s.id !== id)) }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>My Services</Text>
        <TouchableOpacity onPress={() => router.push('/create-service')} style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.listContainer}>
        {myServices.length > 0 ? (
          myServices.map((service) => (
            <View key={service.id} style={styles.card}>
              <View>
                <Text style={styles.category}>{service.category}</Text>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.price}>{service.price}</Text>
              </View>
              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.editBtn} onPress={() => alert('Edit service functionality')}>
                  <Text style={styles.btnText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(service.id)}>
                  <Text style={styles.btnText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>You have no active services listed.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#1E1E1E' },
  backButtonText: { color: '#007AFF', fontSize: 16, fontWeight: '600' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  addButton: { backgroundColor: '#007AFF', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6 },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  listContainer: { padding: 16 },
  card: { backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16, marginBottom: 16 },
  category: { color: '#007AFF', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 4 },
  serviceTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginBottom: 6 },
  price: { color: '#4CD964', fontSize: 15, fontWeight: 'bold', marginBottom: 12 },
  actionRow: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10 },
  editBtn: { backgroundColor: '#333', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 6 },
  deleteBtn: { backgroundColor: '#FF3B30', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 6 },
  btnText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  emptyText: { color: '#888', textAlign: 'center', marginTop: 40, fontSize: 16 }
});