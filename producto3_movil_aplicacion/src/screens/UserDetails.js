import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {Heading} from '../components/Heading';
import {Input} from '../components/Input';
import {Button} from '../components/Button';
import {TextButton} from '../components/TextButton';
import {IconButton} from '../components/IconButton';
import firebase from '../database/firebase';
import {AuthContext} from  '../contexts/AuthContext';
import {useEffect} from 'react';


export function UsersDetailScreen({route,navigation}) {
const id = route.params.userId;
console.log(id);

const [email, setMail] = React.useState('');
const [password, setPassword] = React.useState('');
const [name, setName] = React.useState('');
const getUsersById = async(id)=>{
const dbRef = firebase.db.collection('Usuarios').doc(id);
const doc = await dbRef.get();
console.log(doc.data());
const user=doc.data();
setName(user.Nombre);
setMail(user.email),
setPassword(user.contraseña);
}
useEffect(()=>{
getUsersById(id);
},[])
const DeleteUser =async(idUser)=>{
const dbRef=firebase.db.collection('Usuarios').doc(idUser);
await dbRef.delete();
alert(" Usuario  eliminado");
navigation.navigate('Userslist');
}
const  UpateUser =async(idUser)=>{
const dbRef=firebase.db.collection('Usuarios').doc(idUser);
await dbRef.set({
Nombre:name,
email:email,
contraseña:password
});
alert(" Usuario actualizado");
navigation.navigate('Userslist');
}
  return (
    <View style={styles.container}>
      <IconButton name="arrow-back-circle-outline" size={36} color={'red'} style={styles.icon} onPress={()=>{
        navigation.pop();
      }} />
      <Heading content='Informacion del usuario' style={styles.heading} />
       <Input 
        style={styles.input} 
        placeholder={'Nombre'} 
        value = {name}
        onChangeText = {setName}
      />
      <Input 
        style={styles.input} 
        placeholder={'Correo electrónico'} 
        keyboardType={'email-address'}
       value = {email}
        onChangeText = {setMail}
      />
      <Input 
        style={styles.input} 
        placeholder={'Contraseña'} 
        secureTextEntry
        value = {password}
        onChangeText = {setPassword}
      />
      <Button text='Actualizar' style={styles.button}  onPress={()=>{
      UpateUser(id);
    }}/>  
    <TextButton text='Eliminar' onPress={()=>{
      DeleteUser(id);
    }}/> 
    </View>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    alignItems:'center'
  },
  input: {
    marginVertical: 10
  },
  button: {
    marginVertical: 20
  },
  heading:{
    marginBottom: 20
  },
  icon:{
    position: 'absolute',
    top: 30,
    right: 20
  }
});
