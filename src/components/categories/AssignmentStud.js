/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function AssignmentStud({ route }) {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { classId } = route.params;

  useEffect(() => {
    const fetchAssignments = async () => {
        console.log('class',classId);
      try {
        const subjects = ['Tamil', 'English', 'Maths'];
        let allAssignments = [];

        for (const subject of subjects) {
          const subjectCollectionRef = firestore()
            .collection('assignment')
            .doc(classId)
            .collection(subject);

          const snapshot = await subjectCollectionRef.get();
          snapshot.docs.forEach(doc => {
            allAssignments.push({
              id: doc.id,
              subject: subject,
              ...doc.data(),
            });
          });
        }

        if (allAssignments.length === 0) {
          console.log('No assignments found');
        }

        console.log('Fetched Assignments:', allAssignments);
        setAssignments(allAssignments);
      } catch (error) {
        console.log('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [classId]);

  const AssignmentContainer = props => {
    return (
      <View style={styles.assignmentContainer}>
        <Text style={styles.AssignContText}>{props.inputValue}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#5dade2', justifyContent: 'center', alignItems: 'center' }}>
      {loading ? (
        <ActivityIndicator size="large" color='#a93226' />
      ) : (
        <>
          <View style={styles.TextHeadConatiner}>
            <Text style={styles.AssignText}>Assignments</Text>
          </View>
          <FlatList
            data={assignments}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <AssignmentContainer inputValue={item.inputValue} />
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>No assignments found</Text>}
            style={styles.flatList}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  assignmentContainer: {
    width: '100%',
    borderRadius: 15,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a5276',
    marginTop: 10,
    padding: 10,

  },
  AssignContText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 20,
    color: 'white',
    marginTop: 20,
  },
  AssignText:{
    fontSize:26,
    fontWeight:'bold',
    color:'#ba4a00',
    textAlign:'center',
    textAlignVertical:'center',
  },
  TextHeadConatiner:{
    height:50,
    width:'96%',
    marginTop:30,
    borderRadius:5,
    backgroundColor:'#34495e',
    justifyContent:'center',
  },

});
