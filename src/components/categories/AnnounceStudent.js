/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

export default function AnnounceStudent({route, navigation}) {
  const [announceAllData, setAnnounceAllData] = useState({
    date: '',
    inputValue: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnounceData = async () => {
      try {
        setLoading(true);

        const announceAllDoc = await firestore()
          .collection('announcement')
          .doc('announceAll')
          .get();

        if (announceAllDoc.exists) {
          const data = announceAllDoc.data();
          setAnnounceAllData({
            date: data.date || 'No date available',
            inputValue: data.inputValue || 'No message available',
          });
        } else {
          console.log('No such document!');
          setAnnounceAllData({
            date: 'No date available',
            inputValue: 'No message available',
          });
        }

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchAnnounceData();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
    );
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerBox}>
        <Text style={styles.headerText}>Announcement</Text>
      </View>
      <View style={styles.dateContainer}>
        <View style={styles.line} />
        <Text style={styles.dateText}>{announceAllData.date}</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.itemText}> {announceAllData.inputValue}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
   safeArea: {
        flex: 1,
        backgroundColor: '#cacfd2',
        alignItems: 'center',
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#cacfd2',
        alignItems: 'center',
        padding: 16,
        width:'100%',
    },
    textContainer:{
        height:100,
        width:'99%',
        borderRadius:5,
        padding:10,
        backgroundColor:'#a6acaf',
    },
    itemText: {
        fontSize: 20,
        color: '#283747',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerBox:{
        height:50,
        width:'95%',
        marginTop:20,
        borderRadius:5,
        backgroundColor:'#909497',
        justifyContent:'center',
    },
    headerText:{
        fontSize:25,
        fontWeight:'bold',
        textAlign:'center',
        color:'#283747',
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#000',
    },
    dateText: {
        marginHorizontal: 10,
        fontSize: 16,
        color: '#283747',
    },
});
