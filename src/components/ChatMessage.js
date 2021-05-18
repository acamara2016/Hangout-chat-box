import React from 'react';
import {auth} from '../services/firebase';
import BadgeAvatars from './Avatar';

export default function ChatMessage(props) {
    const { chat_id, text, uid, photoURL, createdAt } = props.message;
  
    const contentJustification = uid === auth.currentUser.uid ? 'justify-content-end' : 'justify-content-start';
    const messageColor = uid === auth.currentUser.uid ? 'primary-color' : 'secondary-color';
    const messageSize = uid === auth.currentUser.uid ? '' : 'max-content';
    const imageOrNot = uid === auth.currentUser.uid ? '' : <BadgeAvatars title={auth.currentUser.displayName} img={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
    return (<>
        <div className="text-center"><small></small></div>
                <div style={{width:messageSize}} class={`d-flex ${contentJustification}`} >
                  {imageOrNot}
                  <p class={`rounded p-3 text-white w-75  ${messageColor}`}>
                    {text}</p>
        </div>
    </>)
  }
  