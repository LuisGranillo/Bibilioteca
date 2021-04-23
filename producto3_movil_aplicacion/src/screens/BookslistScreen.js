import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {Heading} from '../components/Heading';
import {TextButton} from '../components/TextButton';
import {IconButton} from '../components/IconButton';
import { ListItem, Avatar } from 'react-native-elements';
import {AuthContext} from '../contexts/AuthContext';

import Firebase from '../database/firebase';

export function BookListScreen({navigation}) {
const { booklist} = React.useContext( AuthContext );
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    Firebase.db.collection('Libros').onSnapshot(querySnapshot =>{
      const usuarios = [];      
      querySnapshot.docs.forEach(doc =>{
        //console.log(doc.data());
        const {Nombre,contraseña, email} = doc.data();
        usuarios.push({
          id: doc.id,
          Nombre,
          contraseña,
          email,
   
        });
      });

      setUsers(usuarios);

    })
  }, []);

  return (
    <View style={styles.container}>
      <IconButton name="arrow-back-circle-outline" size={36} color={'red'} style={styles.icon} onPress={()=>{
        navigation.pop();
      }} />
      <Heading content='Lista de usuarios' style={styles.heading} />
      {
        users.map(user =>{
          return(
            <ListItem key={user.id}
            bottomDivider
            onPress = {()=>{
             navigation.navigate('Usersdetail',{
               userId: user.id,
             });
            }}
            >
      <Avatar 
                  source={{uri: ' https://files.softicons.com/download/culture-icons/popular-anime-icons-by-iconspedia/ico/Dragonball-Goku.ico'}}
                 
                />
              <ListItem.Content>
                <ListItem.Title>{user.Nombre}</ListItem.Title>
                <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          );
        })
      }
    </View>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    backgroundColor: '#7AEF9C'
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
