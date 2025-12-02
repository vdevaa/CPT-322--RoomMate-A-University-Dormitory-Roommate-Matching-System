import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import Navbar from '../components/Navbar';
import { currentUserProfile, updateCurrentUserProfile } from '../mock/currentUser';
import styles from '../styles/ProfileScreen.styles';

export default function EditProfileScreen({ navigation }) {
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    major: '',
    year: '',
    about: '',
  });

  useEffect(() => {
    // Load current user profile data
    setProfile({
      name: currentUserProfile.name || '',
      age: currentUserProfile.age || '',
      major: currentUserProfile.major || '',
      year: currentUserProfile.year || '',
      about: currentUserProfile.about || '',
    });
  }, []);

  const handleInputChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const isFormValid = () => {
    return profile.name.trim() && profile.age.trim() && profile.major.trim() && profile.year.trim();
  };

  const handleSave = () => {
    if (!isFormValid()) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }
    
    // Update mock profile (in real app, this would call backend API)
    updateCurrentUserProfile(profile);
    
    Alert.alert(
      'Profile Updated',
      'Your profile has been saved successfully.',
      [{ text: 'OK' }]
    );
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
          onPress: () => {
            // In real app, clear session token, user data, etc.
            navigation.reset({
              index: 0,
              routes: [{ name: 'Welcome' }],
            });
          }
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Edit Your Profile</Text>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Name *</Text>
          <TextInput
            style={styles.input}
            value={profile.name}
            onChangeText={(text) => handleInputChange('name', text)}
            placeholder="Enter your full name"
            autoCapitalize="words"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Age *</Text>
          <TextInput
            style={styles.input}
            value={profile.age}
            onChangeText={(text) => handleInputChange('age', text)}
            placeholder="Enter your age"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Major/Field of Study *</Text>
          <TextInput
            style={styles.input}
            value={profile.major}
            onChangeText={(text) => handleInputChange('major', text)}
            placeholder="e.g. Computer Science, Biology"
            autoCapitalize="words"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Academic Year *</Text>
          <TextInput
            style={styles.input}
            value={profile.year}
            onChangeText={(text) => handleInputChange('year', text)}
            placeholder="e.g. Freshman, Sophomore"
            autoCapitalize="words"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>About Yourself (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={profile.about}
            onChangeText={(text) => handleInputChange('about', text)}
            placeholder="Tell us about yourself, hobbies, interests..."
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity 
          style={[styles.button, !isFormValid() && styles.buttonDisabled]} 
          onPress={handleSave}
          disabled={!isFormValid()}
        >
          <Text style={styles.buttonText}>Save Changes</Text>
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

