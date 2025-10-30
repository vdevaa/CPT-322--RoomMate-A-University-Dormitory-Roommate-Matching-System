import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Basic bottom navbar. Pass `navigation` from a screen and optionally `active` to highlight the current tab.
export default function Navbar({ navigation, active = 'Home' }) {
  const tabs = [
    { key: 'Home', label: 'Home', onPress: () => navigation.navigate('Welcome') },
    { key: 'Profile', label: 'Profile', onPress: () => navigation.navigate('Profile') },
    { key: 'Messages', label: 'Messages', onPress: () => navigation.navigate('Profile') },
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#e6e6e6',
    backgroundColor: '#fff',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabText: {
    color: '#555',
    fontSize: 14,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#E34234',
    fontSize: 14,
    fontWeight: '800',
  },
});

