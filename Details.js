import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Details = ({ route, navigation }) => {
  const { listing } = route.params;

  const formattedPrice = listing.propertyPrice
    ? `$${listing.propertyPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
    : 'Invalid Price';

  const handleSubmit = async () => {
    try {
      const storedListings = await AsyncStorage.getItem('propertyListings');
      if (storedListings !== null) {
        const listings = JSON.parse(storedListings);
        const updatedListings = listings.map((item) =>
          item.id === listing.id
            ? { ...item, propertyStatus: 'Pending' }
            : item
        );
        await AsyncStorage.setItem('propertyListings', JSON.stringify(updatedListings));
        Alert.alert('Submitted', 'Your listing has been submitted.');
        navigation.navigate('NewListing');
      }
    } catch (error) {
      console.error('Error submitting listing:', error);
      Alert.alert('Error', 'Failed to submit the listing.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.wrapper}>
        <Image source={{ uri: listing.propertyImage }} style={styles.image} />
        <Text style={styles.title}>{listing.propertyTitle}</Text>
        <Text style={styles.price}>{formattedPrice}</Text>
        <Text style={styles.description}>{listing.propertyDescription}</Text>
        <Text style={styles.detail}>Beds: {listing.propertyBeds}</Text>
        <Text style={styles.detail}>Baths: {listing.propertyBaths}</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('NewListing')}
          style={styles.backButton}
        >
          <Text style={styles.buttonText}>Back to Listings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSubmit}
          style={[styles.backButton, styles.submitButton]}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  wrapper: {
    width: '100%',
    maxWidth: 375,
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  price: {
    fontSize: 20,
    color: '#28a745',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginTop: 5,
  },
  backButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Details;
