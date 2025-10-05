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
    cleanliness: '',
    social_life: '',
    noise_tolerance: '',
    smoking: '',
    guests: '',
    pets: '',
    sleep_schedule: '',
    cooking_habits: '',
    study_style: '',
    temperature: '',
    shared_spaces: '',
    communication: '',
  });

  const compatibilityQuestions = {
    cleanliness: {
      question: "How would you describe your cleanliness habits?",
      options: ['Extremely clean (daily cleaning)', 'Very clean (few times a week)', 'Moderate (weekly cleaning)', 'Casual (when needed)', 'Messy (rarely clean)']
    },
    social_life: {
      question: "How often do you go out or have people over?",
      options: ['Every day', '4-5 times a week', '2-3 times a week', 'Once a week', 'Rarely (once a month)', 'Never']
    },
    noise_tolerance: {
      question: "What noise level are you comfortable with at home?",
      options: ['Very quiet (library-like)', 'Quiet (normal conversation)', 'Moderate (some background noise)', 'Loud (music/TV common)', 'Very loud (parties welcome)']
    },
    smoking: {
      question: "What's your smoking preference?",
      options: ['Smoker (cigarettes)', 'Vaper (e-cigarettes)', 'Non-smoker', 'Occasional smoker', 'No preference']
    },
    guests: {
      question: "How often do you have friends or family visit?",
      options: ['Daily', 'Several times a week', 'Weekly', 'Bi-weekly', 'Monthly', 'Rarely', 'Never']
    },
    pets: {
      question: "What are your thoughts on pets?",
      options: ['Must have pets', 'Love pets (would get one)', 'Like pets (if roommate has)', 'Neutral about pets', 'Prefer no pets', 'Allergic to pets']
    },
    sleep_schedule: {
      question: "What's your typical sleep schedule?",
      options: ['Early bird (9pm-6am)', 'Normal (10pm-7am)', 'Night owl (12am-9am)', 'Irregular schedule', 'Very flexible']
    },
    cooking_habits: {
      question: "How often do you cook at home?",
      options: ['Every meal', 'Most meals', 'Few times a week', 'Once a week', 'Rarely', 'Never (takeout only)']
    },
    study_style: {
      question: "How do you prefer to study or work at home?",
      options: ['Complete silence required', 'Very quiet background', 'Some background noise OK', 'Music/TV while working', 'Noise doesn\'t bother me']
    },
    temperature: {
      question: "What temperature do you prefer at home?",
      options: ['Very cold (65-68°F)', 'Cool (69-72°F)', 'Moderate (73-76°F)', 'Warm (77-80°F)', 'Hot (80°F+)', 'Flexible']
    },
    shared_spaces: {
      question: "How do you feel about sharing common areas?",
      options: ['Very private (minimal sharing)', 'Somewhat private', 'Flexible sharing', 'Very social (love sharing)', 'No preference']
    },
    communication: {
      question: "How do you prefer to communicate about household issues?",
      options: ['Direct and immediate', 'Text/message', 'Face-to-face when convenient', 'Written notes', 'Group chat', 'Avoid confrontation']
    }
  };

  const handlePreferenceChange = (category, value) => {
    setPreferences({ ...preferences, [category]: value });
  };

  const isFormValid = () => {
    return true;
  };


  const handleContinue = () => {
    if (!isFormValid()) {
      Alert.alert('Missing Information', 'Please select all required choices.');
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

  const renderQuestion = (category) => {
    const questionData = compatibilityQuestions[category];
    // const isRequired = category === 'requiredCategory';
    
    return (
      <View style={styles.optionGroup}>
        <Text style={styles.questionText}>
          {questionData.question}
          {/* {isRequired && <Text style={styles.required}> *</Text>} */}
        </Text>
        <View style={styles.optionContainer}>
          {questionData.options.map((option) => (
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
  };

  // Calculate completion percentage based on answered questions
  const completedQuestions = Object.keys(preferences).filter(key => preferences[key] !== '').length;
  const totalQuestions = Object.keys(preferences).length;
  const completionPercentage = Math.round((completedQuestions / totalQuestions) * 100);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Compatibility Test</Text>
        <Text style={styles.subtitle}>
          Answer these questions to help us find your perfect roommate match!
        </Text>

        {/* Compatibility Questions */}
        {renderQuestion('cleanliness')}
        {renderQuestion('social_life')}
        {renderQuestion('noise_tolerance')}
        {renderQuestion('smoking')}
        {renderQuestion('guests')}
        {renderQuestion('pets')}
        {renderQuestion('sleep_schedule')}
        {renderQuestion('cooking_habits')}
        {renderQuestion('study_style')}
        {renderQuestion('temperature')}
        {renderQuestion('shared_spaces')}
        {renderQuestion('communication')}

        {/* Progress indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${completionPercentage}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {completedQuestions} of {totalQuestions} questions completed ({completionPercentage}%)
          </Text>
        </View>

        <TouchableOpacity 
          style={[styles.button, !isFormValid() && styles.buttonDisabled]} 
          onPress={handleContinue}
          disabled={!isFormValid()}
        >
          <Text style={styles.buttonText}>
            {completedQuestions === totalQuestions ? 'Complete Test & Find Matches' : 'Save Progress'}
          </Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E34234',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22,
  },
  progressContainer: {
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#E34234',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
  },
  optionGroup: {
    marginBottom: 30,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  questionText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    lineHeight: 24,
  },
  required: {
    color: '#E34234',
    fontWeight: 'bold',
  },
  optionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 25,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
    minWidth: 80,
  },
  optionButtonSelected: {
    backgroundColor: '#E34234',
    borderColor: '#E34234',
    transform: [{ scale: 1.05 }],
  },
  optionText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  optionTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#E34234',
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 30,
    marginTop: 30,
    marginBottom: 40,
    shadowColor: '#E34234',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
