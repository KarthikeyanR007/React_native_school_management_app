/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Button,
  Modal,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';
import StaffContainer from './StaffContainer';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { signUp } from '../../Auth/firebaseService/authServices';

export default function AddStaff({navigation}) {

  const [date, setDate] = useState(new Date());
  const [inputValue, setInputValue] = useState('');
  const [students, setStudents] = useState([]);
  const [show, setShow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('username');
  const [searchVisible, setSearchVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [adNum, setAdNum] = useState('');
  const [regNo, setRegNo] = useState('');
  const [classLevel, setClassLevel] = useState('');
  const [items, setItems] = useState([
                                {label: 'user', value: 'username'},
                                {label: 'Num', value: 'Ad_num'},
                              ]);
  const handleAddUser = async () => {
    handleRegister(username,password);
    if (name && username && password && adNum && regNo && classLevel) {
      try {
        await firestore().collection('staffInfo').add({
          name,
          email:username,
          password,
          staffId: adNum,
          DOB: regNo,
          class: classLevel,
        });
        Alert.alert('Success', 'User added successfully');
        setName('');
        setUsername('');
        setPassword('');
        setAdNum('');
        setRegNo('');
        setClassLevel('');
        setModalVisible(false);
      } catch (error) {
        Alert.alert('Error', 'Failed to add user');
      }
    } else {
      Alert.alert('Validation Error', 'Please fill in all fields');
    }
  };
  
  const handleRegister = async(username,password) =>{
    try{
     const log = await signUp(username, password);
     console.log(username , password);
     if(log){
      console.log('susscess');
     }
    }catch(e){
      console.log('Error: ',e);
    }
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const snapshot = await firestore().collection('staffInfo').get();
        const studentsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('Fetched staffs:', studentsData);
        setStudents(studentsData);
      } catch (error) {
        console.error('Error fetching students: ', error);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    if (value) {
      setSort(value);
    }
  }, [value]);

  const filterStudents = () => {
    return students
      .sort((a, b) => {
        if (sort === 'name') {
          return a.name.localeCompare(b.name);
        }
        if (sort === 'staffId') {
          return a.staffId.localeCompare(b.staffId);
        }
        return 0;
      });
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setRegNo(dayjs(currentDate).format('DD-MM-YYYY'));
  };

  const handleConsole = () => {
    console.log('pressed');
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Icons
            onPress={()=>{navigation.navigate('AdminHome')}}
            name="navigate-before"
            size={30}
            color="#000"
            style={styles.navigation}
          />
          {searchVisible && (
            <TextInput
              style={styles.searchBar}
              placeholder="Search..."
              value={search}
              onChangeText={text => setSearch(text)}
              placeholderTextColor="black"
              cursorColor="black"
            />
          )}
          <Icons
            name="search"
            size={25}
            color="#000"
            style={styles.searchIcon}
            onPress={() => setSearchVisible(!searchVisible)}
          />
        </View>
        <View style={styles.sortAddContainer}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={styles.addUser}>
              <Text style={styles.userText}>Add</Text>
              {/* <Image
                style={styles.addImg}
                source={require('../assets/addIcon.png')}
              /> */}
            </View>
          </TouchableOpacity>
          <View style={styles.drop}>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="Sort"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              showArrow={false}
              arrowStyle={styles.arrow}
            />
          </View>
        </View>
        <FlatList
          data={filterStudents()}
          keyExtractor={item => item.id}
          renderItem={({item}) => <StaffContainer itm_id={item.id} regNo={item.staffId} name={item.name}/>}
          ListEmptyComponent={<ActivityIndicator size="large" />}
          style={styles.flatlistContainer}
        />
      </View>
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add User</Text>

            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
              placeholderTextColor={'red'}
            />

            <TextInput
              style={styles.input}
              placeholder="Email"
              value={username}
              onChangeText={setUsername}
              keyboardType="email-address"
              placeholderTextColor={'red'}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor={'red'}
            />

            <TextInput
              style={styles.input}
              placeholder="staffId"
              value={adNum}
              onChangeText={setAdNum}
              placeholderTextColor={'red'}
            />

            <TextInput
              style={styles.input}
              placeholder="DOB"
              value={regNo}
              onChangeText={setRegNo}
              onFocus={showDatepicker}
              placeholderTextColor={'red'}
            />
            {show && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={onChange}
                />
              )}
            <TextInput
              style={styles.input}
              placeholder="Class"
              value={classLevel}
              onChangeText={setClassLevel}
              placeholderTextColor={'red'}
            />

            <View style={styles.buttonContainer}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} color="red" />
              <Button title="Submit" onPress={handleAddUser} />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#f0b27a',
    width:'100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  navigation: {
    marginRight: '64%',
    color: 'black',
  },
  searchBar: {
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
    color: 'black',
    width: 300,
  },
   arrow: {
    width: 0,
    height: 0,
  },
  flatlistContainer:{
    width:'100%',
  },
  dropdown: {
    width: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    height:50,
    marginRight:0,
    backgroundColor: '#e67e22',
  },
  dropdownContainer: {
    borderColor: 'transparent',
    zIndex: 999,
    backgroundColor:'#e67e22',
  },
  DetailText: {
    color: 'black',
  },
  searchIcon: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    height: 26,
    width: 26,
    marginTop: 10,
    marginLeft: 10,
  },
  addUser: {
    height: 50,
    width: 65,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#e67e22',
    borderRadius:10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  userText: {
    color: 'black',
    fontSize: 20,
    backgroundColor:'#e67e22',
  },
  addImg: {
    height: 20,
    width: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  sortAddContainer: {
    flexDirection: 'row',
    marginLeft:20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  drop:{
    marginLeft:140,
  },
   modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    color:'black',
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
