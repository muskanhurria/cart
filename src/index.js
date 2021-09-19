import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as firebase from 'firebase';
// import firebase from 'firebase/app';
import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyA-4byO2UXwdTI8NNBK6CnpoFjrd4tba20",
  authDomain: "cart-e1087.firebaseapp.com",
  projectId: "cart-e1087",
  storageBucket: "cart-e1087.appspot.com",
  messagingSenderId: "85023467269",
  appId: "1:85023467269:web:cabbc87bb099547dd0b96c"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);
// all good ab chlega code aapka

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


