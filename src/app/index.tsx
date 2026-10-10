import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const categories = ['All', 'Web Dev', 'Mobile App', 'Graphic Design', 'Data Analysis'];
const sortOptions = ['Recommended', 'Price: Low to High', 'Price: High to Low', 'Highest Rating'];

const initialServices = [
  { id: '1', title: 'React Native Mobile App', category: 'Mobile App', freelancer: 'Ozair Khan', priceNum: 45, price: '$45/hr', rating: 4.9, reviews: '120', description: 'Build high-performance cross-platform mobile applications using React Native and Expo.' },
  { id: '2', title: 'Full Stack Web Platform', category: 'Web Dev', freelancer: 'Mahad Mustafa', priceNum: 60, price: '$60/hr', rating: 5.0, reviews: '95', description: 'Scalable web applications built with React, Node.js, Express, and MongoDB.' },
  { id: '3', title: 'UI/UX Brand Identity', category: 'Graphic Design', freelancer: 'Abdur Rahman', priceNum: 40, price: '$40/hr', rating: 4.8, reviews: '80', description: 'Professional UI/UX design systems, wireframes, and brand identities using Figma.' },
];

export default function MarketplaceScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Recommended');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(item => item !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Filter services by search query and category
  const filteredServices = initialServices.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.freelancer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort filtered services
  const sortedServices = [...filteredServices].sort((a, b) => {
    if (selectedSort === 'Price: Low to High') return a.priceNum - b.priceNum;
    if (selectedSort === 'Price: High to Low') return b.priceNum - a.priceNum;
    if (selectedSort === 'Highest Rating') return b.rating - a.rating;
    return 0; // 'Recommended' default order
  });

  const handleNavigate = (path: any) => {
    setDrawerOpen(false);
    router.push(path);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Side Navigation Drawer Modal */}
      <Modal
        visible={drawerOpen}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setDrawerOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity 
            style={styles.backdropTouch} 
            activeOpacity={1} 
            onPress={() => setDrawerOpen(false)} 
          />
          <SafeAreaView style={styles.drawerContainer}>
            {/* Drawer Header */}
            <View style={styles.drawerHeader}>
              <Text style={styles.drawerTitle}>CodioraMarket</Text>
              <TouchableOpacity onPress={() => setDrawerOpen(false)} style={styles.closeBtn}>
                <Text style={styles.closeBtnText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Navigation Links */}
            <ScrollView style={styles.drawerMenu}>
              <Text style={styles.menuSectionHeader}>NAVIGATION</Text>
              
              <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigate('/dashboard')}>
                <Text style={styles.menuIcon}>📊</Text>
                <Text style={styles.menuText}>User Dashboard</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigate('/messages')}>
                <Text style={styles.menuIcon}>💬</Text>
                <Text style={styles.menuText}>Messages & Chat</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigate('/notifications')}>
                <Text style={styles.menuIcon}>🔔</Text>
                <Text style={styles.menuText}>Notifications</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigate('/review')}>
                <Text style={styles.menuIcon}>⭐</Text>
                <Text style={styles.menuText}>Submit Review</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigate('/favorites')}>
                <Text style={styles.menuIcon}>❤️</Text>
                <Text style={styles.menuText}>Saved Favorites</Text>
              </TouchableOpacity>

              <View style={styles.menuDivider} />

              <Text style={styles.menuSectionHeader}>WORK & ORDERS</Text>

              <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigate('/find-jobs')}>
                <Text style={styles.menuIcon}>💼</Text>
                <Text style={styles.menuText}>Looking for Work</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigate('/my-orders')}>
                <Text style={styles.menuIcon}>📦</Text>
                <Text style={styles.menuText}>Active Orders & Contracts</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigate('/profile')}>
                <Text style={styles.menuIcon}>👤</Text>
                <Text style={styles.menuText}>My Profile</Text>
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        </View>
      </Modal>

      {/* Main Screen Header with Hamburger Menu Icon */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setDrawerOpen(true)} style={styles.menuButton}>
          <Text style={styles.hamburgerIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.logoText}>CodioraMarket</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
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

        {/* Quick Navigation Banners */}
        <TouchableOpacity style={styles.findJobsBanner} onPress={() => router.push('/find-jobs')}>
          <View>
            <Text style={styles.bannerTitle}>💼 Looking for Work?</Text>
            <Text style={styles.bannerSubtitle}>Browse client job listings and submit proposals ➔</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.ordersBanner} onPress={() => router.push('/my-orders')}>
          <View>
            <Text style={styles.ordersBannerTitle}>Active Orders & Contracts</Text>
            <Text style={styles.ordersBannerSubtitle}>Manage milestones, progress, and deliverables ➔</Text>
          </View>
        </TouchableOpacity>

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

        {/* Sorting Row & Filter Header */}
        <View style={styles.filterSortRow}>
          <Text style={styles.sectionTitle}>Featured Services ({sortedServices.length})</Text>
          <TouchableOpacity 
            style={styles.sortButton} 
            onPress={() => setSortDropdownOpen(!sortDropdownOpen)}
          >
            <Text style={styles.sortButtonText}>Sort: {selectedSort} ▾</Text>
          </TouchableOpacity>
        </View>

        {/* Sort Options Dropdown */}
        {sortDropdownOpen && (
          <View style={styles.dropdownContainer}>
            {sortOptions.map((option) => (
              <TouchableOpacity 
                key={option} 
                style={[styles.dropdownItem, selectedSort === option && styles.activeDropdownItem]}
                onPress={() => {
                  setSelectedSort(option);
                  setSortDropdownOpen(false);
                }}
              >
                <Text style={[styles.dropdownText, selectedSort === option && styles.activeDropdownText]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Services List */}
        {sortedServices.length > 0 ? (
          sortedServices.map((service) => {
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

                <TouchableOpacity
                  style={styles.detailsButton}
                  onPress={() => router.push({
                    pathname: '/service-details',
                    params: { 
                      title: service.title, 
                      freelancer: service.freelancer, 
                      price: service.price, 
                      rating: service.rating.toString(), 
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
          <View style={styles.emptyContainer}>
            <Text style={styles.noResultText}>No services found matching your criteria.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  scrollContent: { padding: 16 },
  header: { 
    paddingHorizontal: 16, 
    paddingVertical: 12,
    backgroundColor: '#1E1E1E', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  menuButton: { padding: 4 },
  hamburgerIcon: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  logoText: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  
  modalOverlay: { flex: 1, flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.6)' },
  backdropTouch: { flex: 1 },
  drawerContainer: { 
    width: '78%', 
    backgroundColor: '#181818', 
    height: '100%', 
    padding: 20,
    borderRightWidth: 1,
    borderRightColor: '#2A2A2A',
  },
  drawerHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  drawerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  closeBtn: { padding: 4 },
  closeBtnText: { color: '#aaa', fontSize: 22, fontWeight: 'bold' },
  drawerMenu: { flex: 1 },
  menuSectionHeader: { color: '#666', fontSize: 11, fontWeight: 'bold', marginBottom: 12 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, marginBottom: 4 },
  menuIcon: { fontSize: 20, marginRight: 16 },
  menuText: { color: '#eee', fontSize: 16, fontWeight: '500' },
  menuDivider: { height: 1, backgroundColor: '#2A2A2A', marginVertical: 16 },

  searchContainer: { marginBottom: 16 },
  searchInput: { backgroundColor: '#2A2A2A', color: '#fff', padding: 12, borderRadius: 8, fontSize: 16 },
  categoryContainer: { marginBottom: 16 },
  categoryPill: { backgroundColor: '#2A2A2A', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, marginRight: 10 },
  selectedPill: { backgroundColor: '#007AFF' },
  categoryText: { color: '#aaa', fontWeight: '600' },
  selectedCategoryText: { color: '#fff' },
  
  filterSortRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  sortButton: { backgroundColor: '#1E1E1E', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, borderColor: '#2A2A2A' },
  sortButtonText: { color: '#007AFF', fontSize: 13, fontWeight: '600' },

  dropdownContainer: { backgroundColor: '#1E1E1E', borderRadius: 8, marginBottom: 16, borderWidth: 1, borderColor: '#2A2A2A', overflow: 'hidden' },
  dropdownItem: { paddingVertical: 10, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: '#2A2A2A' },
  activeDropdownItem: { backgroundColor: '#2A2A2A' },
  dropdownText: { color: '#aaa', fontSize: 14 },
  activeDropdownText: { color: '#fff', fontWeight: 'bold' },

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
  
  emptyContainer: { paddingVertical: 40, alignItems: 'center' },
  noResultText: { color: '#888', textAlign: 'center', fontSize: 14 },
  
  findJobsBanner: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  bannerTitle: { color: '#fff', fontSize: 15, fontWeight: 'bold', marginBottom: 4 },
  bannerSubtitle: { color: '#007AFF', fontSize: 13, fontWeight: '600' },
  ordersBanner: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  ordersBannerTitle: { color: '#4CD964', fontSize: 15, fontWeight: 'bold', marginBottom: 4 },
  ordersBannerSubtitle: { color: '#aaa', fontSize: 13 },
});