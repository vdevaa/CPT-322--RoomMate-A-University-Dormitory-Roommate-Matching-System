import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/Navbar.styles';

// Basic bottom navbar. Pass `navigation` from a screen and optionally `active` to highlight the current tab.
export default function Navbar({ navigation, active = 'Home' }) {
  const tabs = [
    { key: 'Home', label: 'Home', onPress: () => navigation.navigate('Home') },
    { key: 'Profile', label: 'Profile', onPress: () => navigation.navigate('Profile') },
    { key: 'Messages', label: 'Messages', onPress: () => navigation.navigate('Messages') },
    // add more labels to the navbar here if needed, for now routing is to placeholders
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = active === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={tab.onPress}
            accessibilityRole="button"
            accessibilityLabel={tab.label}
          >
            <Text style={isActive ? styles.tabTextActive : styles.tabText}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

 

