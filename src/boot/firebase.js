import * as firebase from "firebase/app"
import { initializeApp } from 'firebase/app';
import "firebase/auth"
import "firebase/database"
require('firebase/auth');

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAevFzw-9CICiisA9uUW-TAzfubMfozIcE",
  authDomain: "quasarchat-2b77b.firebaseapp.com",
  projectId: "quasarchat-2b77b",
  storageBucket: "quasarchat-2b77b.appspot.com",
  messagingSenderId: "666459091448",
  appId: "1:666459091448:web:0f3d031cdf6402e068e60d"
};

initializeApp(firebaseConfig)
// let firebaseAuth = firebase.auth()
