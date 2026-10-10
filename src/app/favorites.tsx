import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FavoritesScreen() {
  const router = useRouter();

  // Mock initial favorite IDs matching your marketplace services
  const [favorites, setFavorites] = useState([
    { id: '1', title: 'React Native Mobile App', category: 'Mobile App', freelancer: 'Ozair Khan', price: '$45/hr', rating: '4.9', reviews: '120' },
    { id: '2', title: 'Full Stack Web Platform', category: 'Web Dev', freelancer: 'Mahad Mustafa', price: '$60/hr', rating: '5.0', reviews: '95' }
  ]);

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter(item => item !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Saved Favorites</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {favorites.length > 0 ? (
          favorites.map((service) => (
            <View key={service.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.serviceCategory}>{service.category}</Text>
                <TouchableOpacity onPress={() => removeFavorite(service.id)}>
                  <Text style={{ fontSize: 18 }}>❤️</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.freelancerName}>by {service.freelancer}</Text>
              
              <View style={styles.cardFooter}>
                <Text style={styles.priceText}>{service.price}</Text>
                <Text style={styles.ratingText}>⭐ {service.rating} ({service.reviews})</Text>
              </View>

              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => router.push('/service-details')}
              >
                <Text style={styles.detailsButtonText}>View Service</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          /* Step 7: Professional Empty State */
          <View style={styles.emptyContainer}>
            <Text style={{ fontSize: 40, marginBottom: 12 }}>🤍</Text>
            <Text style={styles.emptyTitle}>No favorites saved</Text>
            <Text style={styles.emptySubtitle}>Explore the marketplace and tap the heart icon on any service to save it for later.</Text>
            
            <TouchableOpacity style={styles.exploreBtn} onPress={() => router.push('/')}>
              <Text style={styles.exploreBtnText}>Browse Marketplace</Text>
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
  scrollContent: { padding: 16, flexGrow: 1 },
  card: { backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#2A2A2A' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  serviceCategory: { color: '#007AFF', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase' },
  serviceTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  freelancerName: { color: '#4CD964', fontSize: 14, marginBottom: 12, fontWeight: '600' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  priceText: { color: '#4CD964', fontSize: 16, fontWeight: 'bold' },
  ratingText: { color: '#FFCC00', fontSize: 14 },
  detailsButton: { backgroundColor: '#2A2A2A', padding: 10, borderRadius: 8, alignItems: 'center' },
  detailsButtonText: { color: '#fff', fontWeight: '600' },
  
  /* Empty State Styling */
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 80, paddingHorizontal: 20 },
  emptyTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  emptySubtitle: { color: '#888', fontSize: 14, textAlign: 'center', lineHeight: 20, marginBottom: 24 },
  exploreBtn: { backgroundColor: '#007AFF', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8 },
  exploreBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});