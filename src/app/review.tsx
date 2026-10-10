import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const sampleReviews = [
  { id: 'r1', name: 'Michael Vance', rating: 5, comment: 'Outstanding communication and delivered the full stack backend ahead of schedule!', date: '21 Sep 2026' },
  { id: 'r2', name: 'Emma Watson', rating: 5, comment: 'Clean UI/UX design and very responsive throughout the project.', date: '12 Sep 2026' },
];

export default function ReviewScreen() {
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState(sampleReviews);

  const submitReview = () => {
    if (!comment.trim()) {
      Alert.alert('Error', 'Please write a review comment before submitting.');
      return;
    }

    const newRev = {
      id: Date.now().toString(),
      name: 'Sarah Jenkins',
      rating: rating,
      comment: comment,
      date: 'Today',
    };

    setReviews([newRev, ...reviews]);
    setComment('');
    Alert.alert('Success', 'Your review and rating have been submitted successfully!');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reviews & Ratings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Write Review Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Rate Your Experience</Text>
          
          {/* Star Selector */}
          <View style={styles.starRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <Text style={[styles.star, star <= rating && styles.activeStar]}>★</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={styles.textArea}
            placeholder="Write your feedback about the project..."
            placeholderTextColor="#777"
            multiline
            numberOfLines={4}
            value={comment}
            onChangeText={setComment}
            textAlignVertical="top"
          />

          <TouchableOpacity style={styles.submitButton} onPress={submitReview}>
            <Text style={styles.submitButtonText}>Submit Review</Text>
          </TouchableOpacity>
        </View>

        {/* Existing Reviews */}
        <Text style={styles.sectionHeader}>Client & Freelancer Reviews</Text>
        {reviews.map((rev) => (
          <View key={rev.id} style={styles.reviewCard}>
            <View style={styles.reviewTop}>
              <Text style={styles.reviewerName}>{rev.name}</Text>
              <Text style={styles.reviewDate}>{rev.date}</Text>
            </View>
            <View style={styles.starRowSmall}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Text key={s} style={[styles.starSmall, s <= rev.rating && styles.activeStarSmall]}>★</Text>
              ))}
            </View>
            <Text style={styles.reviewComment}>{rev.comment}</Text>
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
  content: { padding: 16 },
  card: { backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16, marginBottom: 20, borderWidth: 1, borderColor: '#2A2A2A' },
  cardTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  starRow: { flexDirection: 'row', marginBottom: 16 },
  star: { fontSize: 28, color: '#444', marginRight: 8 },
  activeStar: { color: '#FFCC00' },
  textArea: { backgroundColor: '#121212', color: '#fff', padding: 12, borderRadius: 8, height: 90, borderWidth: 1, borderColor: '#2A2A2A', marginBottom: 12 },
  submitButton: { backgroundColor: '#007AFF', padding: 14, borderRadius: 8, alignItems: 'center' },
  submitButtonText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  sectionHeader: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  reviewCard: { backgroundColor: '#1E1E1E', borderRadius: 12, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: '#2A2A2A' },
  reviewTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  reviewerName: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  reviewDate: { color: '#777', fontSize: 12 },
  starRowSmall: { flexDirection: 'row', marginBottom: 6 },
  starSmall: { fontSize: 14, color: '#444', marginRight: 2 },
  activeStarSmall: { color: '#FFCC00' },
  reviewComment: { color: '#ccc', fontSize: 13 },
});