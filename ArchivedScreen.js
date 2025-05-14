import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, StyleSheet, Alert, Image, Dimensions, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = 375;
const SCREEN_HEIGHT = 700;

const ArchivedScreen = ({ navigation }) => {
  const [archivedListings, setArchivedListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredListings, setFilteredListings] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    New: false,
    Pending: false,
    Approved: false,
  });
  const [showFilterBox, setShowFilterBox] = useState(false);

  useEffect(() => {
    const loadArchivedListings = async () => {
      try {
        const storedArchived = await AsyncStorage.getItem('archivedListings');
        if (storedArchived) {
          setArchivedListings(JSON.parse(storedArchived));
        }
      } catch (error) {
        console.error('Error loading archived listings:', error);
      }
    };
    loadArchivedListings();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, archivedListings, selectedFilters]);

  const applyFilters = () => {
    let filtered = archivedListings;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.propertyTitle?.toLowerCase().includes(query) ||
          item.propertyLocation?.toLowerCase().includes(query)
      );
    }

    // Status filter
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

  const handleUnarchive = async (idToUnarchive) => {
    const itemToUnarchive = archivedListings.find(item => item.id === idToUnarchive);
    if (!itemToUnarchive) return;

    try {
      const updatedArchived = archivedListings.filter(item => item.id !== idToUnarchive);
      await AsyncStorage.setItem('archivedListings', JSON.stringify(updatedArchived));
      setArchivedListings(updatedArchived);

      const storedListings = await AsyncStorage.getItem('propertyListings');
      const listings = storedListings ? JSON.parse(storedListings) : [];
      const updatedListings = [...listings, itemToUnarchive];
      await AsyncStorage.setItem('propertyListings', JSON.stringify(updatedListings));

      Alert.alert('Unarchived', 'The item has been unarchived successfully.');
    } catch (error) {
      console.error('Error unarchiving listing:', error);
      Alert.alert('Error', 'Failed to unarchive the listing.');
    }
  };

  const handleDelete = async (idToDelete) => {
    const updatedArchived = archivedListings.filter(item => item.id !== idToDelete);
    await AsyncStorage.setItem('archivedListings', JSON.stringify(updatedArchived));
    setArchivedListings(updatedArchived);

    Alert.alert('Deleted', 'The item has been deleted successfully.');
  };

  const renderArchivedItem = ({ item }) => {
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
        <TouchableOpacity
          style={styles.unarchiveButton}
          onPress={() => handleUnarchive(item.id)}
        >
          <Text style={styles.buttonText}>Unarchive</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.phoneMockup}>
        {/* Search Input */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search property name or location"
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Toggle Filter Button */}
        <TouchableOpacity
          style={styles.toggleFilterButton}
          onPress={() => setShowFilterBox(!showFilterBox)}
        >
          <Text style={styles.toggleFilterButtonText}>
            {showFilterBox ? 'Hide Filters' : 'Show Filters'}
          </Text>
        </TouchableOpacity>

        {/* Filter Box */}
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

        {/* Listings */}
        <FlatList
          data={filteredListings}
          keyExtractor={(item) => item.id}
          renderItem={renderArchivedItem}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.emptyText}>No archived listings.</Text>}
        />

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
  // Layout containers
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

  // Search and filter
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
  applyButton: {
    backgroundColor: '#28a745',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  // Listings
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

  // Card buttons
  unarchiveButton: {
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

  // Other
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
});
export default ArchivedScreen;
