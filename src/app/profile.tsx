import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.avatarPlaceholder}><Text style={styles.avatarText}>👤</Text></View>
        <Text style={styles.name}>{params.freelancer || 'Freelancer Profile'}</Text>
        <Text style={styles.role}>Professional Software Engineer & Designer</Text>
        
        <Text style={styles.sectionHeader}>About</Text>
        <Text style={styles.bio}>Experienced professional with a track record of delivering high-quality marketplace projects and client satisfaction.</Text>

        <TouchableOpacity style={styles.contactButton} onPress={() => alert('Message sent to freelancer!')}>
          <Text style={styles.contactButtonText}>Contact Freelancer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 16 },
  backButton: { marginBottom: 20 },
  backButtonText: { color: '#007AFF', fontSize: 16, fontWeight: '600' },
  content: { flex: 1, alignItems: 'center' },
  avatarPlaceholder: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#2A2A2A', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  avatarText: { fontSize: 40 },
  name: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  role: { fontSize: 14, color: '#aaa', marginBottom: 24 },
  sectionHeader: { fontSize: 18, fontWeight: 'bold', color: '#fff', alignSelf: 'flex-start', marginBottom: 8 },
  bio: { fontSize: 15, color: '#ccc', lineHeight: 22, marginBottom: 30, alignSelf: 'flex-start' },
  contactButton: { backgroundColor: '#007AFF', padding: 16, borderRadius: 8, width: '100%', alignItems: 'center' },
  contactButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});