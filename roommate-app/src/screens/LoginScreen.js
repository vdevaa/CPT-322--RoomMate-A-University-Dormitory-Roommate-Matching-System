import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
var username;
var password;
// using navigation stack is fine for now but when home screen is called this navigation stack should be thrown out
// and replaced with a navbar and a new navigation stack to avoid returning here after a login
export default function LoginScreen({ navigation }) {
  return (
    // move these text inputs into component files later for now we will store data here though
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Log in</Text>
        <TextInput
          style={styles.textinput} 
          placeholder="Username"
          value={username}
        />
        <TextInput
          style={styles.textinput} 
          secureTextEntry={true}
          placeholder="Password"
          value={password}
        />
        <TouchableOpacity 
          style={styles.button}
          // straight back to the welcome screen until we get a home screen
          onPress={() => 
            {
            // call api
            // check result for session token; store session token in storage for home screen
            // if api does not respond with one then throw error
            navigation.navigate('Welcome')
            }
        }
        >
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// TODO: merge stylesheets and convert constants to scaling sizes
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E34234',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#E34234',
    paddingHorizontal: 40,
    marginTop:20,
    paddingVertical: 10,
    borderRadius: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    shadowOpacity:0,
    borderColor: '#E34234',
  },
  secondaryButtonText: {
    color: '#E34234',
    fontSize: 16,
    fontWeight: 'bold',
  },
    textinput: {
    color: '#BBBBBB',
    borderWidth:1,
    borderBottomColor: '#000000',
    borderRadius:3,
    marginVertical:5,
    paddingHorizontal:20,
    paddingVertical:10,
  },
});
