/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export default function SubList(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.title}</Text>
      <Text style={styles.text}>{props.marks}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 353,
    borderRadius: 15,
    paddingHorizontal: 10,
    backgroundColor: '#ca6f1e',
    marginTop:10,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
  },
   listContainer: {
    alignItems: 'center',
    padding: 10,
  },
  text:{
    color:'black',
    fontSize:28,
  },
});
