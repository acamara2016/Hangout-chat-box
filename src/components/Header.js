import React, {useEffect, useRef, useState} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from '../services/firebase'
import SignIn from '../components/SignIn'
import SignOut from '../components/SignOut'

export default function Header(){
    const [user] = useAuthState(auth);
    return(
        <header>
     <nav class="navbar fixed-top navbar-expand-lg scrolling-navbar double-nav">

      <div class="float-left">
        <a href="#" data-activates="slide-out" class="button-collapse"><i class="far fa-comment-dots"></i></a>
      </div>

      <ul class="nav navbar-nav nav-flex-icons ml-auto">

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle waves-effect" href="#" id="userDropdown" data-toggle="dropdown"aria-haspopup="true" aria-expanded="false">
            <i class="fas fa-user"></i> <span class="clearfix d-none d-sm-inline-block">Profile</span>
          </a>
          { user ? <SignOut/> : <SignIn/> }
        </li>

      </ul>

    </nav>

  </header>
    );
    
}