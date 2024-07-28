// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC31O-YWZQIJSlZtN1hZ52_sKVaMbjP2CE",
  authDomain: "braude-web-project.firebaseapp.com",
  databaseURL: "https://braude-web-project-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "braude-web-project",
  storageBucket: "braude-web-project.appspot.com",
  messagingSenderId: "581612367191",
  appId: "1:581612367191:web:da8f65e3377788e64aa212",
  measurementId: "G-R9MTKB49SG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)