import firebase from "@firebase/app";
import "@firebase/auth";
import "@firebase/database";
import "@firebase/storage";

const config ={
    apiKey: "AIzaSyB7ui5G7Qh0NVnDusmFjMUz2tWgZtL8QHs",
    authDomain: "hey-17af7.firebaseapp.com",
    databaseURL: "https://hey-17af7-default-rtdb.firebaseio.com",
    projectId: "hey-17af7",
    storageBucket: "hey-17af7.appspot.com",
    messagingSenderId: "514909760600",
    appId: "1:514909760600:web:281d3cfa36c48d524d2e2d",
    measurementId: "G-JKJ2FE0Q78"
};

firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();
export const storage = firebase.storage();
