import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const jobCategories = ['All', 'Web Dev', 'Mobile App', 'UI/UX', 'Backend'];

const sampleJobs = [
  {
    id: '1',
    title: 'React Native App Redesign',
    category: 'Mobile App',
    budget: '$500',
    skills: ['React Native', 'TypeScript', 'Expo'],
    description: 'Looking for an experienced mobile developer to redesign our existing fitness tracking application and improve performance.',
    postedDate: '2 hours ago',
    proposalsCount: '4'
  },
  {
    id: '2',
    title: 'Full Stack E-Commerce Backend',
    category: 'Backend',
    budget: '$1,200',
    skills: ['Node.js', 'Express', 'MongoDB'],
    description: 'Need a scalable REST API built with authentication, Stripe payment webhooks, and order management endpoints.',
    postedDate: '1 day ago',
    proposalsCount: '8'
  },
  {
    id: '3',
    title: 'SaaS Landing Page Design',
    category: 'UI/UX',
    budget: '$300',
    skills: ['Figma', 'UI/UX', 'Wireframing'],
    description: 'Design a clean, modern, dark-mode landing page for an AI-powered developer tool.',
    postedDate: '3 days ago',
    proposalsCount: '12'
  }
];

export default function FindJobsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredJobs = sampleJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Find Jobs</Text>
        <TouchableOpacity onPress={() => router.push('/post-job')}>
          <Text style={styles.postJobText}>+ Post Job</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search jobs by title or skill..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Category Filter Pills */}
      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {jobCategories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.pill, selectedCategory === cat && styles.activePill]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.pillText, selectedCategory === cat && styles.activePillText]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Job Feed */}
      <ScrollView contentContainerStyle={styles.listContainer}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Available Openings</Text>
          <TouchableOpacity onPress={() => router.push('/my-proposals')}>
            <Text style={styles.myProposalsLink}>My Proposals ➔</Text>
          </TouchableOpacity>
        </View>

        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <View key={job.id} style={styles.jobCard}>
              <View style={styles.cardTopRow}>
                <Text style={styles.jobCategory}>{job.category}</Text>
                <Text style={styles.budgetBadge}>{job.budget}</Text>
              </View>

              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.jobDescription} numberOfLines={2}>{job.description}</Text>

              {/* Skills list */}
              <View style={styles.skillsRow}>
                {job.skills.map((skill, index) => (
                  <View key={index} style={styles.skillBadge}>
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.metaText}>Posted {job.postedDate} • {job.proposalsCount} proposals</Text>
                <TouchableOpacity
                  style={styles.applyButton}
                  onPress={() => router.push({
                    pathname: '/submit-proposal',
                    params: { jobId: job.id, jobTitle: job.title, budget: job.budget }
                  })}
                >
                  <Text style={styles.applyButtonText}>Apply Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noResults}>No jobs found matching your search.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#1E1E1E' },
  backText: { color: '#007AFF', fontSize: 16, fontWeight: '600' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  postJobText: { color: '#4CD964', fontSize: 16, fontWeight: '600' },
  searchContainer: { padding: 16 },
  searchInput: { backgroundColor: '#1E1E1E', color: '#fff', padding: 12, borderRadius: 8, fontSize: 16 },
  categoryContainer: { paddingHorizontal: 16, marginBottom: 16 },
  pill: { backgroundColor: '#1E1E1E', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, marginRight: 10 },
  activePill: { backgroundColor: '#007AFF' },
  pillText: { color: '#aaa', fontWeight: '600' },
  activePillText: { color: '#fff' },
  listContainer: { padding: 16 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  myProposalsLink: { color: '#007AFF', fontSize: 14, fontWeight: '600' },
  jobCard: { backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16, marginBottom: 16 },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  jobCategory: { color: '#007AFF', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase' },
  budgetBadge: { color: '#4CD964', fontSize: 16, fontWeight: 'bold' },
  jobTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 6 },
  jobDescription: { color: '#aaa', fontSize: 14, marginBottom: 12, lineHeight: 20 },
  skillsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 14 },
  skillBadge: { backgroundColor: '#2A2A2A', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 4 },
  skillText: { color: '#ccc', fontSize: 11 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#2A2A2A', paddingTop: 12 },
  metaText: { color: '#777', fontSize: 12 },
  applyButton: { backgroundColor: '#007AFF', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 6 },
  applyButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  noResults: { color: '#777', textAlign: 'center', marginTop: 40 }
});