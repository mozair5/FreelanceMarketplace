import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const sampleNotifications = [
  {
    id: 'n1',
    title: 'New Message',
    message: 'Sarah Jenkins sent you a message regarding the project.',
    time: '10 mins ago',
    unread: true,
  },
  {
    id: 'n2',
    title: 'Proposal Accepted',
    message: 'Your proposal for "React Native App Redesign" was accepted!',
    time: '2 hours ago',
    unread: true,
  },
  {
    id: 'n3',
    title: 'Project Completed',
    message: 'Client Emma Watson marked "Landing Page UI/UX" as completed.',
    time: 'Yesterday',
    unread: false,
  },
  {
    id: 'n4',
    title: 'Review Received',
    message: 'You received a 5-star rating from Michael Vance.',
    time: '2 days ago',
    unread: false,
  },
];

export default function NotificationsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(sampleNotifications);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity onPress={markAllAsRead}>
          <Text style={styles.clearText}>Mark Read</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.listContainer}>
        {notifications.map((notif) => (
          <View key={notif.id} style={[styles.card, notif.unread && styles.unreadCard]}>
            <View style={styles.rowTop}>
              <Text style={[styles.notifTitle, notif.unread && styles.unreadTitle]}>{notif.title}</Text>
              <Text style={styles.notifTime}>{notif.time}</Text>
            </View>
            <Text style={styles.notifMessage}>{notif.message}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#1E1E1E' },
  backText: { color: '#007AFF', fontSize: 16, fontWeight: '600' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  clearText: { color: '#007AFF', fontSize: 13, fontWeight: '600' },
  listContainer: { padding: 16 },
  card: { backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#2A2A2A' },
  unreadCard: { backgroundColor: '#161b22', borderColor: '#007AFF' },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  notifTitle: { color: '#aaa', fontSize: 14, fontWeight: '600' },
  unreadTitle: { color: '#fff', fontWeight: 'bold' },
  notifTime: { color: '#777', fontSize: 12 },
  notifMessage: { color: '#ccc', fontSize: 14 },
});