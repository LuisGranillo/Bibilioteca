import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {Heading} from '../components/Heading';
import {Input} from '../components/Input';
import {Button} from '../components/Button';
import {TextButton} from '../components/TextButton';
import {IconButton} from '../components/IconButton';
import {AuthContext} from  '../contexts/AuthContext';
import firebase from '../database/firebase';


export function NuevoLibro({navigation}) {
  const { nuevo} = React.useContext( AuthContext );
  
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

  return (
    <View style={styles.container}>
      <IconButton name="arrow-back-circle-outline" size={36} color={'red'} style={styles.icon} onPress={()=>{
        navigation.pop();
      }} />
      <Heading content='Agregar libro' style={styles.heading} />
         
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
 <TextButton style={{marginBottom:10}} text='Tomar Foto del libro' onPress={() => {
        navigation.navigate('Foto');
      }} />
      <Button text='Agregar libro' style={styles.button} onPress={async() => {
        try{
     const resultado= await nuevo(year,edit, namepublic, precio, type);
     navigation.navigate('Welcome');
        }
        catch(e){
       alert(e);
        }
      }}  /> 
    </View>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    alignItems:'center',
    backgroundColor:'yellow'
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
