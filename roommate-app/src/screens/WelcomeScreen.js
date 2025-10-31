import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Navbar from '../components/Navbar';
import styles from '../styles/WelcomeScreen.styles';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to RoomMate!</Text>
        <Text style={styles.subtitle}>
          Find your perfect roommate at Washington State University based on compatibility and shared preferences.
        </Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]} 
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.secondaryButtonText}>Log in</Text>
        </TouchableOpacity>
      </View>
      <Navbar navigation={navigation} active={'Home'} />
    </SafeAreaView>
  );
}
