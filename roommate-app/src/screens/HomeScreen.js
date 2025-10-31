import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import Navbar from '../components/Navbar';
import styles from '../styles/HomeScreen.styles';

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

