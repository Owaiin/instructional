// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLJCpDMBBCtPTuGRUYnAnvOyxBxd3Maak",
  authDomain: "instructional-52d64.firebaseapp.com",
  projectId: "instructional-52d64",
  storageBucket: "instructional-52d64.appspot.com",
  messagingSenderId: "241565879935",
  appId: "1:241565879935:web:3772bf057140bb5817f94a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
