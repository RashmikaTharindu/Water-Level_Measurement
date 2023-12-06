// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAK2fkt8-NpheZTzftu4mnNikqqPDeYd9k",
    authDomain: "water-level-measurement-63b38.firebaseapp.com",
    databaseURL: "https://water-level-measurement-63b38-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "water-level-measurement-63b38",
    storageBucket: "water-level-measurement-63b38.appspot.com",
    messagingSenderId: "156711686240",
    appId: "1:156711686240:web:dc82407f1dae410eeb3305",
    measurementId: "G-TRQH9JZBWG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);
