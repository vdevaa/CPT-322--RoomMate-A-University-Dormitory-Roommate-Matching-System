import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Alert, ActivityIndicator } from 'react-native';
import Navbar from '../components/Navbar';
import SwipeableCard from '../components/SwipeableCard';
import { getSuggestedMatches, likeUser, getStoredUser } from '../services/api';
import styles from '../styles/HomeScreen.styles';

// Transform API profile to card format
const transformProfile = (apiProfile) => {
  const user = apiProfile.user || {};
  return {
    id: apiProfile._id,
    userId: user._id || user.id,
    name: user.name || 'Unknown',
    hall: apiProfile.hall || '',
    room: apiProfile.room || '',
    year: apiProfile.year || 'Freshman',
    bio: apiProfile.bio || '',
    sleepSchedule: apiProfile.sleepSchedule || 'Normal',
    cleanliness: apiProfile.cleanliness || 'Average',
    studyHabits: apiProfile.studyHabits || 'Quiet',
    hobbies: apiProfile.hobbies || [],
    preferences: apiProfile.preferences || {},
  };
};

export default function HomeScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [availableProfiles, setAvailableProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [swipedIds, setSwipedIds] = useState(new Set());

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      setLoading(true);
      const profiles = await getSuggestedMatches();
      const transformed = profiles.map(transformProfile);
      setAvailableProfiles(transformed);
      setCurrentIndex(0);
    } catch (error) {
      console.error('Error loading profiles:', error);
      Alert.alert('Error', 'Failed to load profiles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSwipeRight = async () => {
    if (currentIndex >= availableProfiles.length) return;
    
    const profile = availableProfiles[currentIndex];
    const userId = profile.userId;
    
    // Mark as swiped
    setSwipedIds(prev => new Set([...prev, profile.id]));
    
    try {
      // Like the user via API
      const response = await likeUser(userId);
      
      if (response.matched) {
        Alert.alert(
          'It\'s a Match!',
          `You and ${profile.name} have matched! You can now message each other.`,
          [
            { text: 'Keep Swiping', style: 'cancel' },
            { text: 'View Messages', onPress: () => navigation.navigate('Messages') },
          ]
        );
      }
    } catch (error) {
      console.error('Error liking user:', error);
      Alert.alert('Error', 'Failed to like user. Please try again.');
    }
    
    moveToNext();
  };

  const handleSwipeLeft = () => {
    if (currentIndex >= availableProfiles.length) return;
    
    const profile = availableProfiles[currentIndex];
    // Mark as swiped (passed)
    setSwipedIds(prev => new Set([...prev, profile.id]));
    moveToNext();
  };

  const moveToNext = () => {
    if (currentIndex < availableProfiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Load more profiles if we've seen all
      loadProfiles();
    }
  };

  const currentProfile = availableProfiles[currentIndex];
  const nextProfile = availableProfiles[currentIndex + 1];

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color="#E34234" />
          <Text style={styles.emptyText}>Loading profiles...</Text>
        </View>
        <Navbar navigation={navigation} active={'Home'} />
      </SafeAreaView>
    );
  }

  if (availableProfiles.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No more profiles to swipe</Text>
          <Text style={styles.emptySubtext}>Check back later for new potential roommates!</Text>
        </View>
        <Navbar navigation={navigation} active={'Home'} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.swipeContainer}>
        {nextProfile && (
          <View style={[styles.cardContainer, styles.cardBack]}>
            <SwipeableCard
              profile={nextProfile}
              onSwipeLeft={() => {}}
              onSwipeRight={() => {}}
            />
          </View>
        )}
        {currentProfile && (
          <View style={styles.cardContainer}>
            <SwipeableCard
              profile={currentProfile}
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
            />
          </View>
        )}
      </View>
      <Navbar navigation={navigation} active={'Home'} />
    </SafeAreaView>
  );
}

