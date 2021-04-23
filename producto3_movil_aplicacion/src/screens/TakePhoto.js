import * as React from 'react';
import { Text, View, StyleSheet,SafeAreaView, TouchableOpacity , Modal, Image} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import Constants from 'expo-constants';
import { AntDesign } from '@expo/vector-icons';
import {useState, useEffect, useRef} from 'react';
// You can import from local files
import {Camera} from 'expo-camera';
// or any pure javascript modules available in npm
import { Ionicons } from '@expo/vector-icons';
import firebaseConfig from '../database/firebase';
import * as  firebase from 'firebase';


 
  
export  function Foto() {
  const [type, setType ] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);
  const camRef= useRef();
  const [photo, setPhoto] = useState(null);
  const [open, setOpen] = useState(null);
   const [fecha, setFecha] = useState(null);
  useEffect( ()=>{
  ( async ()=> {
  const {status}= await  Camera.requestPermissionsAsync();
  setHasPermission (status =='granted');
  })();
  ( async ()=> {
  const {status}= await  Permissions.askAsync(Permissions.CAMERA_ROLL);
  setHasPermission (status =='granted');
  console.log(status);
  })();
    var date = new  Date().getDate();
  var month = new Date().getMonth()+1;
  var year =new Date().getFullYear();
  var hours = new Date().getHours();
  var min= new Date().getMinutes();
  var sec= new Date().getSeconds();
  setFecha(year+month+date+"__"+hours+min+sec);
  },[]);
  if(hasPermission===null){
    return <View/>
  }
  else if(hasPermission==false){
 return <Text>Acceso denegado</Text>
  }
  async function takePicture(){
    if(camRef){
      const data = await camRef.current.takePictureAsync();
      console.log(data);
      setPhoto(data.uri);
      setOpen(true);
    }
  }
   async function savePicture(){
   const asset = await MediaLibrary.createAssetAsync(photo)
   .then(()=>{
alert('Fotografia guardada');
   })
   .catch(error=>{
console.log('err',error);
   }) 
  }
  const uploadPicture =(uri)=>{
    return new Promise( (resolve,reject) =>{
let xhr = new XMLHttpRequest();
xhr.onerror=reject;
xhr.onreadystatechange = ()=>{
  if(xhr.readyState===4){
resolve(xhr.response);
  }
}
xhr.open("GET",uri);
xhr.responseType="blob";
xhr.send();
    })
  }
  return (
    <SafeAreaView style={styles.container}>
    <Camera
    style={{flex: 1}}     
    type={type} 
    ref={camRef} >
    <TouchableOpacity style={[styles.btnApp,{left:20}]} onPress={()=>{
      setType(
     type === Camera.Constants.Type.front 
     ? Camera.Constants.Type.back
     : Camera.Constants.Type.front
      );
    }}>
   <Ionicons name="ios-camera-reverse-sharp" size={24} color="black" />
     </TouchableOpacity> 
     <TouchableOpacity style={[styles.btnApp,{right:20}]} onPress={()=> takePicture() }>
     <Ionicons name="camera" size={30} color="black" />
     </TouchableOpacity>
     {
       photo &&
       <Modal
       animationType ='slide'
       transparent={false}
       visible={open}
       >
       <View style={{flex:1, justifyContent:'center', alignItems:'center',margin:10}}>
        <TouchableOpacity style={[styles.btnApp,{left:20}]} onPress={()=> setOpen(false) }>
       <AntDesign name="close" size={24} color="black" />
      </TouchableOpacity>
         <TouchableOpacity style={[styles.btnApp,{right:20}]} onPress={()=> savePicture() }>
       <Ionicons name="save-outline" size={40} color="black" />
      </TouchableOpacity>
        <TouchableOpacity style={[styles.btnApp,{right:120}]} onPress={()=> {
          uploadPicture(photo)
          .then(resolve=>{
            let ref = firebase
            .storage()
            .ref()
            .child('images/foto_'+fecha);
            ref
            .put(resolve)
            .then(resolve=>{
            alert('Imagen exictosamente subida');
            })
            .catch(error =>{
              alert('error al subir la imagen');
              console.log(error);
            })
          })
        } }>
       <Ionicons name="cloud-upload" size={40} color="black" />
      </TouchableOpacity>
         <Image 
         style={styles.photo}
         source={{uri:photo}}/>
       </View>
      
      </Modal>
     }
    </Camera>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  btnApp: {
position: 'absolute',
backgroundColor:'yellow',
width:80,
justifyContent:'center',
alignItems:'center',
borderRadius:30,
bottom:20,
paddingVertical:5,
  },
  photo:{
    width:'100%',
    height:350
  }
});