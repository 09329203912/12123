import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';

const { width } = Dimensions.get('window');
const SCREEN_WIDTH = 375;
const SCREEN_HEIGHT = 700;

const NotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Property Listed',
      description: 'A new property has been listed in your area.',
      timestamp: '2 hours ago',
      type: 'info',
    },
    {
      id: 2,
      title: 'Price Drop Alert',
      description: 'A property you are watching has dropped in price.',
      timestamp: '1 day ago',
      type: 'urgent',
    },
    {
      id: 3,
      title: 'Open House Event',
      description: 'Join the open house event this weekend.',
      timestamp: '3 days ago',
      type: 'info',
    },
  ]);

  useEffect(() => {
    // Future: Load notifications from AsyncStorage or API here
  }, []);

  const renderNotification = (notification) => {
    return (
      <View
        key={notification.id}
        style={[
          styles.notificationCard,
          notification.type === 'urgent'
            ? styles.urgentNotification
            : styles.infoNotification,
        ]}
      >
        <Text style={styles.notificationTitle}>{notification.title}</Text>
        <Text style={styles.notificationDescription}>
          {notification.description}
        </Text>
        <Text style={styles.notificationTimestamp}>
          {notification.timestamp}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Notifications</Text>
          </View>

          {/* Notification List */}
          <View style={styles.notificationsContainer}>
            {notifications.length > 0 ? (
              notifications.map(renderNotification)
            ) : (
              <Text style={styles.noNotificationsText}>No new notifications</Text>
            )}
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
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    overflow: 'hidden',
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#4169e1',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  notificationsContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  notificationCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  notificationDescription: {
    fontSize: 14,
    color: '#4b5563',
    marginTop: 6,
  },
  notificationTimestamp: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 10,
  },
  urgentNotification: {
    borderLeftWidth: 5,
    borderLeftColor: '#ef4444',
  },
  infoNotification: {
    borderLeftWidth: 5,
    borderLeftColor: '#4169e1',
  },
  noNotificationsText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
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
    color: '#6b7280',
    marginTop: 2,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#6b7280',
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
    backgroundColor: '#4169e1',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    elevation: 5,
  },
});

export default NotificationScreen;
