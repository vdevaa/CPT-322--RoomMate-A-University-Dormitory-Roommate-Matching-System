import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';

export default function ProfileScreen({ navigation }) {
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    major: '',
    year: '',
    about: '',
  });

  const handleInputChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const isFormValid = () => {
    return profile.name.trim() && profile.age.trim() && profile.major.trim() && profile.year.trim();
  };

  const handleContinue = () => {
    if (!isFormValid()) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }
    navigation.navigate('Preferences', { profile });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Create Your Profile</Text>
        
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
          onPress={handleContinue}
          disabled={!isFormValid()}
        >
          <Text style={styles.buttonText}>Continue to Preferences</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E34234',
    marginBottom: 30,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
  },
  textArea: {
    height: 80,
  },
  button: {
    backgroundColor: '#E34234',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 40,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

