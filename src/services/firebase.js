import React, {useEffect, useRef, useState} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

 const config = {
    apiKey: "AIzaSyBvjMWV1okvLur6IA26-9I_wTw34FBWImk",
    authDomain: "portfolio-1e555.firebaseapp.com",
    projectId: "portfolio-1e555",
    storageBucket: "portfolio-1e555.appspot.com",
    messagingSenderId: "935937401689",
    appId: "1:935937401689:web:a56edd862b344f7b45e248",
    measurementId: "G-KYCPNE30EY"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
export const auth = firebase.auth();
export const firestore = firebase.firestore();
