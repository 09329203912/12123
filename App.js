import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewListing from './app/NewListing';
import AddList from './app/Addlist';
import Details from './app/Details';
import HomeScreen from './app/HomeScreen';
import SoldHistory from './app/SoldHistory';
import Map from './app/Map';
import LoginScreen from './app/LoginScreen';
import RegisterScreen from './app/RegisterScreen';
import ProfileScreen from './app/ProfileScreen';
import ArchivedScreen from './app/ArchivedScreen';
import MoreScreens from './app/MoreScreens';
import NotificationScreen from './app/NotificationScreen';
import ContactScreen from './app/ContactScreen';
import AddClientScreen from './app/AddClientScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function App() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const loadListings = async () => {
      const stored = await AsyncStorage.getItem('propertyListings');
      if (stored) setListings(JSON.parse(stored));
    };
    loadListings();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          animation: 'fade', // <-- Smooth animation for ALL screens
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NewListing">
          {props => <NewListing {...props} listings={listings} setListings={setListings} />}
        </Stack.Screen>
        <Stack.Screen name="Addlist">
          {props => <AddList {...props} listings={listings} setListings={setListings} />}
        </Stack.Screen>
        <Stack.Screen name="Detailsfirst" component={Details} />
        <Stack.Screen name="History" component={SoldHistory} />
        <Stack.Screen name="MapDetails" component={Map} />
        <Stack.Screen name="ProfileDetails" component={ProfileScreen} />
        <Stack.Screen name="ArchivedDetails" component={ArchivedScreen} />
        <Stack.Screen name="MoreDetails" component={MoreScreens} />
        <Stack.Screen name="NotifDetails" component={NotificationScreen} />
        <Stack.Screen name="ContactDetails" component={ContactScreen} />
        <Stack.Screen name="AddClient" component={AddClientScreen} />        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
