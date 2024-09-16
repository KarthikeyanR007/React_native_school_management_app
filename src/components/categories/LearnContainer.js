/* eslint-disable prettier/prettier */
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import React from 'react';

const  LearnContainer = (props) => {

  const BOX_WIDTH = Dimensions.get('window').width / 2 - 30;
  const handlePress = (value) =>{
    console.log(value);
  };
  return (
    <TouchableOpacity onPress={()=>handlePress(props.item)}>
      <View  style={[styles.box,{width:BOX_WIDTH}]}>
        <Text>{props.item}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
     box: {
        height: 80,
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        margin:10,
        borderRadius:10,
    },
});

export default LearnContainer;
