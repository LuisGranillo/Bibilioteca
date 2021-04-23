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



export function BookDetailsScreen({route,navigation}) 
{
  const { bookdetails } = React.useContext( AuthContext );
      const id = route.params.userId;
      console.log(id);
      const [year, setYear] = React.useState('');
      const [edit, setEdit] = React.useState('');
      const [namepublic, setNamePublic] = React.useState('');
        const [precio, setPrecio] = React.useState('');
      const [type, settype] = React.useState('');
      const getUsersById = async(id)=>{
      const dbRef = firebase.db.collection('Libros').doc(id);
      const doc = await dbRef.get();
      console.log(doc.data());
      const user=doc.data();
      setYear(user.Año);
      setEdit(user.Editorial),
      setNamePublic(user.NombrePublic);
      setPrecio(user.Precio);
      settype(user.Tipo);
      }
      useEffect(()=>{
      getUsersById(id);
},[])
    const DeleteBook =async(idUser)=>
{
      const dbRef=firebase.db.collection('Libros').doc(idUser);
      await dbRef.delete();
    navigation.navigate('Welcome');
}

const  UpateBook =async(idUser)=>
    {
    const dbRef=firebase.db.collection('Libros').doc(idUser);
    await dbRef.set({
    Año:year,
    Editorial:edit,
    NombrePublic:namepublic,
    Precio: precio,
    Tipo: type

  });
  navigation.navigate('Welcome');
}
  return (
    <View style={styles.container}>
     
      <Heading content='Informacion de los libros' style={styles.heading} />
      <IconButton name="arrow-back-circle-outline" size={36} color={'red'} style={styles.icon} onPress={()=>{
        navigation.pop();
      }} />

       <Input 
        style={styles.input} 
        placeholder={'Año'} 
        value = {year}
        onChangeText = {setYear}
      />

      <Input 
        style={styles.input} 
        placeholder={'Editorial'} 
   
       value = {edit}
        onChangeText = {setEdit}
      />

      <Input 
        style={styles.input} 
        placeholder={'Nombre'} 
        //secureTextEntry
        value = {namepublic}
        onChangeText = {setNamePublic}
      />

       <Input 
        style={styles.input} 
        placeholder={'Precio'} 
   
       value = {precio}
        onChangeText = {setPrecio}
      />
       <Input 
        style={styles.input} 
        placeholder={'Tipo'} 
   
       value = {type}
        onChangeText = {settype}
      />

      <Button text='Actualizar' style={styles.button}  onPress={()=>{
      UpateBook(id);
   
    }}/> 
       <TextButton text='Añadir nuevo libro' style={styles.separar} onPress={() => {
        navigation.navigate('Agregar');
      }} />
    <TextButton text='Eliminar' onPress={()=>{
      DeleteBook(id);
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
  separar:{
    marginBottom:20
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