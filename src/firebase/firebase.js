import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAbaKLU4-S_zImzRgLZiCL8yvpoCDwG3u0",
    authDomain: "insta2-c1959.firebaseapp.com",
    projectId: "insta2-c1959",
    storageBucket: "insta2-c1959.appspot.com",
    messagingSenderId: "803612702424",
    appId: "1:803612702424:web:61c1c99be42b2ebde189ad"
  };


const firebaseApp = firebase.initializeApp(firebaseConfig)

//firestore is a database ,,, which include for db
const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()
const provider = new firebase.auth.GoogleAuthProvider()


export  { db, auth , storage , provider }