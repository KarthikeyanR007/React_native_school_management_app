/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Text, Button, Image, FlatList } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient
import SubList from './SubList';
import firestore from '@react-native-firebase/firestore'; // Ensure this import is correct

export default function GradeList({ route }) {
  const { Reg_no , classId ,img , Adnum} = route.params;
  const [grade, setGrade] = useState(0);
  const [markData, setMarkData] = useState([]);
  const [marktotal,setMarkTotal] = useState(null);
  const user = useSelector((state) => state.user.user);
  const userMail = user.username;

  const consoleCheck = () => {
    console.log(userMail);
    console.log(Reg_no);
    console.log(data);
    console.log(classId);
  };

  useEffect(() => {
    const fetchRegNo = async () => {
      try {
        const snapshot = await firestore()
          .collection('marks')
          .doc(Reg_no)
          .get();

        if (snapshot.exists) {
          const datas = snapshot.data();
          setMarkData(datas);
          const total = Object.values(datas).reduce((sum, mark) => sum + parseFloat(mark), 0);
          setMarkTotal(total);
          setGrade(total / 5);
        } else {
          console.log('No Data');
        }
      } catch (err) {
        console.log(`Error getting document: ${err}`);
      } finally {
        console.log('complete');
      }
    };

    fetchRegNo();
  }, [Reg_no]);

  const data = Object.entries(markData).map(([subject, mark]) => ({
    id: subject,
    mark,
  }));

  return (
    <SafeAreaView style={styles.fullContainer}>
      <LinearGradient
        colors={['#d35400', '#e59866']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headContainer}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
          <Image
            style={styles.userImage}
            source={{uri: img}}
          />
          <View>
            <View>
              <Text style={styles.headTextDetail}>Reg no:</Text>
              <Text style={styles.headText}>{Reg_no}</Text>
            </View>
          </View>
        </View>
        <View style={styles.classBox}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.classText}>Class</Text>
            <Text style={styles.classAns}>{classId}</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.classText}>Admn no</Text>
            <Text style={styles.classAns}>{Adnum}</Text>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.gradeBox}>
        <AnimatedCircularProgress
          size={90}
          width={15}
          fill={grade}
          tintColor="#212f3d"
          backgroundColor="#626567"
          lineCap="round"
          style={styles.circleBar}
        >
          {(fill) => (
            <Text style={{ fontSize: 20, color: '#ffff' }}>
              {`${grade}%`}
            </Text>
          )}
        </AnimatedCircularProgress>
        <View style={styles.markText}>
          <Text style={{ fontSize: 25 , fontWeight:'bold'}}>Total : {marktotal}</Text>
        </View>
      </View>
      {/* <Button
        title='Press me'
        onPress={consoleCheck}
      /> */}
      <FlatList
        data={data}
        renderItem={({ item }) => <SubList title={item.id} marks={item.mark} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headContainer: {
    height: 200,
    width: '98%',
    marginTop: 2,
    borderRadius: 5,
  },
  headTextDetail: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 10,
    fontFamily: 'ChelaOne-Regular',
  },
  headText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 10,
  },
  fullContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f0b27a',
  },
  userImage: {
    height: 80,
    width: 80,
    borderRadius: 50,
    marginRight: 10,
    marginTop: 20,
    marginLeft: 20,
  },
  gradeBox: {
    height: 100,
    width: '98%',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    paddingLeft: 10,
    backgroundColor: '#ca6f1e',
    marginTop: 12,
    borderRadius: 10,
    flexDirection: 'row',
  },
  classText: {
    fontSize: 25,
    fontFamily: 'ChelaOne-Regular',
    fontWeight: 'bold',
  },
  circleBar: {},
  classBox: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#d35400',
    height: 90,
    alignItems: 'center',
  },
  classAns: {
    fontSize: 20,
  },
  markText: {
    marginRight: 30,
  },
});
