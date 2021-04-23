import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export function TextButton({style, text, onPress}) {
  return(
    <TouchableOpacity style={[style, styles.button]} onPress={onPress}>
      <Text style={styles.text} >{text.toUpperCase()}</Text>
    </TouchableOpacity>
  ); 
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    padding: 10,
    borderRadius: 10,
    borderColor: 'red',
    borderWidth: 1
  },
  text:{
    textAlign: 'center',
    fontSize: 14,
    color: 'red'
  }
});
