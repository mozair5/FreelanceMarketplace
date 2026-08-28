import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const categories = ['All', 'Web Dev', 'Mobile App', 'Graphic Design', 'Data Analysis'];

const initialServices = [
  { id: '1', title: 'React Native Mobile App', category: 'Mobile App', freelancer: 'Ozair Khan', price: '$45/hr', rating: '4.9', reviews: '120', description: 'Build high-performance cross-platform mobile applications using React Native and Expo.' },
  { id: '2', title: 'Full Stack Web Platform', category: 'Web Dev', freelancer: 'Mahad Mustafa', price: '$60/hr', rating: '5.0', reviews: '95', description: 'Scalable web applications built with React, Node.js, Express, and MongoDB.' },
  { id: '3', title: 'UI/UX Brand Identity', category: 'Graphic Design', freelancer: 'Abdur Rahman', price: '$40/hr', rating: '4.8', reviews: '80', description: 'Professional UI/UX design systems, wireframes, and brand identities using Figma.' },
];

export default function MarketplaceScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(item => item !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const filteredServices = initialServices.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.freelancer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logoText}>CodioraMarket</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search services or freelancers..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Categories Horizontal Scroll */}
      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[styles.categoryPill, selectedCategory === category && styles.selectedPill]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[styles.categoryText, selectedCategory === category && styles.selectedCategoryText]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Services List */}
      <ScrollView contentContainerStyle={styles.listContainer}>
        <Text style={styles.sectionTitle}>Featured Services</Text>
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => {
            const isFav = favorites.includes(service.id);
            return (
              <View key={service.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.serviceCategory}>{service.category}</Text>
                  <TouchableOpacity onPress={() => toggleFavorite(service.id)}>
                    <Text style={{ fontSize: 20 }}>{isFav ? '❤️' : '🤍'}</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.serviceTitle}>{service.title}</Text>
                
                {/* Clickable Freelancer Name to open Profile Screen */}
                <TouchableOpacity 
                  onPress={() => router.push({
                    pathname: '/profile',
                    params: { freelancer: service.freelancer }
                  })}
                >
                  <Text style={styles.freelancerName}>by {service.freelancer} ➔</Text>
                </TouchableOpacity>
                
                <View style={styles.cardFooter}>
                  <Text style={styles.priceText}>{service.price}</Text>
                  <Text style={styles.ratingText}>⭐ {service.rating} ({service.reviews})</Text>
                </View>

                {/* View Details Button */}
                <TouchableOpacity
                  style={styles.detailsButton}
                  onPress={() => router.push({
                    pathname: '/service-details',
                    params: { 
                      title: service.title, 
                      freelancer: service.freelancer, 
                      price: service.price, 
                      rating: service.rating, 
                      description: service.description 
                    }
                  })}
                >
                  <Text style={styles.detailsButtonText}>View Details</Text>
                </TouchableOpacity>
              </View>
            );
          })
        ) : (
          <Text style={styles.noResultText}>No services found.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: { padding: 16, backgroundColor: '#1E1E1E' },
  logoText: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  searchContainer: { padding: 16 },
  searchInput: { backgroundColor: '#2A2A2A', color: '#fff', padding: 12, borderRadius: 8, fontSize: 16 },
  categoryContainer: { paddingHorizontal: 16, marginBottom: 16 },
  categoryPill: { backgroundColor: '#2A2A2A', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, marginRight: 10 },
  selectedPill: { backgroundColor: '#007AFF' },
  categoryText: { color: '#aaa', fontWeight: '600' },
  selectedCategoryText: { color: '#fff' },
  listContainer: { padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 12 },
  card: { backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16, marginBottom: 16 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  serviceCategory: { color: '#007AFF', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase' },
  serviceTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  freelancerName: { color: '#4CD964', fontSize: 14, marginBottom: 12, fontWeight: '600' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  priceText: { color: '#4CD964', fontSize: 16, fontWeight: 'bold' },
  ratingText: { color: '#FFCC00', fontSize: 14 },
  detailsButton: { backgroundColor: '#333', padding: 10, borderRadius: 8, alignItems: 'center' },
  detailsButtonText: { color: '#fff', fontWeight: '600' },
  noResultText: { color: '#888', textAlign: 'center', marginTop: 20 }
});