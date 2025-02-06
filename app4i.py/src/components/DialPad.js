import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DialButton = ({ number, letters, onPress }) => (
  <TouchableOpacity style={styles.dialButton} onPress={() => onPress(number)}>
    <Text style={styles.numberText}>{number}</Text>
    {letters && <Text style={styles.letterText}>{letters}</Text>}
  </TouchableOpacity>
);

const DialPad = ({ onNumberPress, onCallPress, onDeletePress }) => {
  const dialPadNumbers = [
    { number: '1', letters: '' },
    { number: '2', letters: 'ABC' },
    { number: '3', letters: 'DEF' },
    { number: '4', letters: 'GHI' },
    { number: '5', letters: 'JKL' },
    { number: '6', letters: 'MNO' },
    { number: '7', letters: 'PQRS' },
    { number: '8', letters: 'TUV' },
    { number: '9', letters: 'WXYZ' },
    { number: '*', letters: '' },
    { number: '0', letters: '+' },
    { number: '#', letters: '' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.dialPadGrid}>
        {dialPadNumbers.map((item) => (
          <DialButton
            key={item.number}
            number={item.number}
            letters={item.letters}
            onPress={onNumberPress}
          />
        ))}
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.callButton} onPress={onCallPress}>
          <Icon name="call" size={32} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={onDeletePress}>
          <Icon name="backspace" size={24} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  dialPadGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dialButton: {
    width: '30%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  numberText: {
    fontSize: 32,
    fontWeight: '400',
    color: '#212121',
  },
  letterText: {
    fontSize: 12,
    color: '#757575',
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  callButton: {
    backgroundColor: '#4CAF50',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  deleteButton: {
    padding: 12,
  },
});

export default DialPad; 