/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';

export default function Announcement() {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const[docs,setDocs] = useState('');

  const announceAll = () =>{
        setDocs('announceAll');
        setModalVisible(true);
        handleAnnounceAll;
   };

  const announceStudents = () =>{
        setDocs('announceStudence');
        setModalVisible(true);
        handleAnnounceAll;
   };

  const announceStaff = () =>{
        setDocs('announceStaff');
        setModalVisible(true);
        handleAnnounceAll;
   };

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
        return `${day}/${month}/${year}`;
    };

    const currentDate = new Date();
    const toDay = formatDate(currentDate);

  const handleAnnounceAll = async () => {
    if (inputValue) {
        console.log(docs);
      try {
        await firestore().collection('announcement').doc(docs).set({
          inputValue,
          date: toDay,
        });
        Alert.alert('Successfully updated');
        setInputValue('');
        setModalVisible(false);
        setDocs('');
      } catch (error) {
        console.log('firebase error', error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.mainBox}>
      <View>
        <Image style={styles.img} source={require('../assets/announce.png')} />
      </View>
      <View>

        <TouchableOpacity
          onPress={()=>announceAll()}
          style={styles.announce}>
          <Text style={styles.announceText}>Announcement for All</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={()=>announceStudents()}
          style={styles.announce}>
          <Text style={[styles.announceText, {textAlign: 'center'}]}>
            Announcement for Students
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={()=>announceStaff()}
          style={styles.announce}>
          <Text style={styles.announceText}>Announcement for Staff</Text>
        </TouchableOpacity>

      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modelBG}>
          <View style={styles.modalContainer}>
            <TextInput
              value={inputValue}
              style={styles.textInput}
              autoCorrect={true}
              multiline={true}
              onChangeText={setInputValue}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.cancelButton}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleAnnounceAll}
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
  img: {
    height: 250,
    width: 250,
    marginTop: 50,
  },
  modelBG: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  mainBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  announce: {
    height: 50,
    width: 250,
    borderRadius: 10,
    backgroundColor: '#909497',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
  },
  textInput: {
    height: 100,
    width: '95%',
    borderWidth: 2,
    marginTop: 10,
    borderRadius: 5,
    color: 'black',
    textAlignVertical: 'top',
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
  cancelText: {
    color: 'black',
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
    color: 'black',
  },
  announceText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
});
