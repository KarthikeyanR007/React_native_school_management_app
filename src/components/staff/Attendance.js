/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import FIRESTORE from '../../../utils/firebaseConstants';
import AttendanceContainer from './AttendanceContainer';
import {useSelector} from 'react-redux';



export default function Attendance({route}) {
  const { classID , name } = route.params;
  const [visible, setVisible] = useState(true);
  const [usersList, setUsersList] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [modalVisible,setModalVisible] = useState(false);
  const user = useSelector(state => state.user.user);
  const userMail = user.username;

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return `${year}/${month}/${day}`;
    };

    const currentDate = new Date();
    const toDay = formatDate(currentDate);



    
  useEffect(() => {
    let isMounted = true;

    const fetchStaff = async () => {
      try {
        const snapshot1 = await firestore()
          .collection(FIRESTORE.collections.staffInfo)
          .where('email', '==', userMail)
          .get();

        if (snapshot1.empty) {
          console.log('No document matched');
          return;
        }

        const fetchStaffData = snapshot1.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (isMounted) {
           setStaffList(fetchStaffData); // Assuming you might use this in the future
        }
      } catch (error) {
        console.error('Error fetching staff data: ', error);
      }
    };

    fetchStaff();

    return () => {
      isMounted = false;
    };
  }, [userMail]);





  useEffect(() => {
    let isMounted = true;
   
    const fetchStdData = async () => {
      try {
        const snapshot = await firestore()
          .collection(FIRESTORE.collections.userInfo)
          .where('class', '==', classID)
          .get();

        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }

        const fetchedUsersList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (isMounted) {
          setUsersList(fetchedUsersList);
          setVisible(false);
        }
      } catch (error) {
        console.error('Error fetching student data: ', error);
      }
    };

    fetchStdData();

    return () => {
      isMounted = false;
    };
  }, [classID]);


  const handleSelect = (regNo, isSelected) => {
    setSelectedUsers(prevState => {
      let updatedSelectedUsers;
      if (isSelected) {
        updatedSelectedUsers = [...prevState, regNo];
      } else {
        updatedSelectedUsers = prevState.filter(item => item !== regNo);
      }
      // Log the updated selected users
      console.log('Selected Users:', updatedSelectedUsers);
      return updatedSelectedUsers;
    });
  };

  const handleSubmitAttendance = async() => {
    try{
        if(selectedUsers.length !== 0){
            const docRef = firestore().collection('attendance').doc(toDay);
            await docRef.set({
                listField: selectedUsers
            });
            setModalVisible(true);
        }
    }catch(error){
        console.log('No get file',error);
    }
  };
  useEffect(() => {
    // Log the selected users whenever the component re-renders
    console.log('Current Selected Users:', selectedUsers);
  }, [selectedUsers]);

  return (
    <SafeAreaView style={{width: '100%', flex: 1, backgroundColor: '#5dade2',}}>
      <View style={styles.mainHeader}>
        <View style={styles.headerBox}>
          <Image style={styles.image} source={require('../assets/A.png')} />
          <View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.classText}>Class :</Text>
              <Text style={styles.std}> {classID}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.classText}>Staff :</Text>
              <Text style={styles.std}> {name}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.classText}>Section :</Text>
              <Text style={styles.std}> A</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.classText}>Date :</Text>
              <Text style={styles.std}> {toDay}</Text>
            </View>
          </View>
        </View>
      </View>
      {visible ? (
        <ActivityIndicator size="large" color="#00ff00" style={styles.loader} />
      ) : (
        <FlatList
          data={usersList}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <AttendanceContainer
              Reg_no={item.Reg_no}
              name={item.name}
              isSelected={selectedUsers.includes(item.Reg_no)}
              onSelect={handleSelect}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No users available</Text>
          }
          contentContainerStyle={styles.flatContentContainerStyle}
        />
      )}
      <TouchableOpacity
        onPress={() => handleSubmitAttendance()}
        style={styles.subButton}
        >
        <Text style={{color:'white',fontWeight:'800'}}>submit</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        animationType='slide'
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBg}>
         <View style={styles.modalContainer}>
           <Text style={{color:'black'}}>Attendance submitted successfully!</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                   onPress={() => setModalVisible(false)}
                   style={{
                        width:80,
                        height:40,
                        backgroundColor:'#2874a6',
                        justifyContent:'center',
                        alignItems:'center',
                        borderRadius:5,
                        fontWeight:'bold',
                    }}>
                    <Text style={{color:'black'}}>OK</Text>
                </TouchableOpacity>
            </View>
         </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  headerBox: {
    height: 150,
    width: '95%',
    borderRadius: 5,
    marginTop: 15,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2874a6',
  },
  modalBg:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    marginLeft:170,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems:'center',
  },
  mainHeader: {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  image: {
    height: 80,
    width: 80,
    alignItems: 'center',
    borderRadius: 50,
    marginRight: 40,
  },
  classText: {
    marginLeft: 20,
    marginTop: 7,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  std: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 7,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subButton:{
    height:40,
    width:180,
    borderRadius:5,
    backgroundColor:'#283747',
    justifyContent:'center',
    alignItems:'center',
    marginLeft:'25%',
    marginBottom:30,
  },
  emptyText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    color: 'black',
  },
  flatContentContainerStyle: {
    width: '100%',
  },
});
