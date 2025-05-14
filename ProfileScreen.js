import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';

const MOBILE_WIDTH = 375;
const SCREEN_HEIGHT = 700;

const ProfileScreen = ({ navigation }) => {
  const [profileImageUri, setProfileImageUri] = useState(null);

  const user = {
    firstName: 'Juan',
    lastName: 'Dela Cruz',
    email: 'juan.delacruz@example.com',
    contact: '0917-123-4567',
    birthday: '1990-05-15',
    age: 35,
    username: 'juandelacruz',
    password: 'password123',
    potentialCommission: '₱150,000',
    debt: '-₱25,000',
  };

  const maskPassword = (password) => '*'.repeat(password.length);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to exit?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => navigation.navigate('Login'),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const handleEditProfileImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, async (response) => {
      if (!response.didCancel && !response.errorCode && response.assets?.length > 0) {
        const uri = response.assets[0].uri;
        setProfileImageUri(uri);
        await AsyncStorage.setItem('profileImageUri', uri);
      }
    });
  };

  const loadProfileImage = async () => {
    const uri = await AsyncStorage.getItem('profileImageUri');
    if (uri) setProfileImageUri(uri);
  };

  useEffect(() => {
    loadProfileImage();
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.phoneContainer}>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutIcon}>
          <Image source={require('../assets/images/logout.png')} style={styles.logoutIconImage} />
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.headerContainer}>
            <View style={{ position: 'relative' }}>
              <Image
                source={profileImageUri ? { uri: profileImageUri } : require('../assets/images/profiles.png')}
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.editIconContainer} onPress={handleEditProfileImage}>
                <Image source={require('../assets/images/edit.png')} style={styles.editIcon} />
              </TouchableOpacity>
            </View>
            <Text style={styles.agentName}>{user.firstName} {user.lastName}</Text>
            <Text style={styles.agentRole}>Real Estate Agent</Text>

            <View style={styles.summaryContainer}>
              <View style={[styles.summaryCard, { backgroundColor: '#e6f9ec' }]}>
                <Text style={styles.summaryLabel}>Potential Commission</Text>
                <Text style={styles.potentialValue}>{user.potentialCommission}</Text>
              </View>
              <View style={[styles.summaryCard, { backgroundColor: '#fde8e8' }]}>
                <Text style={styles.summaryLabel}>Debt</Text>
                <Text style={styles.debtValue}>{user.debt}</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{user.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Contact No:</Text>
              <Text style={styles.value}>{user.contact}</Text>
            </View>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Birthday:</Text>
              <Text style={styles.value}>{user.birthday}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Age:</Text>
              <Text style={styles.value}>{user.age}</Text>
            </View>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Account Information</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Username:</Text>
              <Text style={styles.value}>{user.username}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Password:</Text>
              <Text style={styles.value}>{maskPassword(user.password)}</Text>
            </View>
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
          <View style={{ width: 60 }} />
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ProfileDetails')}>
            <Image source={require('../assets/images/profile.png')} style={styles.icon} />
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('MoreDetails')}>
            <Image source={require('../assets/images/more.png')} style={styles.icon} />
            <Text style={styles.navText}>More</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.floatingAddButton}
          onPress={() => navigation.navigate('Addlist')}
        >
          <Image source={require('../assets/images/add.png')} style={styles.addIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneContainer: {
    width: MOBILE_WIDTH,
    height: SCREEN_HEIGHT,
    maxHeight: Platform.OS === 'web' ? 800 : '100%',
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 120,
  },
  logoutIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 4,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  logoutIconImage: {
    width: 24,
    height: 24,
    tintColor: '#555',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#eee',
    padding: 6,
    borderRadius: 20,
  },
  editIcon: {
    width: 18,
    height: 18,
    tintColor: '#555',
  },
  agentName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  agentRole: {
    fontSize: 14,
    color: '#4676D7',
    fontWeight: '600',
    marginBottom: 10,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 5,
  },
  summaryCard: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  potentialValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2e8b57',
    textAlign: 'center',
  },
  debtValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#cc0000',
    textAlign: 'center',
  },
  infoSection: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  label: {
    width: 130,
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  value: {
    flex: 1,
    fontSize: 13,
    color: '#555',
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
  floatingAddButton: {
    position: 'absolute',
    bottom: 15,
    left: MOBILE_WIDTH / 2 - 25,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 30,
    elevation: 5,
  },
  addIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
});

export default ProfileScreen;
