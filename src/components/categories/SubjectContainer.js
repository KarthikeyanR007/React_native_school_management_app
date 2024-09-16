/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function SubjectContainer(subject) {

  return (
    <View style={styles.subContainer}>
      <Text style={styles.subject}>{subject.subject}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    subContainer:{
        height:70,
        width:350,
        textAlign:'center',
        borderRadius:10,
        marginBottom:20,
        backgroundColor:'#b3cde0',
        justifyContent:'center',
    },
    subject:{
        textAlign:'center',
        fontSize:25,
        color:'black',
        fontWeight:'bold',
    },
});
