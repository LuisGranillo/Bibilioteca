import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {LoginScreen} from '../screens/LoginScreen';
import {RegistrationScreen} from '../screens/RegistrationScreen';
import {WelcomeScreen} from '../screens/WelcomeScreen';
import {UserslistScreen} from '../screens/UserslistScreen';
import {UsersDetailScreen} from '../screens/UserDetails';
import {BookDetailsScreen} from '../screens/BooksDetails';
import {NuevoLibro} from '../screens/AgregarLibro';
 import {Foto} from '../screens/TakePhoto';
const AuthStack = createStackNavigator();

export function AuthStackNavigator(){
  return(
      <AuthStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <AuthStack.Screen name={'Login'} component={LoginScreen} />
        <AuthStack.Screen name={'Registration'} component={RegistrationScreen} />        
        <AuthStack.Screen name={'Welcome'} component={WelcomeScreen} />
        <AuthStack.Screen name={'Userslist'} component={UserslistScreen} />
        <AuthStack.Screen name={'Usersdetail'} component={UsersDetailScreen} />
        <AuthStack.Screen name={'Info'} component={BookDetailsScreen} />
   
           <AuthStack.Screen name={'Agregar'} component={NuevoLibro} />
             <AuthStack.Screen name={'Foto'} component={Foto} />
      </AuthStack.Navigator>
  );
}
