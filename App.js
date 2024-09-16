/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import Home from './src/components/Home';
import Settings from './src/components/Settings';
import Login from './src/Auth/Login';
import { Text } from 'react-native';
import CustomDrawerContent from './src/components/CustomDrawerContent';
import Learning from './src/components/categories/Learning';
import News from './src/components/categories/News';
import TimeTable from './src/components/categories/TimeTable';
import GradeList from './src/components/categories/GradeList';
import AnnounceStudent from './src/components/categories/AnnounceStudent';
import AdminHome from './src/components/admin/AdminHome';
import Addstudent from './src/components/admin/Addstudent';
import AddStaff from './src/components/admin/AddStaff';
import Announcement from './src/components/admin/Announcement';
import StaffHome from './src/components/staff/StaffHome';
import Attendance from './src/components/staff/Attendance';
import AnnounceStaff from './src/components/staff/AnnounceStaff';
import StaffAssignment from './src/components/staff/StaffAssignment';
import AssignmentStud from './src/components/categories/AssignmentStud';
import AddTimeTable from './src/components/admin/AddTimeTable';
import AddFirstTime from './src/components/categories/AddFirstTime';
import StaffTimeTable from './src/components/admin/StaffTimeTable';
import StaffTimeTableContainer from './src/components/admin/StaffTimeTableContainer';
import StaffContainer from './src/components/admin/StaffContainer';
import StaffPageTimeTable from './src/components/staff/StaffPageTimeTable';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ route }) => ({
        drawerIcon: () => {
          let icon;
          if (route.name === 'Login') {
            icon = '🗂️';
          } else if (route.name === 'Settings') {
            icon = '📋';
          }
          return (
            <Text style={{ color: '#e91e63', fontSize: 20 }}>
              {icon}
            </Text>
          );
        },
        drawerActiveTintColor: '#ec4411', // Color for the active item
        drawerInactiveTintColor: '#888', // Color for the inactive items
        headerShown: false, // Ensure header is not shown
      })}
    >
      <Drawer.Screen name='Home' component={Home} />
      <Drawer.Screen name='AdminHome' component={AdminHome} />
      <Drawer.Screen name='Settings' component={Settings} />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login"      component={Login} />
        <Stack.Screen name="DrawerNav"  component={DrawerNav} />
        <Stack.Screen name="Home"       component={Home} />
        <Stack.Screen name="AdminHome"  component={AdminHome} />
        <Stack.Screen name="Settings"   component={Settings} />
        <Stack.Screen name="Learning"   component={Learning} />
        <Stack.Screen name="News"       component={News} />
        <Stack.Screen name="TimeTable"  component={TimeTable} />
        <Stack.Screen name="GradeList"  component={GradeList} />
        <Stack.Screen name="Addstudent" component={Addstudent} />
        <Stack.Screen name="StaffHome"  component={StaffHome} />
        <Stack.Screen name="Attendance" component={Attendance} />
        <Stack.Screen name="Announcement" component={Announcement} />
        <Stack.Screen name="AnnounceStudent" component={AnnounceStudent} />
        <Stack.Screen name="AnnounceStaff" component={AnnounceStaff} />
        <Stack.Screen name="StaffAssignment" component={StaffAssignment} />
        <Stack.Screen name="AssignmentStud" component={AssignmentStud} />
        <Stack.Screen name="AddStaff" component={AddStaff} />
        <Stack.Screen name="AddTimeTable" component={AddTimeTable} />
        <Stack.Screen name="AddFirstTime" component={AddFirstTime} />
        <Stack.Screen name="StaffTimeTable" component={StaffTimeTable} />
        <Stack.Screen name="StaffContainer" component={StaffContainer} />
        <Stack.Screen name="StaffTimeTableContainer" component={StaffTimeTableContainer} />
        <Stack.Screen name="StaffPageTimeTable" component={StaffPageTimeTable} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
