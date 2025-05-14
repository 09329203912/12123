// HomeScreen.js

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = 375;
const SCREEN_HEIGHT = 700;

const HomeScreen = ({ navigation }) => {
  const [featuredListings, setFeaturedListings] = useState([]);
  const [profileImageUri, setProfileImageUri] = useState(null);

  const loadListings = async () => {
    try {
      const storedListings = await AsyncStorage.getItem('propertyListings');
      if (storedListings) {
        const parsed = JSON.parse(storedListings);

        const cleaned = parsed
          .filter(item => item.propertyImage || item.propertyPrice)
          .map(item => ({
            ...item,
            propertyPrice: item.propertyPrice || 'N/A',
            propertyImage: item.propertyImage || 'https://via.placeholder.com/180x130.png?text=No+Image',
          }));

        setFeaturedListings(cleaned.slice(-5).reverse());
      } else {
        setFeaturedListings([]);
      }
    } catch (error) {
      console.error('Failed to load listings', error);
    }
  };

  const loadProfileImage = async () => {
    try {
      const uri = await AsyncStorage.getItem('profileImageUri');
      if (uri) {
        setProfileImageUri(uri);
      }
    } catch (error) {
      console.error('Failed to load profile image', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadListings();
      loadProfileImage();
    });
    return unsubscribe;
  }, [navigation]);

  const handlePress = (label, screen) => {
    if (screen) {
      navigation.navigate(screen);
    } else {
      Alert.alert(`${label} button pressed`);
    }
  };

  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Profile Header */}
          <View style={styles.headerContainer}>
            <View style={styles.headerBackground} />
            <View style={styles.profileContainer}>
              <Image
                source={
                  profileImageUri
                    ? { uri: profileImageUri }
                    : require('../assets/images/maganja.png')
                }
                style={styles.profileImage}
              />
              <Text style={styles.profileName}>[ Name of the Agent ]</Text>
              <Text style={styles.profileSubtitle}>Welcome to RamaLand!</Text>
              <Text style={styles.profileSubtitle}>Diq pa alam ilalagay jan, need q register functionality</Text>
            </View>
          </View>

          {/* Featured Listings */}
          <View>
            <Text style={styles.sectionTitle}>Featured Listings</Text>
            <View style={styles.featuredScrollView}>
              {featuredListings.length > 0 ? (
                <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                  {featuredListings.map((item, index) => (
                    <View key={index} style={styles.propertyCard}>
                      <Image
                        source={{ uri: item.propertyImage }}
                        style={styles.propertyImage}
                      />
                      <Text style={styles.propertyPrice}>
                        Price: {item.propertyPrice !== 'N/A'
                          ? `$${item.propertyPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
                          : 'N/A'}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              ) : (
                <View style={styles.emptyFeatured}>
                  <Text style={{ color: '#999' }}>No featured listings yet.</Text>
                </View>
              )}
            </View>
          </View>

          {/* Listings Section */}
          <Text style={styles.sectionTitle}>Listings</Text>
          <View style={styles.gridContainer}>
            <TouchableOpacity
              style={[styles.gridItem, { backgroundColor: '#3B82F6' }]}
              onPress={() => navigation.navigate('NewListing')}
            >
              <Text style={styles.gridItemText}>New Listing</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.gridItem, { backgroundColor: '#60A5FA' }]}
              onPress={() => navigation.navigate('ContactDetails')}
            >
              <Text style={styles.gridItemText}>Contact</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.gridItem, { backgroundColor: '#EC4899' }]}
              onPress={() => navigation.navigate('MapDetails')}
            >
              <Text style={styles.gridItemText}>Map</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.gridItem, { backgroundColor: '#EAB308' }]}
              onPress={() => navigation.navigate('History')}
            >
              <Text style={styles.gridItemText}>Sold House</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
            <Image source={require('../assets/images/home.png')} style={styles.icon} />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('NotifDetails')}>
            <Image source={require('../assets/images/notification.png')} style={styles.icon} />
            <Text style={styles.navText}>Notification</Text>
          </TouchableOpacity>

          <View style={{ width: 60 }} /> {/* Spacer for center button */}

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ProfileDetails')}>
            <Image source={require('../assets/images/profile.png')} style={styles.icon} />
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('MoreDetails')}>
            <Image source={require('../assets/images/more.png')} style={styles.icon} />
            <Text style={styles.navText}>More</Text>
          </TouchableOpacity>
        </View>

        {/* Center Add Button */}
        <TouchableOpacity style={styles.floatingAddButton} onPress={() => navigation.navigate('Addlist')}>
          <Image source={require('../assets/images/add.png')} style={styles.addIcon} />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    overflow: 'hidden',
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerBackground: {
    backgroundColor: '#3B82F6',
    height: 70,
    width: '100%',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: -50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#000',
  },
  profileSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginVertical: 10,
    paddingTop: 20,
  },
  featuredScrollView: {
    height: 180,
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  emptyFeatured: {
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  propertyCard: {
    width: 180,
    marginRight: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    overflow: 'hidden',
    paddingBottom: 10,
  },
  propertyImage: {
    width: '100%',
    height: 130,
    resizeMode: 'cover',
  },
  propertyPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    marginBottom: 60,
  },
  gridItem: {
    width: '48%',
    height: 80,
    marginBottom: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridItemText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingHorizontal: 25,
  },
  navItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#999',
  },
  addIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  floatingAddButton: {
    position: 'absolute',
    bottom: 15,
    left: SCREEN_WIDTH / 2 - 25,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    elevation: 5,
  },
});

export default HomeScreen;
