import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Navbar from '../components/Navbar';
import { getMyProfile, updateMyProfile, getMe, clearAuth, getStoredUser } from '../services/api';
import styles from '../styles/ProfileScreen.styles';

export default function EditProfileScreen({ navigation }) {
  const [profile, setProfile] = useState({
    hall: '',
    room: '',
    year: 'Freshman',
    bio: '',
    sleepSchedule: 'Normal',
    cleanliness: 'Average',
    studyHabits: 'Quiet',
    hobbies: [],
    preferences: {
      wantsQuietHours: true,
      smokingOk: false,
      guestsOk: true,
    },
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hobbiesInput, setHobbiesInput] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const currentUser = await getStoredUser();
      if (!currentUser) {
        Alert.alert('Error', 'Not logged in');
        navigation.navigate('Welcome');
        return;
      }
      setUser(currentUser);
      
      const userData = await getMe();
      const profileData = await getMyProfile();
      
      setProfile({
        hall: profileData.hall || '',
        room: profileData.room || '',
        year: profileData.year || 'Freshman',
        bio: profileData.bio || '',
        sleepSchedule: profileData.sleepSchedule || 'Normal',
        cleanliness: profileData.cleanliness || 'Average',
        studyHabits: profileData.studyHabits || 'Quiet',
        hobbies: profileData.hobbies || [],
        preferences: profileData.preferences || {
          wantsQuietHours: true,
          smokingOk: false,
          guestsOk: true,
        },
      });
      setHobbiesInput((profileData.hobbies || []).join(', '));
    } catch (error) {
      console.error('Error loading profile:', error);
      Alert.alert('Error', 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    if (field.startsWith('preferences.')) {
      const prefField = field.split('.')[1];
      setProfile({
        ...profile,
        preferences: {
          ...profile.preferences,
          [prefField]: value,
        },
      });
    } else {
      setProfile({ ...profile, [field]: value });
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      // Parse hobbies from comma-separated string
      const hobbies = hobbiesInput.split(',').map(h => h.trim()).filter(h => h);
      
      await updateMyProfile({
        ...profile,
        hobbies,
      });
      
      Alert.alert(
        'Profile Updated',
        'Your profile has been saved successfully.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'Failed to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: async () => {
            await clearAuth();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Welcome' }],
            });
          }
        },
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#E34234" />
        </View>
        <Navbar navigation={navigation} active={'Profile'} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Edit Your Profile</Text>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Hall</Text>
          <TextInput
            style={styles.input}
            value={profile.hall}
            onChangeText={(text) => handleInputChange('hall', text)}
            placeholder="e.g. Streit Hall"
            autoCapitalize="words"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Room</Text>
          <TextInput
            style={styles.input}
            value={profile.room}
            onChangeText={(text) => handleInputChange('room', text)}
            placeholder="e.g. 229"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Year</Text>
          <TextInput
            style={styles.input}
            value={profile.year}
            onChangeText={(text) => handleInputChange('year', text)}
            placeholder="Freshman, Sophomore, Junior, Senior, Grad"
            autoCapitalize="words"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={profile.bio}
            onChangeText={(text) => handleInputChange('bio', text)}
            placeholder="Tell us about yourself..."
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Sleep Schedule</Text>
          <TextInput
            style={styles.input}
            value={profile.sleepSchedule}
            onChangeText={(text) => handleInputChange('sleepSchedule', text)}
            placeholder="Early, Normal, or Late"
            autoCapitalize="words"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Cleanliness</Text>
          <TextInput
            style={styles.input}
            value={profile.cleanliness}
            onChangeText={(text) => handleInputChange('cleanliness', text)}
            placeholder="Tidy, Average, or Messy"
            autoCapitalize="words"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Study Habits</Text>
          <TextInput
            style={styles.input}
            value={profile.studyHabits}
            onChangeText={(text) => handleInputChange('studyHabits', text)}
            placeholder="Quiet, Music, or Group"
            autoCapitalize="words"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Hobbies (comma-separated)</Text>
          <TextInput
            style={styles.input}
            value={hobbiesInput}
            onChangeText={setHobbiesInput}
            placeholder="e.g. Coding, Gym, Reading"
            autoCapitalize="words"
          />
        </View>

        <TouchableOpacity 
          style={[styles.button, saving && styles.buttonDisabled]} 
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Save Changes</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
      <Navbar navigation={navigation} active={'Profile'} />
    </SafeAreaView>
  );
}

