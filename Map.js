import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const Pending = ({ navigation }) => {
  const soldListings = [
    {
      id: 1,
      propertyImage: 'https://via.placeholder.com/400x200',
      propertyTitle: 'Modern Apartment in Downtown',
      propertyPrice: '450000',
      soldDate: '2024-12-15',
    },
    {
      id: 2,
      propertyImage: 'https://via.placeholder.com/400x200',
      propertyTitle: 'Spacious Suburban House',
      propertyPrice: '750000',
      soldDate: '2025-02-01',
    },
    {
      id: 3,
      propertyImage: 'https://via.placeholder.com/400x200',
      propertyTitle: 'Cozy Countryside Cottage',
      propertyPrice: '320000',
      soldDate: '2024-10-22',
    },
  ];

  const formatPrice = (price) =>
    `$${price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Sold History</Text>

        {soldListings.map((listing) => (
          <View key={listing.id} style={styles.card}>
            <Image source={{ uri: listing.propertyImage }} style={styles.image} />
            <Text style={styles.cardTitle}>{listing.propertyTitle}</Text>
            <Text style={styles.price}>{formatPrice(listing.propertyPrice)}</Text>
            <Text style={styles.detail}>Sold on: {listing.soldDate}</Text>
          </View>
        ))}

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  wrapper: {
    width: '100%',
    maxWidth: 375,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  price: {
    fontSize: 18,
    color: '#28a745',
    marginTop: 5,
  },
  detail: {
    fontSize: 16,
    marginTop: 5,
  },
  backButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Pending;
