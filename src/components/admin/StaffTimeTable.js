/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const StaffTimeTable = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Query the 'staffInfo' collection
        const snapshot = await firestore().collection('staffInfo').get();

        if (snapshot.empty) {
          Alert.alert('No Users', 'No users found in the staffInfo collection.');
          setUsers([]);
          return;
        }

        // Extract data from the snapshot
        const usersList = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            username: data.staffId,
            name: data.name,
          };
        });

        // Set the state with the extracted data
        setUsers(usersList);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);


  const handleAttendsStaff = (username) => {
    navigation.navigate('StaffTimeTableContainer',{ username : username});
    console.log(username);
  };

  const renderUser = ({ item }) => (
    <TouchableOpacity onPress={()=>handleAttendsStaff(item.username)} style={styles.userContainer}>
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#00A0E3" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={users}
          renderItem={renderUser}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={<Text style={styles.noData}>No users available</Text>}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:'#f0b27a',
  },
  userContainer: {
    padding: 15,
    height:80,
    width:'100%',
    marginVertical:10,
    backgroundColor:'#e67e22',
    borderRadius:5,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'black',
  },
  name: {
    fontSize: 16,
    color: '#555',
  },
  listContainer: {
    flexGrow: 1,
  },
  noData: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  }, 
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default StaffTimeTable;
