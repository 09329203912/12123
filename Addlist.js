import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const SCREEN_WIDTH = 375;

const AddList = ({ navigation, listings, setListings }) => {
  const [propertyTitle, setPropertyTitle] = useState('');
  const [propertyPrice, setPropertyPrice] = useState('');
  const [propertyDescription, setPropertyDescription] = useState('');
  const [propertyBeds, setPropertyBeds] = useState('');
  const [propertyBaths, setPropertyBaths] = useState('');
  const [propertyImage, setPropertyImage] = useState('');
  const [propertyLocation, setPropertyLocation] = useState('');

  const handleAddListing = async () => {
    if (!propertyLocation || !propertyTitle || !propertyPrice) {
      Alert.alert('Missing Information', 'Please fill out all required fields.');
      return;
    }

    const newProperty = {
      propertyTitle,
      propertyPrice,
      propertyDescription,
      propertyBeds,
      propertyBaths,
      propertyImage,
      propertyLocation,
    };

    const updatedListings = [...listings, newProperty];
    setListings(updatedListings);
    await AsyncStorage.setItem('propertyListings', JSON.stringify(updatedListings));

    setPropertyTitle('');
    setPropertyPrice('');
    setPropertyDescription('');
    setPropertyBeds('');
    setPropertyBaths('');
    setPropertyImage('');
    setPropertyLocation('');

    navigation.navigate('NewListing');
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPropertyImage(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.wrapper}>
          <TextInput
            style={styles.input}
            placeholder="Property Title"
            value={propertyTitle}
            onChangeText={setPropertyTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Property Price"
            value={propertyPrice}
            onChangeText={setPropertyPrice}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Property Description"
            value={propertyDescription}
            onChangeText={setPropertyDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="Number of Beds"
            value={propertyBeds}
            onChangeText={setPropertyBeds}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Number of Baths"
            value={propertyBaths}
            onChangeText={setPropertyBaths}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={propertyLocation}
            onChangeText={setPropertyLocation}
          />

          {propertyImage ? (
            <Image source={{ uri: propertyImage }} style={styles.image} />
          ) : (
            <Text style={styles.noImageText}>No image selected</Text>
          )}

          <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
            <Text style={styles.imagePickerButtonText}>Pick an Image</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleAddListing} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Listing</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    padding: 20,
  },
  wrapper: {
    width: SCREEN_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    padding: 20,
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 15,
  },
  noImageText: {
    fontSize: 16,
    color: '#888',
    marginBottom: 15,
  },
  imagePickerButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  imagePickerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 12,
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
    padding: 12,
    borderRadius: 25,
    marginTop: 15,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddList;
