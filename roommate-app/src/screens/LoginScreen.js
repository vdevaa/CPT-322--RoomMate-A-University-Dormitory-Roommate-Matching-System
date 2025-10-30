import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import styles from '../styles/LoginScreen.styles';

// using navigation stack is fine for now but when home screen is called this navigation stack should be thrown out
// and replaced with a navbar and a new navigation stack to avoid returning here after a login
export default function LoginScreen({ navigation }) {
  const API_URL = 'https://localhost:8481/api/login'
  // api params
  const [userNameData, setUserNameData] = useState('');
  const [passwordData, setPasswordData] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  return (
    // move these text inputs into component files later for now we will store data here though
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Log in</Text>
        <TextInput
          style={styles.textinput} 
          placeholder="Username or Email"
          value={userNameData}
          onChangeText=
          {(text) => {
              setUserNameData(text);
              if(userNameData !='' && passwordData != ''){
                setButtonDisabled(false);
              }
          }}
          required
        />
        <TextInput
          style={styles.textinput} 
          secureTextEntry={true}
          placeholder="Password"
          value={passwordData}
          onChangeText=
          {(text) => {
            setPasswordData(text);
              if(userNameData !='' && passwordData != ''){
                setButtonDisabled(false)
              }
          }}
          required
        />
        <TouchableOpacity 
          style={buttonDisabled ? styles.buttonDisabled : styles.button}
          disabled = {buttonDisabled}
          // straight back to the welcome screen until we get a home screen
          onPress={() => 
          {
            
            fetch(API_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user: userNameData,
                pass: passwordData,
              }),
            })
              .then(response => response.json()) 
              .then(data => console.log('Success:', data))
              .catch(error => console.error('Error:', error));
            navigation.navigate('Home')
            // call api
            // check result for session token; store session token in storage for home screen
            // if api does not respond with one then throw error
            
          }
        }
        >
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
