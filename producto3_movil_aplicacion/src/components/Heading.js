import * as React from 'react';
import { Text, StyleSheet } from 'react-native';

export function Heading({content, style, props}) {
  return <Text {...props} style={[style, styles.text]}>{content}</Text>
}

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
    textAlign: 'center',
  },

});
