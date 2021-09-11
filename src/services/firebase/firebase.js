import { initializeApp } from 'firebase/app';

const firebaseConfig = {
      apiKey: "AIzaSyBVy5O0ntBRU9X6n8ev7fDlhrh1WEKfsAk",
      authDomain: "caloric-keep.firebaseapp.com",
      projectId: "caloric-keep",
      storageBucket: "caloric-keep.appspot.com",
      messagingSenderId: "230941769316",
      appId: "1:230941769316:web:dd7240c4db8bdbc83ba971"
};

let FirebaseApp = null;

export function getFirebaseInstance() {
      if (FirebaseApp) {
            return FirebaseApp;
      }
      FirebaseApp = initializeApp(firebaseConfig);
      return FirebaseApp;
}

