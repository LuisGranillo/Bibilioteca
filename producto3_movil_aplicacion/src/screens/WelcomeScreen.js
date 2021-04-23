import { Text, View, StyleSheet } from 'react-native';
import {Heading} from '../components/Heading';
import {TextButton} from '../components/TextButton';
 import * as React from 'react';
import { useState, useEffect } from 'react';
import {IconButton} from '../components/IconButton';
import { ListItem, Avatar } from 'react-native-elements';
import {AuthContext} from '../contexts/AuthContext';
import Firebase from '../database/firebase';

export function WelcomeScreen({navigation}) {
   const [books, setBooks] = useState([]);

   useEffect(()=>{
    Firebase.db.collection('Libros').onSnapshot(querySnapshot =>{
      const libros = [];      
      querySnapshot.docs.forEach(doc =>{
        //console.log(doc.data());
        const {Año,Editorial,NombrePublic,Precio,Tipo} = doc.data();
        libros.push({
          id: doc.id,
          Año,
          Editorial,
          NombrePublic,
          Precio,
          Tipo,
        
        });
      });

      setBooks(libros);

    })
  }, []);
  return (
    <View style={styles.container}>
           <IconButton name="arrow-back-circle-outline" size={36} color={'red'} style={styles.icon} onPress={()=>{
        navigation.pop();
      }} />
 
      <Heading content='Lista de nuestros libros' style={styles.heading} />
      {
        books.map(book =>{
          return(
            <ListItem key={book.id}
            bottomDivider
            onPress = {()=>{
             navigation.navigate('Info',{
               userId: book.id,
             });
            }}
            >
              <Avatar 
                  source={{uri: ' https://files.softicons.com/download/culture-icons/popular-anime-icons-by-iconspedia/ico/Dragonball-Goku.ico'}}
                  rounded
                />
              <ListItem.Content>
                <ListItem.Title>{book.NombrePublic}</ListItem.Title>
                <ListItem.Subtitle>{book.Precio}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          );
        })
      }
     
     
     
     
     
     
     
     
     
      <TextButton text='Salir' style={styles.separar} onPress={() => {
        navigation.navigate('Login');
      }} />



       <TextButton text='Añadir nuevo libro' style={styles.separar} onPress={() => {
        navigation.navigate('Agregar');
      }} />
    </View>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    backgroundColor:'#F9E79F'

  },
  separar:{
    marginBottom:30
  },
  heading:{
    marginBottom: 20
  }
});