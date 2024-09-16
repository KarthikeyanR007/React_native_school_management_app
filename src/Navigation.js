/* eslint-disable prettier/prettier */
import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './components/Home';
import Settings from './components/Settings';
import Login from '../Auth/Login';
import createDrawerNavigator from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();

 const DrawerNav = () => {
   const Drawer = createDrawerNavigator();
   return(
        <Drawer.Navigator
             drawerStyle={{ backgroundColor: 'yellow' }}
        >
          <Drawer.Screen name='HomeMain' component={Home}/>
          <Drawer.Screen name='Settings' component={Settings}/>
      </Drawer.Navigator>
  );
};


const Navigation = () =>{
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen
          initialRouteName="Home"
          name="Home"
          component={DrawerNav}
        />
        <Stack.Screen
          name="Login"
          component={Login}
        />
         <Stack.Screen
          name="Settings"
          component={Settings}
        />
      </Stack.Navigator>;
    </NavigationContainer>
  );
};

export default Navigation;
