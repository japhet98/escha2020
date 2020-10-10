import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

// Replace this with your own config details
var config = {
    apiKey: "AIzaSyC7z5fQvojG_HHBgBnGCH7C1X2VX_EmYTM",
    authDomain: "eschaumat.firebaseapp.com",
    databaseURL: "https://eschaumat.firebaseio.com",
    projectId: "eschaumat",
    storageBucket: "eschaumat.appspot.com",
    messagingSenderId: "950118494919",
    appId: "1:950118494919:web:3d17bc52a7b6a3e49d04e2",
    measurementId: "G-Z10MB2D7NF",
};
firebase.initializeApp(config);
// const storage = firebase.storage();
firebase.firestore().settings({});

export { firebase as default };