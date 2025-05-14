import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';

const MOBILE_WIDTH = 375;
const SCREEN_HEIGHT = 700;

const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleRegister = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.phoneContainer}>
        <ImageBackground
          source={require('../assets/images/second.jpg')}
          style={styles.background}
          resizeMode="cover"
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.title}>Welcome to RAMALAND</Text>
            <View style={styles.line} />
            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                  style={styles.input}
                  value={firstName}
                  onChangeText={setFirstName}
                  autoCapitalize="words"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                  style={styles.input}
                  value={lastName}
                  onChangeText={setLastName}
                  autoCapitalize="words"
                />
              </View>
            </View>
            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Birthday</Text>
                <TextInput
                  style={styles.input}
                  value={birthday}
                  onChangeText={setBirthday}
                  placeholder="YYYY-MM-DD"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Age</Text>
                <TextInput
                  style={styles.input}
                  value={age}
                  onChangeText={setAge}
                  keyboardType="numeric"
                />
              </View>
            </View>
            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Contact</Text>
                <TextInput
                  style={styles.input}
                  value={contact}
                  onChangeText={setContact}
                  keyboardType="phone-pad"
                />
              </View>
            </View>
            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Repeat Password</Text>
                <TextInput
                  style={styles.input}
                  value={repeatPassword}
                  onChangeText={setRepeatPassword}
                  secureTextEntry
                  autoCapitalize="none"
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.agreementContainer}
              onPress={() => setAgreed((prev) => !prev)}
            >
              <View style={[styles.fakeCheckbox, agreed && styles.checkedBox]} />
              <Text style={styles.agreementText}>
                I agree to the user{' '}
                <Text style={styles.linkText}>agreement</Text>,{' '}
                <Text style={styles.linkText}>privacy</Text> and{' '}
                <Text style={styles.linkText}>cookie policy</Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
              <Text style={styles.registerText}>Registration</Text>
            </TouchableOpacity>
            <Text style={styles.loginText}>
              Already have an account?{' '}
              <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
                Login
              </Text>
            </Text>
          </ScrollView>
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
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
    color: '#000',
  },
  line: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  inputGroup: {
    width: '48%',
  },
  label: {
    fontSize: 13,
    color: '#333',
    fontWeight: '600',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  agreementContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingHorizontal: 2,
  },
  fakeCheckbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: '#999',
    marginTop: 3,
    marginRight: 8,
    borderRadius: 2,
  },
  checkedBox: {
    backgroundColor: '#4676D7',
    borderColor: '#4676D7',
  },
  agreementText: {
    fontSize: 12,
    color: '#333',
    flex: 1,
  },
  linkText: {
    textDecorationLine: 'underline',
    color: '#4676D7',
  },
  registerButton: {
    backgroundColor: '#4676D7',
    borderRadius: 6,
    padding: 14,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  registerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#333',
  },
  loginLink: {
    fontWeight: 'bold',
    color: '#000',
  },
});

export default RegisterScreen;
