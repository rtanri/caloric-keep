import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBVy5O0ntBRU9X6n8ev7fDlhrh1WEKfsAk",
  authDomain: "caloric-keep.firebaseapp.com",
  projectId: "caloric-keep",
  storageBucket: "caloric-keep.appspot.com",
  messagingSenderId: "230941769316",
  appId: "1:230941769316:web:dd7240c4db8bdbc83ba971"
};

export const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore();

// let FirebaseApp = null;

// export function getFirebaseInstance() {

//   if (FirebaseApp) {
//     return FirebaseApp;
//   }
//   FirebaseApp = initializeApp(firebaseConfig);
//   return FirebaseApp;
// }

// var db = FirebaseApp.firestore();
// const db = getFirestore();
