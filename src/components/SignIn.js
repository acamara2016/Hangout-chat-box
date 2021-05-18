import React from 'react';
import firebase from 'firebase/app';
import {auth, firestore} from '../services/firebase';

import {Link} from 'react-router-dom'

export default function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
      <div style={{height:'600px'}} class="container">
        <div class="row justify-content-md-center">
          <div class="col-md-auto">
            <a style={{marginTop:'100px'}} class="btn btn-primary" onClick={signInWithGoogle} role="button"><i class="fab fa-google"></i> Sign in with Google</a>
          </div>
        </div>
    </div>
  )

}