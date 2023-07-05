import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAmRKIw4wQHQDe_SWHNcyAd1uMdDgi2ayk",
  authDomain: "vips-authentication-app.firebaseapp.com",
  projectId: "vips-authentication-app",
  storageBucket: "vips-authentication-app.appspot.com",
  messagingSenderId: "993188102943",
  appId: "1:993188102943:web:5712d84a96fac9eb6a262a"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const db = firebaseApp.firestore();

export default db;