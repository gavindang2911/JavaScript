import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC7ZNF1iNQmr8hs2AfqSkw0apJNNBCDDpk",
    authDomain: "todo-react-33298.firebaseapp.com",
    databaseURL: "https://todo-react-33298.firebaseio.com",
    projectId: "todo-react-33298",
    storageBucket: "todo-react-33298.appspot.com",
    messagingSenderId: "1066059402275",
    appId: "1:1066059402275:web:97fce6de4d3e81ab1df596",
    measurementId: "G-BJEH5WE7YZ"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export {db}