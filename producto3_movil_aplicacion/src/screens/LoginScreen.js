import * as React from 'react';
import { Text, View, StyleSheet,ImageBackground } from 'react-native';
import {Heading} from '../components/Heading';
import {Input} from '../components/Input';
import {Button} from '../components/Button';
import {TextButton} from '../components/TextButton';
import {AuthContext} from '../contexts/AuthContext';
 
export function LoginScreen({navigation}) {

  const { login } = React.useContext( AuthContext );
  const [email, setMail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    
    <View style={styles.container}>
     <ImageBackground source={require('./libros.jpg')} style={styles.imagen}/>
      <Heading content='Bienvenido a la biblioteca' style={styles.heading} />
       
      
     
      <TextButton style={{marginBottom:50}} text='Libros disponibles' onPress={() => {
        navigation.navigate('Welcome');
      }} />
        
       <TextButton style={{marginBottom:50}} text='Tomar Foto del libro' onPress={() => {
        navigation.navigate('Foto');
      }} />
    </View>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 4,
    alignItems: 'center',
    backgroundColor:'#85C1E9',
  },
  imagen:{
 flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
   
    marginTop:40,
    marginEnd:1,
    width : 300,
    height :300,
    marginLeft:10,
    marginRight:10



  },
  input: {
    marginVertical: 5
  },
  button: {
    marginVertical: 20
  },
  heading:{
    marginBottom: 100
  }
});