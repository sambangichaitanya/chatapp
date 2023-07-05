import React ,{ useEffect, useState , useRef } from 'react'
import {auth} from './firebase';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import myImage from './messenger.jpg';
import { FormControl ,InputLabel , Input } from '@mui/material';
import FlipMove from 'react-flip-move';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import db from './firebase.js';
import firebase from 'firebase/compat/app';
import { query , collection , onSnapshot , orderBy, addDoc } from "firebase/firestore";
import Message from './Message';
import './Messageapp.css'


function Messageapp() {
    const navigate = useNavigate();
    const signout = async()=>{
        if(window.confirm("are you sure want to logout")===true)
        {
          await signOut(auth);
          navigate('/')
        }
      }
      const go = () => {
        navigate('/messages');
      }
      const [input,setInput] = useState("");
      //const [messages,setMessages] = useState(['hello','hi','are you the member of vip club']);
      const [messages,setMessages] = useState([])
      
      //const [messages,setMessages] = useState([{username:'Vip-1',message:'Vip-1 bolthey'}]);
      //const [userName,setUserName] =  useState('');
      const [user,setUser] = useState('')
      const input1 = "Hola VIP's";
    //console.log(auth.currentUser.email)
      useEffect(() => {
        if(auth.currentUser)
        {
            //console.log(auth.currentUser.email)
            setUser(auth.currentUser.email)
        }
      },[auth?.currentUser])

      useEffect(()=>{
        const q = query(collection(db,"messages"),orderBy("timestamp",'desc'));
          onSnapshot(q,(snapshot)=>{
            setMessages((snapshot.docs.map(doc=>({id:doc.id,message:doc.data()}))));
          })
      },[]);
      console.log(collection(db,"users"))
      
      const sendMessage = (event)=>{
        event.preventDefault();
          //setMessages([...messages,input]);
          //setMessages([...messages,{username:userName,message:input}]);
          addDoc(collection(db,"messages"),{
            message:input,
            username:user,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          })
        setInput('');
      }

  return (
    <div className="App">
    <div className='gy1'>
        <Button onClick={go}variant="contained" color="primary">Go Back</Button>
        <Button onClick={signout} variant="contained" color="error">Signout</Button>
    </div>
    <h1>WELCOME ALL USERS</h1>
      <h2>you are signed in as {user}</h2>
      <form className='app_form'>
        <FormControl className='app_formcontrol'>
          <InputLabel>write a message</InputLabel>
          <Input className='app_input'  value={input} onChange={event=>setInput(event.target.value)} placeholder={input1}/>
          <IconButton className='app_iconbtn' disabled={!input} variant="contained"  color="secondary" type="submit" onClick={sendMessage}>
            <SendIcon/>
          </IconButton>
        </FormControl>
      </form>
      <FlipMove>
        {messages.map(({id,message})=>{
            //return <Message username={val.username} message={val.message}/>
            return <Message key={id} username = {user} message = {message}/>
        })}
      </FlipMove>
    </div>
  )
}

export default Messageapp