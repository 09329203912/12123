import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';

const MOBILE_WIDTH = 375;
const SCREEN_HEIGHT = 700;

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigation.navigate('Home'); // Direct navigation to Home
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.phoneContainer}>
        <ImageBackground
          source={require('../assets/images/backs.jpg')}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <Text style={styles.title}>Login</Text>
              <View style={styles.line} />

              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>

              <Text style={styles.registerPrompt}>
                Don't have an account?{' '}
                <Text
                  style={styles.registerLink}
                  onPress={() => navigation.navigate('Register')}
                >
                  Register
                </Text>
              </Text>
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
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
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 60,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    alignSelf: 'center',
    marginBottom: 10,
  },
  line: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: '#4676D7',
    borderRadius: 6,
    padding: 14,
    alignItems: 'center',
    marginTop: 180,
    marginBottom: 20,
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerPrompt: {
    textAlign: 'center',
    fontSize: 12,
    color: '#333',
  },
  registerLink: {
    fontWeight: 'bold',
    color: '#000',
  },
});

export default LoginScreen;
