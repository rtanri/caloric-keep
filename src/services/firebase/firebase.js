import { initializeApp } from "firebase/app";

const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
};

let FirebaseApp = null;

export function getFirebaseInstance() {
      if (FirebaseApp) {
            return FirebaseApp;
      }
      FirebaseApp = initializeApp(firebaseConfig);
      return FirebaseApp;
}

