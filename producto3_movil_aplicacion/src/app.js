import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {AuthStackNavigator} from './navigators/AuthStackNavigator';
import firebase from './database/firebase';
import {AuthContext} from './contexts/AuthContext';
import usersData from '../assets/users.json';

const RootStack = createStackNavigator();

export default function (){

  const auth = React.useMemo( () => ({
    login: async(email, pass) => {
      // alert('Login: ' + user +', '+ pass)
      let authorized = false;
      let exist = false;
      let mensaje = '';
      for(let i in firebase.Usuarios){
        if(firebase.Usuarios[i].email == email){
          exist = true;
          if(firebase.Usuarios[i].contraseña == pass ){
            authorized = true;
          }
          break;
        }
      }
       
      if(exist==true){
        if(authorized==true){
          authorized = true;
        }
        else {
          throw Error('Contraseña incorrecta');
        }
      }
      else{
        throw Error('El usuario no existe');
      }
      return authorized;
    },
    register: async (name,email, password) => {
     // alert('Registrado: ' +name+' , '+ email + ', ' + password );
      await firebase.db.collection('Usuarios').add({
        Nombre: name,
        email: email,
        contraseña: password
      });
      alert('Usuario agregado');
    },

     nuevo: async (year,edit,namepublic,precio,type) => {
     // alert('Registrado: ' +name+' , '+ email + ', ' + password );
      await firebase.db.collection('Libros').add({
         
        Año: year,
         Editorial: edit,
      NombrePublic: namepublic,
      Precio: precio,
       Tipo: type
      });
      alert('Libro agregado');
    },
  }),
    [],
  );


  return(
    <AuthContext.Provider value={auth} >
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <RootStack.Screen name={'AuthStack'} component={AuthStackNavigator} />
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
