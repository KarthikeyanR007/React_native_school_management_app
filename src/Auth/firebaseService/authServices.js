/* eslint-disable prettier/prettier */
// authService.js
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Sign up function
export const signUp = async (email, password) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    const user = userCredential.user;
    console.log('User account created & signed in!', user);
    await AsyncStorage.setItem('@user_token', user.uid);
    return user;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};


//Sign in function
export const signIn = async (email, password) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    console.log('User signed in!', user);
    await AsyncStorage.setItem('@user_token', user.uid);
    return user;
  } catch (error) {
    console.error(error.message);
  }
};

// Sign out function
export const signOut = async () => {
  try {
     await auth().signOut();
     console.log('User signed out!');
     await AsyncStorage.removeItem('@user_token');
  } catch (error) {
    console.error(error.message);
  }
};


// Function to check if the user is logged in
export const checkUserAuth = async () => {
  try {
    const userToken = await AsyncStorage.getItem('@user_token');
    if (userToken) {
      return auth().currentUser; // Return the current user if token exists
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error checking authentication:', error.message);
    throw error;
  }
};
