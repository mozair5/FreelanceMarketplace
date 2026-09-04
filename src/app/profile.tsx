import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const router = useRouter();

  // Add the logout function here
  const handleLogout = async () => {
    await AsyncStorage.removeItem('isLoggedIn');
    router.replace('/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back to Market</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>OK</Text>
          </View>
          <Text style={styles.name}>Ozair Khan</Text>
          <Text style={styles.email}>ozair@example.com</Text>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/edit-profile')}>
            <Text style={styles.menuText}>✏️ Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/my-services')}>
            <Text style={styles.menuText}>📦 My Services / Gigs</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/freelancer-profile')}>
            <Text style={styles.menuText}>👤 View Freelancer Public Profile</Text>
          </TouchableOpacity>

          {/* Connected handleLogout to the Log Out button */}
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Text style={[styles.menuText, { color: '#FF3B30' }]}>🚪 Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  content: { padding: 20 },
  backButton: { marginBottom: 20 },
  backButtonText: { color: '#007AFF', fontSize: 16, fontWeight: '600' },
  header: { alignItems: 'center', marginBottom: 30, backgroundColor: '#1E1E1E', padding: 20, borderRadius: 12 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  avatarText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  name: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  email: { fontSize: 14, color: '#aaa' },
  menuContainer: { gap: 12 },
  menuItem: { backgroundColor: '#1E1E1E', padding: 16, borderRadius: 10 },
  menuText: { color: '#fff', fontSize: 16, fontWeight: '600' }
});