import firebase from "firebase/app";
import "firebase/firebase-auth";
import 'firebase/firestore';
import 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyAxPx496ANbPS8GVDI7efWsy96bQmNDllU",
  authDomain: "sistema-chamados-492e4.firebaseapp.com",
  projectId: "sistema-chamados-492e4",
  storageBucket: "sistema-chamados-492e4.appspot.com",
  messagingSenderId: "920155823790",
  appId: "1:920155823790:web:605825aee41d1cb054973f",
  measurementId: "G-2BXLTG5YM0"
};

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;