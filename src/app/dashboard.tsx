import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DashboardScreen() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<'freelancer' | 'client'>('freelancer');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>User Dashboard</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Role Toggle Tabs */}
        <View style={styles.roleToggleContainer}>
          <TouchableOpacity 
            style={[styles.roleTab, userRole === 'freelancer' && styles.activeRoleTab]}
            onPress={() => setUserRole('freelancer')}
          >
            <Text style={[styles.roleTabText, userRole === 'freelancer' && styles.activeRoleTabText]}>
              👨‍💻 Freelancer View
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.roleTab, userRole === 'client' && styles.activeRoleTab]}
            onPress={() => setUserRole('client')}
          >
            <Text style={[styles.roleTabText, userRole === 'client' && styles.activeRoleTabText]}>
              🤝 Client View
            </Text>
          </TouchableOpacity>
        </View>

        {userRole === 'freelancer' ? (
          /* FREELANCER DASHBOARD */
          <View>
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>$1,240</Text>
                <Text style={styles.statLabel}>Total Earnings</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>3</Text>
                <Text style={styles.statLabel}>Active Orders</Text>
              </View>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>⭐ 4.9</Text>
                <Text style={styles.statLabel}>Rating (120)</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>5</Text>
                <Text style={styles.statLabel}>Active Services</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Freelancer Quick Actions</Text>
            
            <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/my-orders')}>
              <Text style={styles.actionIcon}>📦</Text>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.actionTitle}>Manage Active Projects & Orders</Text>
                <Text style={styles.actionSubtitle}>Update milestones and deliverables</Text>
              </View>
              <Text style={{ color: '#007AFF' }}>➔</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/messages')}>
              <Text style={styles.actionIcon}>💬</Text>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.actionTitle}>Client Messages</Text>
                <Text style={styles.actionSubtitle}>Check unread chats and inquiries</Text>
              </View>
              <Text style={{ color: '#007AFF' }}>➔</Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* CLIENT DASHBOARD */
          <View>
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>2</Text>
                <Text style={styles.statLabel}>Posted Jobs</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>1</Text>
                <Text style={styles.statLabel}>Active Projects</Text>
              </View>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>4</Text>
                <Text style={styles.statLabel}>Proposals Received</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>2</Text>
                <Text style={styles.statLabel}>Saved Favorites</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Client Quick Actions</Text>

            <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/find-jobs')}>
              <Text style={styles.actionIcon}>💼</Text>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.actionTitle}>Browse Job Listings & Proposals</Text>
                <Text style={styles.actionSubtitle}>Review submitted proposals from freelancers</Text>
              </View>
              <Text style={{ color: '#007AFF' }}>➔</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/favorites')}>
              <Text style={styles.actionIcon}>❤️</Text>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.actionTitle}>View Saved Favorites</Text>
                <Text style={styles.actionSubtitle}>Quick access to bookmarked services</Text>
              </View>
              <Text style={{ color: '#007AFF' }}>➔</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: { 
    paddingHorizontal: 16, 
    paddingVertical: 14, 
    backgroundColor: '#1E1E1E', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  backText: { color: '#007AFF', fontSize: 16, fontWeight: '600' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  scrollContent: { padding: 16 },
  roleToggleContainer: { 
    flexDirection: 'row', 
    backgroundColor: '#1E1E1E', 
    borderRadius: 10, 
    padding: 4, 
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  roleTab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  activeRoleTab: { backgroundColor: '#007AFF' },
  roleTabText: { color: '#888', fontWeight: '600', fontSize: 14 },
  activeRoleTabText: { color: '#fff' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, gap: 12 },
  statCard: { 
    flex: 1, 
    backgroundColor: '#1E1E1E', 
    borderRadius: 12, 
    padding: 16, 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  statNumber: { color: '#4CD964', fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  statLabel: { color: '#aaa', fontSize: 12, fontWeight: '500' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginVertical: 16 },
  actionCard: { 
    backgroundColor: '#1E1E1E', 
    borderRadius: 12, 
    padding: 16, 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  actionIcon: { fontSize: 24 },
  actionTitle: { color: '#fff', fontSize: 15, fontWeight: 'bold', marginBottom: 2 },
  actionSubtitle: { color: '#888', fontSize: 12 },
});