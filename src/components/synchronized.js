import React from 'react';
import {auth, firestore} from '../services/firebase'
export default class synchronized extends React.Component {
    componentDidMount(){
        console.log("adding data")
        firestore.collection('users').doc(auth.currentUser.uid).set({
            username: auth.currentUser.displayName,
            uid: auth.currentUser.uid,
            image: auth.currentUser.photoURL,
            state:'connected',
        })
    }
    render(){
        return(
            <div></div>
        )
    }
}