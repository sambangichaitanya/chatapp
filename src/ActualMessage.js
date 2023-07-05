import React, { useEffect, useState , useRef } from 'react'
import myImage from './messenger.jpg'
import './ActualMessage.css';
import { FormControl ,InputLabel , Input } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import db from './firebase.js';
import { query , collection , onSnapshot , orderBy, addDoc } from "firebase/firestore";
import {auth} from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import FlipMove from 'react-flip-move';

function ActualMessage() {
    const [input,setInput] = useState("");
    const [messages,setMessages] = useState([]);
    console.log(input);
    const handle = (event)=>{
        setInput(event.target.value);
    }
    const ckil = (event)=>{
        event.preventDefault();
        setMessages([...messages,input]);
        setInput("");
    }
    let input1 = "Hola";
    const [user,setUser] = useState({});
        onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser);
    })

    useEffect(()=>{
        const q = query(collection(db,"messages"),orderBy("timestamp",'desc'));
          onSnapshot(q,(snapshot)=>{
            setMessages((snapshot.docs.map(doc=>({id:doc.id,message:doc.data()}))));
          })
      },[]);

      const sendMessage = (event)=>{
        event.preventDefault();
          //setMessages([...messages,input]);
          //setMessages([...messages,{username:userName,message:input}]);
          addDoc(collection(db,"messages"),{
            message:input,
            username:user.email,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          })
        setInput('');
      }

  return (
    <div className='ActualMessage'>
        <h1>Hello , Let's Chat 🚀🚀🚀🚀🚀</h1>
        <img src={myImage} alt='vipsm-logo' width="100px" height="100px"/>
        <form className='app_form'>
            <FormControl className='app_formcontrol'>
                <InputLabel>write a message</InputLabel>
                <Input className='app_input'  onChange={event=>setInput(event.target.value)} placeholder={input1}/>
                <IconButton className='app_iconbtn' disabled={!input} variant="contained"  color="secondary" type="submit" onClick={sendMessage}>
                <SendIcon/>
                </IconButton>
            </FormControl>
        </form>
        <FlipMove>
            {messages.map(({id,message})=>{
            //return <Message username={val.username} message={val.message}/>
            return <div><h6>{user.email}</h6><br/><h1>{message}</h1></div>
        })}
        </FlipMove>
    </div>
  )
}

export default ActualMessage;





















/*


function ActualMessage() {
    const [userName,setUserName] = useState("");
    const vip1 = useRef(false);
    useEffect(() => {
      if (vip1.current) return;
      vip1.current = true;
      setUserName(window.prompt("Enter your Name to be displayed while chatting?"));
    },[]);
    const [input,setInput] = useState("");
    const [messages,setMessages] = useState([]);
    console.log(input);
    const handle = (event)=>{
        setInput(event.target.value);
    }
    const ckil = (event)=>{
        event.preventDefault();
        setMessages([...messages,input]);
        setInput("");
    }
    const delete1 = (event)=>{
        setMessages(messages.filter((key)=>{
            return key!==event;
        }))
    }
    console.log(messages);
    return (
        <div className='ActualMessage'>
            <h1>Hello {userName} Let's Chat 🚀🚀🚀🚀🚀</h1>
            <img src={myImage} alt='vipsm-logo' width="100px" height="100px"/>
            <form>
                <input onChange={(event)=>{handle(event)}}  value={input}  placeholder='enter a message'/>
                <button disabled={!input} onClick={ckil}>send</button>
            </form>
            <ul>
                {messages.map((k)=>{
                    return <div><button >{k}</button><br/></div>;
                })}
            </ul>
        </div>
    )
}
export default { ActualMessage}*/