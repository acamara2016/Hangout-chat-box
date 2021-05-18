import React from 'react';
import './App.css';
import 'firebase/firestore';
import 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';
import Home from './pages/Home'
// import Profile from './pages/Profile'
 import SignIn from './components/SignIn'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {auth} from './services/firebase';
import Dashboard from './pages/Dashboard';

function App() {
  const [user] = useAuthState(auth);
  return (
    <>
    {user ?(
      <Router>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        {/* <Route exact path="/profile" component={Profile} />
        <Route exact path="/sign-in" component={SignIn} /> */}
      </Switch>
    </Router>
    ):(
      <SignIn/>
    )}
    </>
  );
}

export default App;
