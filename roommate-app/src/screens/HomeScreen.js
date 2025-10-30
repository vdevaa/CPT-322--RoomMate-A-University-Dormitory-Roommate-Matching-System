import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import Navbar from '../components/Navbar';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>This is the Home Screen</Text>
        <Text style={styles.subtitle}>Currently wokring on a figma design with group, and a detailed issue.</Text>
      </View>
      <Navbar navigation={navigation} active={'Home'} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E34234',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});


