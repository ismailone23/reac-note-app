import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA3l8qrk_W_V_A4Xqo3sdEUXz4bovGHX84",
    authDomain: "stuf-f9656.firebaseapp.com",
    projectId: "stuf-f9656",
    storageBucket: "stuf-f9656.appspot.com",
    messagingSenderId: "240392773535",
    appId: "1:240392773535:web:76737184110453cd9ae7aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { app, db }