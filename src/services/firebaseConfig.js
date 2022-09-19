import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAxPx496ANbPS8GVDI7efWsy96bQmNDllU",
  authDomain: "sistema-chamados-492e4.firebaseapp.com",
  projectId: "sistema-chamados-492e4",
  storageBucket: "sistema-chamados-492e4.appspot.com",
  messagingSenderId: "920155823790",
  appId: "1:920155823790:web:605825aee41d1cb054973f",
  measurementId: "G-2BXLTG5YM0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;