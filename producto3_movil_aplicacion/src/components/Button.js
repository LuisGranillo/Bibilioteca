import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export function Button({style, text, onPress}) {
  return(
    <TouchableOpacity style={[style, styles.button]} onPress={onPress}>
      <Text style={styles.text} >{text.toUpperCase()}</Text>
    </TouchableOpacity>
  ); 
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'red',
    width: '50%',
    height: '10%',
    padding: 10,
    borderRadius: 10,
      borderColor: 'red',
  },
  text:{
    textAlign: 'center',
    fontSize: 18,
   
    
  }
});
