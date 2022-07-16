
import firebase from "firebase/compat/app";
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCLubwZe8cOTNAI-DuLacMfCFmIGYcEFiA",
    authDomain: "ehab-mazad.firebaseapp.com",
    
    databaseURL: "gs://ehab-mazad.appspot.com",
    projectId: "ehab-mazad",
    storageBucket: "ehab-mazad.appspot.com",
    messagingSenderId: "73646244848",
    appId: "1:73646244848:web:5f8f7071745ca0713ad335",
    measurementId: "G-XQVW9YKJH8"
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app, 'gs://ehab-mazad.appspot.com');

export { storage, firebase  };
