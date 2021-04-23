import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';

export function Input({style, ...props}) {
  return <TextInput {...props} style={[style, styles.input]} />
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'cyan',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    textAlign:'center'
  }

});
