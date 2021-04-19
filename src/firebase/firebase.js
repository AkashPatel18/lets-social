import firebase from 'firebase';

var firebaseConfig = {
    ///add key
  };


const firebaseApp = firebase.initializeApp(firebaseConfig)

//firestore is a database ,,, which include for db
const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()
const provider = new firebase.auth.GoogleAuthProvider()


export  { db, auth , storage , provider }
