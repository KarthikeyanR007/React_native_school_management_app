/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Checkbox } from 'react-native-paper';

const AttendanceContainer = ({ Reg_no, name, isSelected, onSelect }) => {
  const [selected, setSelected] = useState(isSelected);

  useEffect(() => {
    setSelected(isSelected);
  }, [isSelected]);

  return (
    <View style={{ alignItems: 'center' }}>
      <View style={styles.mainBox}>
        <View style={styles.textContainer}>
          <Text style={styles.reg_no}>{Reg_no}</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={selected ? 'checked' : 'unchecked'}
            onPress={() => {
              setSelected(!selected);
              onSelect(Reg_no, !selected); // Notify parent about the change
            }}
            color="#17202a"
            uncheckedColor="gray"
            size={30}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBox: {
    flexDirection: 'row',
    height: 80,
    width: '95%',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
    backgroundColor: '#2874a6',
  },
  reg_no: {
    color: 'black',
    fontSize: 25,
    fontWeight: '600',
  },
  name: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  checkboxContainer: {
    justifyContent: 'center',
  },
});

export default AttendanceContainer;
