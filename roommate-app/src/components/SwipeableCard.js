import React, { useRef } from 'react';
import { View, Text, Animated, PanResponder, Dimensions } from 'react-native';
import styles from '../styles/SwipeableCard.styles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = 120;

export default function SwipeableCard({ profile, onSwipeLeft, onSwipeRight }) {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        pan.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > SWIPE_THRESHOLD) {
          // Swipe right (like)
          Animated.spring(pan, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
            useNativeDriver: false,
          }).start(() => {
            onSwipeRight();
          });
        } else if (gestureState.dx < -SWIPE_THRESHOLD) {
          // Swipe left (pass)
          Animated.spring(pan, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
            useNativeDriver: false,
          }).start(() => {
            onSwipeLeft();
          });
        } else {
          // Return to center
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const rotate = pan.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });

  const likeOpacity = pan.x.interpolate({
    inputRange: [0, SWIPE_THRESHOLD],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const nopeOpacity = pan.x.interpolate({
    inputRange: [-SWIPE_THRESHOLD, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.card,
        {
          transform: [
            { translateX: pan.x },
            { translateY: pan.y },
            { rotate: rotate },
          ],
        },
      ]}
      {...panResponder.panHandlers}
    >
      <Animated.View
        style={[
          styles.overlay,
          styles.likeOverlay,
          { opacity: likeOpacity },
        ]}
      >
        <Text style={styles.overlayText}>LIKE</Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.overlay,
          styles.nopeOverlay,
          { opacity: nopeOpacity },
        ]}
      >
        <Text style={styles.overlayText}>NOPE</Text>
      </Animated.View>

      <View style={styles.cardContent}>
        <View style={styles.header}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.details}>{profile.hall} • {profile.room}</Text>
        </View>

        <View style={styles.bioSection}>
          <Text style={styles.bio}>{profile.bio}</Text>
        </View>

        <View style={styles.traitsSection}>
          <View style={styles.trait}>
            <Text style={styles.traitLabel}>Year:</Text>
            <Text style={styles.traitValue}>{profile.year}</Text>
          </View>
          <View style={styles.trait}>
            <Text style={styles.traitLabel}>Sleep:</Text>
            <Text style={styles.traitValue}>{profile.sleepSchedule}</Text>
          </View>
          <View style={styles.trait}>
            <Text style={styles.traitLabel}>Cleanliness:</Text>
            <Text style={styles.traitValue}>{profile.cleanliness}</Text>
          </View>
          <View style={styles.trait}>
            <Text style={styles.traitLabel}>Study:</Text>
            <Text style={styles.traitValue}>{profile.studyHabits}</Text>
          </View>
        </View>

        <View style={styles.hobbiesSection}>
          <Text style={styles.hobbiesLabel}>Hobbies:</Text>
          <View style={styles.hobbiesContainer}>
            {profile.hobbies.map((hobby, index) => (
              <View key={index} style={styles.hobbyTag}>
                <Text style={styles.hobbyText}>{hobby}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.preferencesSection}>
          <Text style={styles.preferencesLabel}>Preferences:</Text>
          <View style={styles.preferencesRow}>
            <Text style={styles.preferenceItem}>
              {profile.preferences.wantsQuietHours ? '✓ Quiet Hours' : '✗ No Quiet Hours'}
            </Text>
            <Text style={styles.preferenceItem}>
              {profile.preferences.smokingOk ? '✓ Smoking OK' : '✗ No Smoking'}
            </Text>
            <Text style={styles.preferenceItem}>
              {profile.preferences.guestsOk ? '✓ Guests OK' : '✗ No Guests'}
            </Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}
