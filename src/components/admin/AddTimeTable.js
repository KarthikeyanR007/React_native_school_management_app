/* eslint-disable prettier/prettier */
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';

export default function AddTimeTable({navigation}) {

    const onAdd1std = (std) => {
        console.log(std);
        navigation.navigate('AddFirstTime', { classId : std });
    };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f0b27a', alignItems: 'center' }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <TouchableOpacity onPress={()=>onAdd1std(1)} style={styles.classNameCont}>
          <Text style={styles.stdText}>Ⅰ standard</Text>
          <View style={styles.AddBox}>
            <Image style={styles.addIcon} source={require('../assets/addIcon.png')} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>onAdd1std(2)} style={styles.classNameCont}>
          <Text style={styles.stdText}>Ⅱ standard</Text>
          <View style={styles.AddBox}>
            <Image style={styles.addIcon} source={require('../assets/addIcon.png')} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>onAdd1std(3)} style={styles.classNameCont}>
          <Text style={styles.stdText}>Ⅲ standard</Text>
          <View style={styles.AddBox}>
            <Image style={styles.addIcon} source={require('../assets/addIcon.png')} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>onAdd1std(4)} style={styles.classNameCont}>
          <Text style={styles.stdText}>Ⅳ standard</Text>
          <View style={styles.AddBox}>
            <Image style={styles.addIcon} source={require('../assets/addIcon.png')} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>onAdd1std(5)} style={styles.classNameCont}>
          <Text style={styles.stdText}>Ⅴ standard</Text>
          <View style={styles.AddBox}>
            <Image style={styles.addIcon} source={require('../assets/addIcon.png')} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>onAdd1std(6)} style={styles.classNameCont}>
          <Text style={styles.stdText}>Ⅵ standard</Text>
          <View style={styles.AddBox}>
            <Image style={styles.addIcon} source={require('../assets/addIcon.png')} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>onAdd1std(7)} style={styles.classNameCont}>
          <Text style={styles.stdText}>Ⅶ standard</Text>
          <View style={styles.AddBox}>
            <Image style={styles.addIcon} source={require('../assets/addIcon.png')} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>onAdd1std(8)} style={styles.classNameCont}>
          <Text style={styles.stdText}>Ⅷ standard</Text>
          <View style={styles.AddBox}>
            <Image style={styles.addIcon} source={require('../assets/addIcon.png')} />
          </View>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    width:'100%',
  },
  classNameCont: {
    height: 65,
    width: '90%',
    borderRadius: 5,
    marginTop: 35,
    backgroundColor: '#e67e22',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom:10,
  },
  stdText: {
    fontSize: 25,
    fontWeight: '800',
    textAlignVertical: 'center',
    color: '#626567',
  },
  AddBox: {
    height: 40,
    width: 50,
    marginLeft: 80,
  },
  addIcon: {
    height: 40,
    width: 50,
  },
});
