import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Alert } from 'react-native';
import Navbar from '../components/Navbar';
import SwipeableCard from '../components/SwipeableCard';
import { mockProfiles, addSwipe, matches, swipeHistory } from '../mock/profiles';
import { conversations } from '../mock/messages';
import styles from '../styles/HomeScreen.styles';

export default function HomeScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [availableProfiles, setAvailableProfiles] = useState([]);

  useEffect(() => {
    // Filter out profiles that have already been swiped on
    const swipedIds = [...new Set([...swipeHistory.liked, ...swipeHistory.passed])];
    const available = mockProfiles.filter(p => !swipedIds.includes(p.id));
    setAvailableProfiles(available);
    setCurrentIndex(0);
  }, []);

  const handleSwipeRight = () => {
    if (currentIndex >= availableProfiles.length) return;
    
    const profile = availableProfiles[currentIndex];
    addSwipe(profile.id, 'right');
    
    // this is a mock matching simulation
    // TODO LONDON: start of where backend implementation should go 
    const isMatch = profile.id === 'p1' || profile.id === 'p2'; // Simulate matches
    
    if (isMatch) {
      // Create a conversation for the match
      const newConversation = {
        id: `c_${profile.id}`,
        participants: ['u_current', profile.userId],
        otherUser: { id: profile.userId, name: profile.name },
        matched: true,
        lastMessageText: 'You matched! Start the conversation.',
        lastMessageAt: Date.now(),
      };
      conversations.push(newConversation);
      
      Alert.alert(
        'It\'s a Match!',
        `You and ${profile.name} have matched! You can now message each other.`,
        [
          { text: 'Keep Swiping', style: 'cancel' },
          { text: 'View Messages', onPress: () => navigation.navigate('Messages') },
        ]
      );
    }
    
    moveToNext();
  };

  const handleSwipeLeft = () => {
    if (currentIndex >= availableProfiles.length) return;
    
    const profile = availableProfiles[currentIndex];
    addSwipe(profile.id, 'left'); // adds to passed array 
    moveToNext();
  };

  const moveToNext = () => {
    if (currentIndex < availableProfiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      Alert.alert(
        'No More Profiles',
        'You\'ve seen all available profiles! Check back later for more.',
        [{ text: 'OK' }]
      );
    }
  };

  const currentProfile = availableProfiles[currentIndex];
  const nextProfile = availableProfiles[currentIndex + 1];

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

