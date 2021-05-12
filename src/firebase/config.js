import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyA-flfB3jxXG_vuSfkxoycGXm2OOXl7s5E",
  authDomain: "music-playlist-1cbb2.firebaseapp.com",
  projectId: "music-playlist-1cbb2",
  storageBucket: "music-playlist-1cbb2.appspot.com",
  messagingSenderId: "614071689898",
  appId: "1:614071689898:web:9b882e3574df044bc4a6d3"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }