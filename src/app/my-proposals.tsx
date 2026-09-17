import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const sampleProposals = [
  {
    id: 'p1',
    jobTitle: 'React Native App Redesign',
    proposedPrice: '$480',
    deliveryTime: '5 Days',
    status: 'Pending',
    submittedDate: 'Yesterday'
  },
  {
    id: 'p2',
    jobTitle: 'Full Stack E-Commerce Backend',
    proposedPrice: '$1,150',
    deliveryTime: '10 Days',
    status: 'Accepted',
    submittedDate: '3 days ago'
  },
  {
    id: 'p3',
    jobTitle: 'SaaS Landing Page Design',
    proposedPrice: '$280',
    deliveryTime: '3 Days',
    status: 'Rejected',
    submittedDate: '5 days ago'
  }
];

export default function MyProposalsScreen() {
  const router = useRouter();

  // Helper for dynamic status badge colors
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Accepted': return { backgroundColor: '#1b4d2e', color: '#4CD964' };
      case 'Rejected': return { backgroundColor: '#4d1b1b', color: '#FF3B30' };
      default: return { backgroundColor: '#4d3d1b', color: '#FFCC00' };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Proposals</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.listContainer}>
        <Text style={styles.sectionTitle}>Track Your Bids</Text>

        {sampleProposals.map((prop) => {
          const badgeStyle = getStatusStyle(prop.status);
          return (
            <View key={prop.id} style={styles.proposalCard}>
              <View style={styles.cardTopRow}>
                <Text style={styles.jobTitle} numberOfLines={1}>{prop.jobTitle}</Text>
                <View style={[styles.statusBadge, { backgroundColor: badgeStyle.backgroundColor }]}>
                  <Text style={[styles.statusText, { color: badgeStyle.color }]}>{prop.status}</Text>
                </View>
              </View>

              <View style={styles.detailsRow}>
                <View>
                  <Text style={styles.detailLabel}>Bid Amount</Text>
                  <Text style={styles.detailValue}>{prop.proposedPrice}</Text>
                </View>
                <View>
                  <Text style={styles.detailLabel}>Delivery</Text>
                  <Text style={styles.detailValue}>{prop.deliveryTime}</Text>
                </View>
                <View>
                  <Text style={styles.detailLabel}>Submitted</Text>
                  <Text style={styles.detailValue}>{prop.submittedDate}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#1E1E1E' },
  backText: { color: '#007AFF', fontSize: 16, fontWeight: '600' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  listContainer: { padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 16 },
  proposalCard: { backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#2A2A2A' },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  jobTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff', flex: 1, marginRight: 8 },
  statusBadge: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 12 },
  statusText: { fontSize: 12, fontWeight: 'bold' },
  detailsRow: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#2A2A2A', paddingTop: 12 },
  detailLabel: { color: '#777', fontSize: 11, marginBottom: 2, textTransform: 'uppercase' },
  detailValue: { color: '#fff', fontSize: 14, fontWeight: '600' }
});