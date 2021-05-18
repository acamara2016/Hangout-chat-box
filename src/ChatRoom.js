import React, {useEffect, useRef, useState} from 'react';
import firebase from 'firebase/app';
import {firestore} from './services/firebase';
import 'firebase/auth';
import ChatMessage from './components/ChatMessage'
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {auth} from './services/firebase';
import nextId from "react-id-generator";

export default function ChatRoom(props) {
    const dummy = useRef();
    const id = nextId();
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);
    
  
    const [messages] = useCollectionData(query, { idField: 'id', chat_id:'1' });
    const parsed = [];
    // messages.filter(msg => msg.chat_id!==null).map(msg=>(
    //   console.log(msg)
    // ))

    //console.log(messages)
  
    const [formValue, setFormValue] = useState('');
  
  
    const sendMessage = async (e) => {
      e.preventDefault();
  
      const { uid, photoURL } = auth.currentUser;
  
      await messagesRef.add({
        chat_id: '1',
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
      })
  
      setFormValue('');
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
  
    return (<>
      <main>

        {
        messages 
        && 
        messages.map(msg => {return msg.chat_id===props.chat_id ? 
          <ChatMessage key={msg.id} message={msg} />:""
        })
        // messages.filter(msg => msg.includes(props.chat_id)).map(filteredMessage => (
          
        //     <ChatMessage key={filteredMessage.id} message={filteredMessage}/>
          
        // ))
        }
  
        <span ref={dummy}></span>
  
      </main>
    <div style={{
        backgroundColor:'#ddd',
        position: 'fixed',
        paddingLeft: '2em',
        left: '50%',
        width:'-webkit-fill-available',
        bottom: '0%',
        transform: 'translateX(-50%)',

        }}>
        <form style={{display: 'flex'}} onSubmit={sendMessage}>
        <div style={{display:'contents'}} class="md-form chat-message-type">
            <input id="form7" class="md-textarea form-control" rows="3" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Say Hi" />
            <button class="btn btn-primary btn-lg" type="submit" disabled={!formValue}>Send message</button>
        </div>
     
  
        {/* <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
  
        <button type="submit" disabled={!formValue}>🕊️</button> */}
  
      </form>
      </div>
    </>)
  }