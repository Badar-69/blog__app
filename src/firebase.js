// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLNng41qK5S6B_St3bHqFWfTrq2-4CWHc",
  authDomain: "testpro-008.firebaseapp.com",
  databaseURL: "https://testpro-008-default-rtdb.firebaseio.com",
  projectId: "testpro-008",
  storageBucket: "testpro-008.appspot.com",
  messagingSenderId: "204502448872",
  appId: "1:204502448872:web:f4452c4fe569418ded675d",
  measurementId: "G-N2WTYBBFCS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//Firestore connection
const db = getFirestore(app);

export { db };