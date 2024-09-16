/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  PanResponder,
  Animated,
  Modal,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function StaffContainer(props) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [position] = useState(new Animated.Value(0));

  const handleConsole = () => {
    console.log('helooo');
  };

  const handleDeleteUser = async (id) => {
    console.log(`Attempting to delete document with ID: ${id}`);
    try {
      await firestore().collection('staffInfo').doc(id).delete();
      console.log('Document successfully deleted!');
      setModalVisible(false);
    } catch (e) {
      console.error('Error deleting document: ', e);
    }
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [null, { dx: position }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dx < -100) {
        setModalVisible(true);
      } else if (gestureState.dx > 100) {
        console.log('swiped right');
      }
      Animated.spring(position, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    },
  });

  return (
    <>
      <Animated.View
        style={[styles.container, { transform: [{ translateX: position }] }]}
        {...panResponder.panHandlers}
      >
        <Image
          source={require('../assets/dftimg.png')}
          style={styles.defaultImg}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{props.name}</Text>
          <Text style={styles.regText}>{props.regNo}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={handleConsole} style={styles.touchableOpacity}>
          <Image style={styles.dropContainer} source={require('../assets/add.png')} />
          </TouchableOpacity>
        </View>
      </Animated.View>
      {/* <Button title='button' onPress={handleConsole}/> */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{color:'black'}}>Are you sure you want to delete this item?</Text>
            <View style={styles.buttonContainer}>
              {/* <Button title="Cancel" onPress={() => setModalVisible(false)} /> */}
              <TouchableOpacity
                style={styles.blurButton}
                onPress={()=>setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.redButton}
                onPress={() => {handleDeleteUser(props.itm_id);}}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 80,
    width: '100%',
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    backgroundColor: '#e67e22',
  },
  defaultImg: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  nameText: {
    fontSize: 25,
    fontWeight: '600',
    color: 'black',
  },
  touchableOpacity: {
    zIndex: 10, // Ensure it's on top of other components
  },
  regText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  nameContainer: {
    marginLeft: 25,
    flex: 1,
  },
  dropContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 30,
    width: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
 redButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  blurButton:{
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
