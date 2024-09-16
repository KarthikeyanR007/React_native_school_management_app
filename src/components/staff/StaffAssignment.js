/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import firestore from '@react-native-firebase/firestore';

export default function StaffAssignment({route}) {
  const {staffEmail} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [value, setValue] = useState(null);
  const [value1, setValue1] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [staffAssign, setStaffAssign] = useState([]);
  const [items, setItems] = useState([
    {label: '1 std', value: '1 std'},
    {label: '2 std', value: '2 std'},
    {label: '3 std', value: '3 std'},
    {label: '4 std', value: '4 std'},
    {label: '5 std', value: '5 std'},
  ]);

  const [items1, setItems1] = useState([
    {label: 'Tamil', value: 'Tamil'},
    {label: 'English', value: 'English'},
    {label: 'Maths', value: 'Maths'},
    {label: 'Science', value: 'Science'},
    {label: 'Social', value: 'Social'},
  ]);

  const formatDate = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${day}/${month}/${year}`;
  };

  const currentDate = new Date();
  const toDay = formatDate(currentDate);

  const handleSubmitAssign = async () => {
    console.log(value, value1, inputValue);
    setModalVisible(false);
    try {
      // Add assignment to the 'assignment' collection
      await firestore()
        .collection('assignment')
        .doc(value)
        .collection(value1)
        .doc()
        .set({
          inputValue,
          date: toDay,
        });
    } catch (error) {
      console.log('Error adding assignment:', error);
    }

    try {
      // Add assignment to the 'assignmentStaff' collection
      await firestore()
        .collection('assignmentStaff')
        .doc(staffEmail)
        .collection(value)
        .doc(value1)
        .set({
          inputValue,
          date: toDay,
        });
    } catch (error) {
      console.log('Error adding staff assignment:', error);
    }
  };

    useEffect(() => {
    const fetchAssignments = async () => {
        if (!value || !value1) {
            // Do not fetch if value or value1 is not set
            return;
        }

        try {
            // Fetch assignments for the given staff email, class, and subject
            const collectionRef = firestore()
                .collection('assignmentStaff')
                .doc(staffEmail)
                .collection(value); // Collection for class

            const querySnapshot = await collectionRef.get();

            if (querySnapshot.empty) {
                console.log('No assignments found');
                setStaffAssign([]);
                return;
            }

            const assignmentData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            console.log('Fetched Assignments:', assignmentData);
            setStaffAssign(assignmentData);
        } catch (error) {
            console.log('Error fetching assignments:', error);
        }
    };

    fetchAssignments();
}, [staffEmail, value, value1]); // Ensure value and value1 are included in dependencies



  // eslint-disable-next-line react/no-unstable-nested-components
  const AssignmentContainer = props => {
    return (
      <View style={styles.assignmentContainer}>
        <Text style={styles.AssignContText}>{props.inputValue}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: '#5dade2', justifyContent:'center' ,alignItems: 'center'}}>
      <View style={styles.addConatinerMain}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.addContainer}>
            <Text style={styles.newAssignText}>New Assignment</Text>
            <Image
              style={styles.addImg}
              source={require('../assets/add-button.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        data={staffAssign}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <AssignmentContainer inputValue={item.inputValue} />
        )}
        ListEmptyComponent={<View style={{marginTop:'55%'}}><ActivityIndicator size="large"  color='#a93226'/></View>}
        style={styles.flatList}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.BGmodal}>
          <View style={styles.ModalContainer}>
            <View style={styles.classModal}>
              <Text style={styles.modalText}>Class</Text>
              <DropDownPicker
                open={open}
                items={items}
                value={value}
                setItems={setItems}
                setValue={setValue}
                setOpen={setOpen}
                placeholder="class"
                style={[styles.dropdown, {zIndex: 100}]}
              />
            </View>
            <View style={[styles.classModal, {marginTop: 40}]}>
              <Text style={styles.modalText}>Subject</Text>
              <DropDownPicker
                open={open1}
                items={items1}
                value={value1}
                setItems={setItems1}
                setValue={setValue1}
                setOpen={setOpen1}
                placeholder="subject"
                style={[styles.dropdown, {zIndex: -111}]}
              />
            </View>
            <View style={styles.OuterText}>
              <TextInput
                style={styles.TextInput}
                value={inputValue}
                onChangeText={setInputValue}
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.cancelButton}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSubmitAssign}
                style={styles.okButton}>
                <Text style={styles.okText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addConatinerMain: {
    alignItems: 'center',
  },
  addContainer: {
    height: 60,
    width: '90%',
    marginTop: 50,
    borderRadius: 10,
    backgroundColor: '#2e4053',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  dropdown: {
    width: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    height: 30,
    marginRight: 0,
    marginLeft: 40,
  },
  assignmentContainer: {
    width: '98%',
    borderRadius: 5,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a5276',
    marginLeft:5,
    marginTop: 10,
    padding:10,
  },
  flatList:{
    width:'98%',
  },
  AssignContText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    textAlign:'center',
  },
  TextInput: {
    height: 100,
    width: '100%',
    borderWidth: 1,
    borderRadius: 7,
    color: 'black',
    textAlignVertical: 'top',
    marginTop: 20,
  },
  newAssignText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginRight: 10,
  },
  OuterText: {
    width: '100%',
  },
  addImg: {
    height: 40,
    width: 40,
    marginRight: 20,
  },
  okButton: {
    width: 80,
    height: 40,
    backgroundColor: '#2874a6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  okText: {
    color: 'white',
  },
  modalText: {
    color: 'black',
    fontSize: 20,
    marginRight: 50,
  },
  BGmodal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  ModalContainer: {
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    alignItems: 'center',
  },
  cancelButton: {
    width: 80,
    height: 40,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  classModal: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginLeft: 100,
  },
});
