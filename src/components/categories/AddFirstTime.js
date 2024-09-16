/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function AddFirstTime({ route }) {
  const { classId } = route.params;
  const [selectedValue, setSelectedValue] = useState("");
  const [inputValues, setInputValues] = useState(Array(6).fill(""));

  const buttonLabels = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th'];

  const handleInputChange = (text, index) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = text;
    setInputValues(newInputValues);
  };

  const handleSubmit = async () => {
    let classLabel = "";

    switch (classId) {
      case 1:
        classLabel = "1 std";
        break;
      case 2:
        classLabel = "2nd";
        break;
      case 3:
        classLabel = "3rd";
        break;
      case 4:
        classLabel = "4th";
        break;
      case 5:
        classLabel = "5th";
        break;
      default:
        classLabel = "Unknown";
    }

    console.log('Dropdown Value:', selectedValue, classId);
    console.log('Input Values:', inputValues);

    if (selectedValue && classId && inputValues.length > 0) {
      try {
        const dataToSave = {};

        inputValues.forEach((value, index) => {
          dataToSave[`${index + 1}st`] = value; // Creates fields like "1st", "2nd", etc.
        });

        // Saving the data to Firestore
        await firestore()
          .collection('timeTable')
          .doc(classLabel) // Use classLabel as the document ID
          .collection(selectedValue) // Use the selected day as a sub-collection
          .add(dataToSave); // Adds the data to Firestore

        console.log('Data added to Firestore!');
        setSelectedValue('');
        setInputValues('');
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
});
