import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const sampleOrders = [
  {
    id: 'ord-1',
    title: 'React Native App Redesign',
    client: 'Sarah Jenkins',
    budget: '$500',
    deadline: '22 Sep 2026',
    status: 'In Progress',
    progress: 60,
  },
  {
    id: 'ord-2',
    title: 'Full Stack E-Commerce Backend',
    client: 'Michael Vance',
    budget: '$1,200',
    deadline: '30 Sep 2026',
    status: 'Submitted',
    progress: 90,
  },
  {
    id: 'ord-3',
    title: 'Landing Page UI/UX',
    client: 'Emma Watson',
    budget: '$300',
    deadline: '10 Sep 2026',
    status: 'Completed',
    progress: 100,
  },
];

export default function MyOrdersScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState('All');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return { bg: '#1b4d2e', text: '#4CD964' };
      case 'Submitted': return { bg: '#1b3b4d', text: '#007AFF' };
      case 'In Progress': return { bg: '#4d3d1b', text: '#FFCC00' };
      case 'Cancelled': return { bg: '#4d1b1b', text: '#FF3B30' };
      default: return { bg: '#333', text: '#ccc' };
    }
  };

  const filteredOrders = filter === 'All' 
    ? sampleOrders 
    : sampleOrders.filter(o => o.status === filter);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders & Projects</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        {['All', 'In Progress', 'Submitted', 'Completed'].map((tab) => (
          <TouchableOpacity 
            key={tab} 
            style={[styles.filterTab, filter === tab && styles.activeFilterTab]}
            onPress={() => setFilter(tab)}
          >
            <Text style={[styles.filterText, filter === tab && styles.activeFilterText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.listContainer}>
        {filteredOrders.map((ord) => {
          const statusStyle = getStatusColor(ord.status);
          return (
            <TouchableOpacity 
              key={ord.id} 
              style={styles.orderCard}
              onPress={() => router.push({ pathname: '/project-details', params: { orderId: ord.id, title: ord.title } })}
            >
              <View style={styles.cardTop}>
                <Text style={styles.orderTitle} numberOfLines={1}>{ord.title}</Text>
                <View style={[styles.badge, { backgroundColor: statusStyle.bg }]}>
                  <Text style={[styles.badgeText, { color: statusStyle.text }]}>{ord.status}</Text>
                </View>
              </View>

              <Text style={styles.clientText}>Client: {ord.client}</Text>

              <View style={styles.metaRow}>
                <Text style={styles.metaText}>Budget: <Text style={styles.highlight}>{ord.budget}</Text></Text>
                <Text style={styles.metaText}>Due: <Text style={styles.highlight}>{ord.deadline}</Text></Text>
              </View>

              {/* Progress Bar */}
              <View style={styles.progressWrapper}>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressBar, { width: `${ord.progress}%` }]} />
                </View>
                <Text style={styles.progressText}>{ord.progress}%</Text>
              </View>
            </TouchableOpacity>
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
  filterContainer: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#181818' },
  filterTab: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16, marginRight: 8, backgroundColor: '#262626' },
  activeFilterTab: { backgroundColor: '#007AFF' },
  filterText: { color: '#aaa', fontSize: 12, fontWeight: '600' },
  activeFilterText: { color: '#fff' },
  listContainer: { padding: 16 },
  orderCard: { backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#2A2A2A' },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  orderTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff', flex: 1, marginRight: 8 },
  badge: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: 8 },
  badgeText: { fontSize: 11, fontWeight: 'bold' },
  clientText: { color: '#888', fontSize: 13, marginBottom: 12 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  metaText: { color: '#aaa', fontSize: 12 },
  highlight: { color: '#fff', fontWeight: '600' },
  progressWrapper: { flexDirection: 'row', alignItems: 'center' },
  progressTrack: { flex: 1, height: 6, backgroundColor: '#2A2A2A', borderRadius: 3, overflow: 'hidden', marginRight: 10 },
  progressBar: { height: '100%', backgroundColor: '#007AFF', borderRadius: 3 },
  progressText: { color: '#aaa', fontSize: 12, fontWeight: '600', width: 35, textAlign: 'right' }
});