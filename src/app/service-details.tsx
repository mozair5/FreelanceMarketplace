import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ServiceDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>{params.title}</Text>
        <Text style={styles.freelancer}>Offered by: {params.freelancer}</Text>
        
        <View style={styles.row}>
          <Text style={styles.price}>{params.price}</Text>
          <Text style={styles.rating}>⭐ {params.rating}</Text>
        </View>

        <Text style={styles.sectionHeader}>About This Service</Text>
        <Text style={styles.description}>{params.description}</Text>

        <TouchableOpacity style={styles.bookButton} onPress={() => alert('Order Placed Successfully!')}>
          <Text style={styles.bookButtonText}>Book Service</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 16 },
  backButton: { marginBottom: 20 },
  backButtonText: { color: '#007AFF', fontSize: 16, fontWeight: '600' },
  content: { flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  freelancer: { fontSize: 16, color: '#aaa', marginBottom: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24, backgroundColor: '#1E1E1E', padding: 16, borderRadius: 8 },
  price: { fontSize: 18, fontWeight: 'bold', color: '#4CD964' },
  rating: { fontSize: 16, color: '#FFCC00' },
  sectionHeader: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  description: { fontSize: 15, color: '#ccc', lineHeight: 22, marginBottom: 30 },
  bookButton: { backgroundColor: '#007AFF', padding: 16, borderRadius: 8, alignItems: 'center' },
  bookButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});