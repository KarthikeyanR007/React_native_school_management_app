/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, Text, View, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LearnContainer from './LearnContainer';
import firestore from '@react-native-firebase/firestore';
import {getSubjectsForClass} from './subjectList';

const Learning = ({route}) => {
   const { classId } = route.params;
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [subjects, setSubjects] = useState([]);
  // useEffect(() => {
  //     const fetchSubjects = async () => {
  //         console.log('Class Name in learning:',classId);
  //          try {
  //            // Reference to the sub-collection
  //            const collectionRef = firestore()
  //              .collection('class')
  //              .doc('classDoc')
  //              .collection('LKG')
  //              .doc('LKG-Doc')
  //              .collection('Tamil'); // Change 'Tamil' to your sub-collection name
  //            const snapshot = await collectionRef.get();
  //            if (snapshot.empty) {
  //              console.log('No matching documents.');
  //              setSubjectList([]);
  //              return;
  //            }
  //            let subjects = [];
  //            snapshot.forEach(doc => {
  //              subjects.push({id: doc.id, ...doc.data()});
  //            });
  //            setSubjectList(subjects);
  //          } catch (error) {
  //            console.error('Error fetching subjects:', error);
  //            setError(error);
  //          } finally {
  //            setLoading(false);
  //          }
  //   };

  //  fetchSubjects();
  // },);c



   useEffect(() => {
    const fetchData = async () => {
      try {
        const subjectList = await getSubjectsForClass(classId);
        setSubjects(subjectList);
       // console.log(subjects);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  },);


  return (
    <SafeAreaView style={styles.fullContainer}>
      <View style={styles.imageContainer}>
        <ImageBackground
          style={styles.textContainer}
          source={require('../assets/learnbg.jpg')}
          imageStyle={styles.imageStyle}>
          <Text style={styles.learningText}>Subject</Text>
        </ImageBackground>
      </View>
      <View style={styles.itemContainer}>
        <FlatList
          data={subjects}
          renderItem={({item}) => <LearnContainer item={item} />}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  learningText: {
    color: 'black',
    fontWeight: 'bold',
    marginTop: 30,
    fontSize: 35,
    textAlign: 'center',
  },
  fullContainer: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
  },
  imageStyle: {
    borderRadius: 10,
  },
  imageContainer: {
    width: '100%',
    height: 150,
    alignItems: 'center',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
    borderRadius: 20,
  },
  itemContainer: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Learning;
