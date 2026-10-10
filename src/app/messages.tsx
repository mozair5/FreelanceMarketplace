import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const sampleConversations = [
  {
    id: 'c1',
    name: 'Sarah Jenkins',
    lastMessage: 'Looks great! Can we adjust the milestone delivery?',
    time: '10:45 AM',
    unread: true,
  },
  {
    id: 'c2',
    name: 'Michael Vance',
    lastMessage: 'The backend API integration is deployed and tested.',
    time: 'Yesterday',
    unread: false,
  },
  {
    id: 'c3',
    name: 'Emma Watson',
    lastMessage: 'Thanks for the quick UI redesign!',
    time: '12 Sep',
    unread: false,
  },
];

export default function MessagesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.listContainer}>
        {sampleConversations.map((conv) => (
          <TouchableOpacity 
            key={conv.id} 
            style={[styles.chatCard, conv.unread && styles.unreadCard]}
            onPress={() => router.push({ pathname: '/chat', params: { name: conv.name } })}
          >
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>{conv.name.charAt(0)}</Text>
            </View>

            <View style={styles.chatInfo}>
              <View style={styles.chatTopRow}>
                <Text style={styles.chatName}>{conv.name}</Text>
                <Text style={styles.chatTime}>{conv.time}</Text>
              </View>
              <Text style={[styles.lastMessage, conv.unread && styles.unreadMessage]} numberOfLines={1}>
                {conv.lastMessage}
              </Text>
            </View>

            {conv.unread && <View style={styles.unreadDot} />}
          </TouchableOpacity>
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
  listContainer: { padding: 16 },
  chatCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E1E1E', borderRadius: 12, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: '#2A2A2A' },
  unreadCard: { borderColor: '#007AFF', backgroundColor: '#161b22' },
  avatarContainer: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#2A2A2A', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  avatarText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  chatInfo: { flex: 1 },
  chatTopRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  chatName: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  chatTime: { color: '#888', fontSize: 12 },
  lastMessage: { color: '#aaa', fontSize: 13 },
  unreadMessage: { color: '#fff', fontWeight: '600' },
  unreadDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#007AFF', marginLeft: 8 },
});