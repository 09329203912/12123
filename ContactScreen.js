import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const SCREEN_WIDTH = 375;
const SCREEN_HEIGHT = 700;

const ContactScreen = ({ navigation }) => {
  const [clients, setClients] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    loadClients();
  }, [isFocused]);

  const loadClients = async () => {
    try {
      const storedClients = await AsyncStorage.getItem('clients');
      if (storedClients) {
        setClients(JSON.parse(storedClients));
      }
    } catch (error) {
      console.error('Failed to load clients:', error);
    }
  };

  const handleDelete = async (indexToDelete) => {
    try {
      const updatedClients = clients.filter((_, index) => index !== indexToDelete);
      await AsyncStorage.setItem('clients', JSON.stringify(updatedClients));
      setClients(updatedClients);
      Alert.alert('Deleted', 'Client has been removed successfully.');
    } catch (error) {
      console.error('Error deleting client:', error);
      Alert.alert('Error', 'Failed to delete the client.');
    }
  };

  const renderClient = ({ item, index }) => (
    <View style={styles.card}>
      <View style={styles.clientRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.clientName}>{item.name}</Text>
          <Text style={styles.socialHandle}>{item.social}</Text>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{item.email}</Text>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{item.phone}</Text>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>{item.address}</Text>
        </View>
        <View style={styles.imageSection}>
          <View style={styles.imageContainer}>
            {item.imageUri ? (
              <Image source={{ uri: item.imageUri }} style={styles.clientImage} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={styles.addPhotoText}>Add Photo</Text>
              </View>
            )}
          </View>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(index)}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>My Clients</Text>
        <FlatList
          data={clients}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderClient}
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddClient')}
        >
          <Text style={styles.addButtonText}>+ Add Client</Text>
        </TouchableOpacity>
      </View>
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
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
    padding: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  clientRow: {
    flexDirection: 'row',
  },
  clientName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  socialHandle: {
    color: '#4676D7',
    marginBottom: 10,
  },
  label: {
    fontWeight: '600',
    fontSize: 13,
    color: '#333',
  },
  value: {
    marginBottom: 6,
    fontSize: 13,
    color: '#555',
  },
  imageSection: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 8,
    overflow: 'hidden',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  addPhotoText: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  clientImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ContactScreen;
