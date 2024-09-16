/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  FlatList,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import FIRESTORE from '../../../utils/firebaseConstants';

const StaffPageTimeTable = ({ route }) => {
  const { staffId } = route.params;
  const [subjects, setSubjects] = useState([]);
  const [selectedDay, setSelectedDay] = useState('Mon');
  const days = ['Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];

  useEffect(() => {
    const fetchTimeTable = async () => {
      try {
        const snapshot = await firestore()
          .collection('staffTimeTable')
          .doc(staffId)
          .collection(selectedDay)
          .get();

        if (snapshot.empty) {
          setSubjects([]);
          return;
        }

        let subjectList = [];
        snapshot.forEach(doc => {
          const data = doc.data();

          // Extract fields and sort them
          const sortedPeriods = Object.keys(data).sort((a, b) => {
            const periodOrder = {
              '1st': 1,
              '2st': 2,
              '3st': 3,
              '4st': 4,
              '5st': 5,
              '6st': 6,
              '7st': 7,
            };
            return (periodOrder[a] || 0) - (periodOrder[b] || 0);
          });

          // Map sorted periods to the list of subjects
          sortedPeriods.forEach(period => {
            subjectList.push(data[period]);
          });
        });

        setSubjects(subjectList);
      } catch (error) {
        console.error('Error fetching timetable:', error);
      }
    };

    fetchTimeTable();
  }, [selectedDay, staffId]);

  const handleSelectedDay = day => {
    setSelectedDay(day);
  };

  const renderSubject = ({ item }) => {
    return (
      <View style={styles.subjectContainer}>
        <Text style={styles.subjectText}>{item}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.fullContainer}>
      <ImageBackground
        source={require('../assets/timeBG.png')}
        style={styles.background}
      >
        <View style={styles.innerContainer}>
          <View style={styles.DayOutcontainer}>
            {days.map(day => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.dayContainer,
                  selectedDay === day && styles.selectedDay,
                ]}
                onPress={() => handleSelectedDay(day)}
              >
                <Text
                  style={[
                    styles.dayText,
                    selectedDay === day && styles.selectedDayText,
                  ]}
                >
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.listContainer}>
            <FlatList
              data={subjects}
              renderItem={renderSubject}
              keyExtractor={(item, index) => index.toString()} // Use index as key
              contentContainerStyle={styles.subjectListContainer}
              ListEmptyComponent={
                <Text style={styles.noSubjects}>No subjects for this day</Text>
              }
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    width: '100%',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  innerContainer: {
    flex: 1,
    width: '100%',
  },
  DayOutcontainer: {
    flexDirection: 'row',
    borderColor: '#ffff',
    borderWidth: 2,
    borderRadius: 0,
    overflow: 'hidden',
    margin: 20,
  },
  dayContainer: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ffff',
    borderRightWidth: 1,
  },
  selectedDay: {
    backgroundColor: '#00A0E3',
  },
  dayText: {
    color: '#00A0E3',
    fontSize: 16,
  },
  selectedDayText: {
    color: '#ffffff',
  },
  listContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  subjectListContainer: {
    flexGrow: 1,
  },
  subjectContainer: {
    marginVertical: 10,
    width: '100%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height:60,
    borderRadius:5,
    backgroundColor:'#00A0E3',
  },
  subjectText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  noSubjects: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
  },
});

export default StaffPageTimeTable;
