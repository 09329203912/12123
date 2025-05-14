import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const SCREEN_WIDTH = 375;
const SCREEN_HEIGHT = 700;

const generateId = () =>
  `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;

const NewListing = ({ navigation, listings, setListings }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredListings, setFilteredListings] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    New: false,
    Pending: false,
    Approved: false,
  });
  const [showFilterBox, setShowFilterBox] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const loadListings = async () => {
        try {
          const storedListings = await AsyncStorage.getItem('propertyListings');
          if (storedListings !== null) {
            let parsedListings = JSON.parse(storedListings);
            parsedListings = parsedListings.map((item) => ({
              ...item,
              id: item.id || generateId(),
            }));
            setListings(parsedListings);
          }
        } catch (error) {
          console.error('Failed to load listings:', error);
        }
      };
      loadListings();
    }, [])
  );

  useEffect(() => {
    applyFilters();
  }, [searchQuery, listings, selectedFilters]);

  const applyFilters = () => {
    let filtered = listings;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.propertyTitle?.toLowerCase().includes(query) ||
          item.propertyLocation?.toLowerCase().includes(query)
      );
    }

    const active = Object.entries(selectedFilters)
      .filter(([_, v]) => v)
      .map(([k]) => k);

    if (active.length) {
      filtered = filtered.filter((item) => {
        const status = item.propertyStatus;
        if (selectedFilters.New && status !== 'Pending' && status !== 'Approved') return true;
        if (selectedFilters.Pending && status === 'Pending') return true;
        if (selectedFilters.Approved && status === 'Approved') return true;
        return false;
      });
    }

    setFilteredListings(filtered);
  };

  const handleCheckboxToggle = (filterName) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const handleArchive = async (idToArchive) => {
    const itemToArchive = listings.find(item => item.id === idToArchive);
    if (!itemToArchive) return;

    try {
      // Remove from current listings
      const updatedListings = listings.filter(item => item.id !== idToArchive);
      await AsyncStorage.setItem('propertyListings', JSON.stringify(updatedListings));
      setListings(updatedListings);

      // Add to archived listings
      const storedArchived = await AsyncStorage.getItem('archivedListings');
      const archivedListings = storedArchived ? JSON.parse(storedArchived) : [];
      
      // Ensure the image URL is part of the archived property object
      const updatedArchived = [...archivedListings, itemToArchive];
      await AsyncStorage.setItem('archivedListings', JSON.stringify(updatedArchived));

      Alert.alert('Archived', 'The item has been archived successfully.');
    } catch (error) {
      console.error('Error archiving listing:', error);
      Alert.alert('Error', 'Failed to archive the listing.');
    }
};

  const renderItem = ({ item }) => {
    const formattedPrice = item.propertyPrice
      ? `$${item.propertyPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
      : 'Invalid Price';

    return (
      <View style={styles.card}>
        <Image
          source={{
            uri: item.propertyImage || 'https://via.placeholder.com/300x200.png?text=No+Image',
          }}
          style={styles.image}
        />
        <Text style={styles.title}>{item.propertyTitle}</Text>
        <Text style={styles.price}>{formattedPrice}</Text>
        <Text style={styles.location}>{item.propertyLocation}</Text>
        <View style={styles.descriptionRow}>
          <Text style={styles.description}>{item.propertyDescription}</Text>
          {item.propertyStatus === 'Pending' && (
            <Text style={styles.pendingBadge}>Waiting for Approval</Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => navigation.navigate('Detailsfirst', { listing: item })}
        >
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.archiveButton}
          onPress={() => handleArchive(item.id)}
        >
          <Text style={styles.buttonText}>Archive</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.phoneMockup}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search property name or location"
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <TouchableOpacity
          style={styles.toggleFilterButton}
          onPress={() => setShowFilterBox(!showFilterBox)}
        >
          <Text style={styles.toggleFilterButtonText}>
            {showFilterBox ? 'Hide Filters' : 'Show Filters'}
          </Text>
        </TouchableOpacity>

        {showFilterBox && (
          <View style={styles.filterBox}>
            <Text style={styles.filterLabel}>Filter</Text>
            {['New', 'Pending', 'Approved'].map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.checkboxRow}
                onPress={() => handleCheckboxToggle(option)}
              >
                <View style={[styles.checkbox, selectedFilters[option] && styles.checkboxChecked]}>
                  {selectedFilters[option] && <View style={styles.checkboxTick} />}
                </View>
                <Text style={styles.checkboxLabel}>{option}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        )}

        <FlatList
          data={filteredListings}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No listings found.</Text>
          }
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('Addlist')}
        >
          <Text style={styles.addButtonText}>+ Add Listing</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.backButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneMockup: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 20,
    elevation: 6,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  toggleFilterButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  toggleFilterButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  filterBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  filterLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#007bff',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#007bff',
  },
  checkboxTick: {
    width: 10,
    height: 10,
    backgroundColor: '#fff',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
  },
  applyButton: {
    marginTop: 10,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#fefefe',
    marginBottom: 15,
    padding: 12,
    borderRadius: 12,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  price: {
    fontSize: 16,
    color: '#28a745',
    marginVertical: 4,
  },
  location: {
    fontSize: 14,
    color: '#007bff',
    marginBottom: 4,
  },
  descriptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  description: {
    fontSize: 14,
    color: '#555',
    flex: 1,
  },
  pendingBadge: {
    backgroundColor: '#ffc107',
    color: '#000',
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  detailsButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 14,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 25,
    marginTop: 15,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 20,
  },
  archiveButton: {
    backgroundColor: '#6c757d', // Grey-ish
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
    alignItems: 'center',
  },
});

export default NewListing;
