import firebase from 'firebase';
import 'firebase/firestore';
 // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCERYSVhW7668bGnAjUXPkVmAWdLT8t8c4",
    authDomain: "producto2-34d73.firebaseapp.com",
    projectId: "producto2-34d73",
    storageBucket: "producto2-34d73.appspot.com",
    messagingSenderId: "1051345943014",
    appId: "1:1051345943014:web:d7d6dc224405f9cf0dbe27"
  };



  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 const db = firebase.firestore();
  export default {
 firebase,
 db,
  }