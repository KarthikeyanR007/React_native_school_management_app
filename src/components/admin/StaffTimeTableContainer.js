/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal,Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function AddFirstTime({ route }) {
  const { username } = route.params;
  const [selectedValue, setSelectedValue] = useState("");
  const [inputValues, setInputValues] = useState(Array(6).fill(""));
  const [modalVisible,setModalVisible] = useState(false);
  const buttonLabels = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th'];

  const handleInputChange = (text, index) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = text;
    setInputValues(newInputValues);
  };

  const handleSubmit = async () => {

    console.log('Dropdown Value:', selectedValue, username);
    console.log('Input Values:', inputValues);

    if (selectedValue && username && inputValues.length > 0) {
      try {
        const dataToSave = {};

        inputValues.forEach((value, index) => {
          dataToSave[`${index + 1}st`] = value;
        });

        // Saving the data to Firestore
              const suss =   await firestore()
                        .collection('staffTimeTable')
                        .doc(username)
                        .collection(selectedValue)
                        .add(dataToSave);

        console.log('Data added to Firestore!');
        setSelectedValue('');
        setInputValues('');
        if(suss){
            setModalVisible(true);
        }
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={{ flexGrow: 1 }}
      scrollEnabled
    >
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={selectedValue}
          style={styles.dropdown}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Select an option" value="" />
          <Picker.Item label="Monday" value="Mon" />
          <Picker.Item label="Tuesday" value="Tues" />
          <Picker.Item label="Wednesday" value="Wed" />
          <Picker.Item label="Thursday" value="Thus" />
          <Picker.Item label="Friday" value="Fri" />
        </Picker>
      </View>

      {buttonLabels.map((label, index) => (
        <View key={index} style={styles.row}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{label}</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Enter text"
            value={inputValues[index]}
            onChangeText={(text) => handleInputChange(text, index)}
          />
        </View>
      ))}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
         onRequestClose={() => {setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
             <View style={styles.modalView}>
                  <Text style={styles.modalText}>Data Stored successfully</Text>
                   <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>OK</Text>
                    </Pressable>
             </View>
        </View>
      </Modal>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4a261',
  },
  dropdownContainer: {
    marginBottom: 16,
    backgroundColor: '#e76f51',
    borderWidth: 2,
    borderColor: '#e76f51',
    borderRadius: 4,
  },
  dropdown: {
    height: 50,
    width: '100%',
    color: '#fff',
  },
   modalText: {
    marginBottom: 15,
    textAlign: 'center',
    backgroundColor:''
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
   textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#e76f51',
    padding: 16,
    width: '45%',
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    width: '45%',
    borderColor: '#e76f51',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 8,
    backgroundColor: '#fff',
  },
  submitButton: {
    marginTop: 16,
    backgroundColor: '#e76f51',
    padding: 16,
    alignItems: 'center',
    borderRadius: 4,
    marginBottom:20,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    height:150,
    width:250,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
},
});
