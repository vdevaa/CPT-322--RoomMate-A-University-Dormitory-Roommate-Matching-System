import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import styles from '../styles/LoginScreen.styles';
import { login } from '../services/api';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleInputChange = (field, value) => {
    if (field === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
    // Enable button if both fields have content
    const emailValue = field === 'email' ? value : email;
    const passwordValue = field === 'password' ? value : password;
    setButtonDisabled(!(emailValue && passwordValue));
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      const response = await login(email, password);
      console.log('Login successful:', response);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Failed', error.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Log in</Text>
        <TextInput
          style={styles.textinput} 
          placeholder="Email"
          value={email}
          onChangeText={(text) => handleInputChange('email', text)}
          keyboardType="email-address"
          autoCapitalize="none"
          required
        />
        <TextInput
          style={styles.textinput} 
          secureTextEntry={true}
          placeholder="Password"
          value={password}
          onChangeText={(text) => handleInputChange('password', text)}
          required
        />
        <TouchableOpacity 
          style={buttonDisabled || loading ? styles.buttonDisabled : styles.button}
          disabled={buttonDisabled || loading}
          onPress={handleLogin}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Log in</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
