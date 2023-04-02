import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCo1tC4q20kJr76C8gkAxWAEtkO_LZLhdE",
  authDomain: "portfolio-app-64d4d.firebaseapp.com",
  projectId: "portfolio-app-64d4d",
  storageBucket: "portfolio-app-64d4d.appspot.com",
  messagingSenderId: "927076871963",
  appId: "1:927076871963:web:a69838ee94b5042f2fadbe"
}


// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectStorage, timestamp }