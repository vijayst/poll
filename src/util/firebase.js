import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "pollsy.firebaseapp.com",
    databaseURL: "https://pollsy.firebaseio.com",
    projectId: "pollsy",
    storageBucket: "pollsy.appspot.com",
    messagingSenderId: "502515687106"
};

firebase.initializeApp(config);
firebase.firestore();
firebase.storage();

export default firebase;