import firebase from 'firebase';
import 'firebase/storage';

var firebaseConfig = {
  /* 
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId */

    apiKey: "AIzaSyBdfEgLOKJG4CSdXTGUq4mxjbP0zCOl5iE",
    authDomain: "projectmernswift.firebaseapp.com",
    databaseURL: "https://projectmernswift.firebaseio.com",
    projectId: "projectmernswift",
    storageBucket: "projectmernswift.appspot.com",
    messagingSenderId: "456748325362",
    appId: "1:456748325362:web:8adcbe49d8858f58f7b36b",
    measurementId: "G-K5MPV8MBSY"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();


  export { firebase, storage as default};