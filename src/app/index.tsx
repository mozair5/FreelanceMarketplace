import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const categories = [
  { id: '1', name: 'Web Dev' },
  { id: '2', name: 'Mobile App' },
  { id: '3', name: 'Graphic Design' },
  { id: '4', name: 'Data Analysis' },
];

const services = [
  { id: '1', title: 'React Native Mobile App', freelancer: 'Ozair Khan', price: '$45/hr', rating: '4.9' },
  { id: '2', title: 'Full Stack Web Platform', freelancer: 'Mahad Mustafa', price: '$60/hr', rating: '5.0' },
  { id: '3', title: 'UI/UX Brand Identity', freelancer: 'Abdur Rahman', price: '$40/hr', rating: '4.8' },
];

export default function MarketplaceScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header / Search Section */}
      <View style={styles.header}>
        <Text style={styles.logoText}>CodioraMarket</Text>
        <TextInput 
          style={styles.searchBar} 
          placeholder="Search for services or freelancers..." 
          placeholderTextColor="#888"
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Popular Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((cat) => (
              <TouchableOpacity key={cat.id} style={styles.categoryCard}>
                <Text style={styles.categoryText}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Freelancer/Service Preview Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Featured Services</Text>
          {services.map((service) => (
            <View key={service.id} style={styles.serviceCard}>
              <View>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.freelancerName}>by {service.freelancer}</Text>
              </View>
              <View style={styles.serviceMeta}>
                <Text style={styles.servicePrice}>{service.price}</Text>
                <Text style={styles.serviceRating}>★ {service.rating}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
  },
  header: {
    marginTop: 10,
    marginBottom: 20,
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
  },
  searchBar: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e1e4e8',
    fontSize: 14,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  categoryCard: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: {
    color: '#fff',
    fontWeight: '600',
  },
  serviceCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e1e4e8',
  },
  serviceTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  freelancerName: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  serviceMeta: {
    alignItems: 'flex-end',
  },
  servicePrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  serviceRating: {
    fontSize: 13,
    color: '#f39c12',
    marginTop: 4,
  },
});