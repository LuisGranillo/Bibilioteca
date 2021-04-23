import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function IconButton({name, size, color, style, onPress}) {
  return(
    <TouchableOpacity style={[style, styles.button]} onPress={onPress}>
      <Ionicons name={name} size={size} color={color} />
    </TouchableOpacity>
  ); 
}

const styles = StyleSheet.create({
  button: {
  },
});
