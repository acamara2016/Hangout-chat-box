import React from 'react';
import {auth} from '../services/firebase'
import {Link} from 'react-router-dom'
// <a class="dropdown-item" href="#">My account</a>
export default function SignOut() {
    return  (
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
            <a href="/sign-in"class="dropdown-item " onClick={() => auth.signOut()}>Sign Out</a>
            <a href="/profile" class="dropdown-item ">Profile</a>
        </div>
    )
  }