import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Or use react-native-vector-icons if not on Expo

const SCREEN_WIDTH = 375;
const SCREEN_HEIGHT = 700;

const MoreScreen = ({ navigation }) => {
  const menuItems = [
    { id: '1', title: 'Profile', onPress: () => navigation.navigate('ProfileDetails') },
    { id: '2', title: 'Archived Listings', onPress: () => navigation.navigate('ArchivedDetails') },
    { id: '3', title: 'App Settings', onPress: () => Alert.alert('Settings', 'Manage app settings.') },
    { id: '4', title: 'Help & Support', onPress: () => Alert.alert('Help', 'Contact support or view FAQs.') },
    { id: '5', title: 'About', onPress: () => Alert.alert('About', 'RealtyFlow App v1.0\nBuilt for your property needs.') },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.menuItem} onPress={item.onPress}>
      <Text style={styles.menuText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.container}>
        <View style={styles.phoneMockup}>
          <Text style={styles.header}>More Options</Text>

          <FlatList
            data={menuItems}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
          />
        </View>

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
        <TouchableOpacity
          style={styles.floatingAddButton}
          onPress={() => navigation.navigate('Addlist')}
        >
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
  phoneMockup: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    position: 'relative',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
    marginTop: 8,
  },
  list: {
    paddingBottom: 100,
    marginTop: 10,
  },
  menuItem: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
  },
  menuText: {
    color: '#fff',
    fontSize: 18,
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

export default MoreScreen;
