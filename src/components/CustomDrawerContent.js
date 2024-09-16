/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CustomDrawerContent = props => {


 const signOut = async () => {
  try {
    await auth().signOut();
    console.log('User signed out successfully!');
    props.navigation.navigate('Login');
    await AsyncStorage.removeItem('@user_token');
  } catch (error) {
    console.error('Error signing out:', error.message);
    throw new Error(error.message);
  }
};

  return (
    <DrawerContentScrollView {...props} style={styles.drawerContent}>
      <View style={styles.avatarContainer}>
        {/* <Image
          source={require('./assets/avat.png')}
          style={styles.avatar}
        /> */}
        <Text style={styles.name}>Karthi</Text>
      </View>
      <View style={styles.drawerItemsContainer}>
        <DrawerItem
          label="Home"
          labelStyle={styles.drawerItemLabel}
          onPress={() => props.navigation.navigate('Home')}
        />
        <DrawerItem
          label="AdminHome"
          labelStyle={styles.drawerItemLabel}
          onPress={() => props.navigation.navigate('AdminHome')}
        />
      </View>
      <View style={styles.signOutContainer}>
        <TouchableOpacity
          onPress={() => {
            signOut();
          }}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: '#1e1e2d',
  },
  avatarContainer: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#888',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#e91e63',
  },
  name: {
    marginTop: 10,
    color: '#fff',
    fontSize: 18,
  },
  drawerItemsContainer: {
    flex: 1, // Takes up all available space between the avatar and the sign-out button
  },
  drawerItemLabel: {
    color: '#fff', // Text color for drawer item labels
  },
  signOutContainer: {
    marginTop: '130%',
    paddingVertical:20,
    borderTopWidth: 1,
    borderTopColor: '#888',
    backgroundColor: '#1e1e2d',
  },
  signOutText: {
    color: '#ff4c4c',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CustomDrawerContent;
