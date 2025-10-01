import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';

export default function PreferencesScreen({ navigation, route }) {
  const { profile } = route.params || {};
  
  const [preferences, setPreferences] = useState({
    budget: '',
    clean: 'Moderate',
    party: 'Occasionally',
    noise: 'Moderate',
    smoke: 'Non-smoker',
    guests: 'Occasionally',
    pets: 'No preference',
    sleep: '11pm-7am',
  });

  const budgetOptions = ['$500-800', '$800-1000', '$1000+'];
  const lifestyleOptions = {
    clean: ['Very Clean', 'Clean', 'Moderate', 'Messy'],
    party: ['Party Animal', 'Social', 'Occasionally', 'Rarely'],
    noise: ['Loud', 'Moderate', 'Quiet'],
    smoke: ['Smoker', 'Non-smoker', 'No preference'],
    guests: ['Often', 'Occasionally', 'Rarely', 'Never'],
    pets: ['Dog lover', 'Cat lover', 'Any pets', 'No preference'],
    sleep: ['Early bird (9pm-6am)', 'Normal (10pm-7am)', 'Night owl (midnight-8am)', 'Flexible'],
  };

  const handlePreferenceChange = (category, value) => {
    setPreferences({ ...preferences, [category]: value });
  };

  const isFormValid = () => {
    return preferences.budget !== '';
  };

  const handleContinue = () => {
    if (!isFormValid()) {
      Alert.alert('Missing Information', 'Please select your budget preference.');
      return;
    }
    Alert.alert(
      'Profile Complete!',
      'Your roommate preferences have been saved successfully. You can review and edit them anytime.',
      [
        { text: 'OK', onPress: () => navigation.navigate('Welcome') }
      ]
    );
  };

  const renderBudgetOptions = () => (
    <View style={styles.optionGroup}>
      <Text style={styles.optionTitle}>Budget *</Text>
      <View style={styles.optionContainer}>
        {budgetOptions.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              preferences.budget === option && styles.optionButtonSelected,
            ]}
            onPress={() => handlePreferenceChange('budget', option)}
          >
            <Text
              style={[
                styles.optionText,
                preferences.budget === option && styles.optionTextSelected,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderLifestyleOptions = (category, title) => (
    <View style={styles.optionGroup}>
      <Text style={styles.optionTitle}>{title}</Text>
      <View style={styles.optionContainer}>
        {lifestyleOptions[category].map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              preferences[category] === option && styles.optionButtonSelected,
            ]}
            onPress={() => handlePreferenceChange(category, option)}
          >
            <Text
              style={[
                styles.optionText,
                preferences[category] === option && styles.optionTextSelected,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Living Preferences</Text>
        <Text style={styles.subtitle}>
          Help us understand your lifestyle so we can find compatible roommates.
        </Text>

        {renderBudgetOptions()}
        {renderLifestyleOptions('clean', 'Cleanliness Level')}
        {renderLifestyleOptions('party', 'Social Life')}
        {renderLifestyleOptions('noise', 'Noise Tolerance')}
        {renderLifestyleOptions('smoke', 'Smoking')}
        {renderLifestyleOptions('guests', 'Friends Visiting')}
        {renderLifestyleOptions('pets', 'Pet Preferences')}
        {renderLifestyleOptions('sleep', 'Sleep Schedule')}

        <TouchableOpacity 
          style={[styles.button, !isFormValid() && styles.buttonDisabled]} 
          onPress={handleContinue}
          disabled={!isFormValid()}
        >
          <Text style={styles.buttonText}>Save Preferences</Text>
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
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  optionGroup: {
    marginBottom: 25,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  optionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  optionButtonSelected: {
    backgroundColor: '#E34234',
    borderColor: '#E34234',
  },
  optionText: {
    color: '#333',
    fontSize: 14,
  },
  optionTextSelected: {
    color: '#fff',
    fontWeight: '600',
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
