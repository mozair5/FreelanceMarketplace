import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FreelancerProfileScreen() {
  const router = useRouter();

  const freelancer = {
    name: 'Ozair Khan',
    title: 'React Native & Full-Stack Developer',
    about: 'Passionate software engineering student building high-performance mobile applications and backend architectures.',
    skills: ['React Native', 'TypeScript', 'Node.js', 'Expo', 'MongoDB'],
    rating: '4.9',
    completedJobs: '34',
    startingPrice: '$40/hr'
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        {/* Header Profile Section */}
        <View style={styles.headerCard}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>{freelancer.name.charAt(0)}</Text>
          </View>
          <Text style={styles.name}>{freelancer.name}</Text>
          <Text style={styles.titleText}>{freelancer.title}</Text>
          <Text style={styles.priceTag}>Starting at {freelancer.startingPrice}</Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>⭐ {freelancer.rating}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>💼 {freelancer.completedJobs}</Text>
            <Text style={styles.statLabel}>Jobs Done</Text>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.aboutText}>{freelancer.about}</Text>
        </View>

        {/* Skills Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {freelancer.skills.map((skill, index) => (
              <View key={index} style={styles.skillBadge}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.contactButton} onPress={() => alert('Contact feature coming soon!')}>
          <Text style={styles.contactButtonText}>Hire Freelancer</Text>
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
  headerCard: { backgroundColor: '#1E1E1E', borderRadius: 12, padding: 20, alignItems: 'center', marginBottom: 15 },
  avatarPlaceholder: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  avatarText: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  name: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  titleText: { fontSize: 14, color: '#aaa', textAlign: 'center', marginBottom: 10 },
  priceTag: { color: '#4CD964', fontSize: 16, fontWeight: 'bold' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, gap: 10 },
  statBox: { flex: 1, backgroundColor: '#1E1E1E', padding: 15, borderRadius: 10, alignItems: 'center' },
  statValue: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  statLabel: { fontSize: 12, color: '#888' },
  section: { backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16, marginBottom: 15 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  aboutText: { color: '#ccc', fontSize: 14, lineHeight: 20 },
  skillsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  skillBadge: { backgroundColor: '#2A2A2A', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6 },
  skillText: { color: '#007AFF', fontSize: 12, fontWeight: '600' },
  contactButton: { backgroundColor: '#007AFF', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 10, marginBottom: 30 },
  contactButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});