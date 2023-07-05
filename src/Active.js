import React ,{ useEffect, useState } from 'react'
import myImage from './messenger.jpg'
import {auth} from './firebase';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import db from './firebase';
import { collection , getDocFromCache, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Active.css'


function Active() {
    const [ messages , setMessages ] = useState([]);
    useEffect(()=>{
        const q = query(collection(db,"users"),orderBy("timestamp",'asc'));
          onSnapshot(q,(snapshot)=>{
            setMessages((snapshot.docs.map(doc=>({id:doc.id,usermails:doc.data()}))));
          })
      },[]);
      console.log(messages);
      const navigate = useNavigate();
      const signout = async()=>{
        if(window.confirm("are you sure want to logout")===true)
        {
          await signOut(auth);
          navigate('/')
        }
      }
      const go = async()=>{
        navigate('/messenger')
      }
      const [user,setUser] = useState('');
      useEffect(() => {
        if(auth.currentUser)
        {
            //console.log(auth.currentUser.email)
            setUser(auth.currentUser.email)
        }
      },[auth?.currentUser])
  return (
    <div>
      <div className='gy1'>
        <Button onClick={go}variant="contained" color="primary">Go To Messages</Button>
        <Button onClick={signout} variant="contained" color="error">Signout</Button>
      </div>
        <h2>you are signed in as {user}</h2>
        <h6>This is the users list</h6>
        {messages.map((key)=>{
            return <div><h4>{key.usermails.email}-{key.usermails.username}</h4></div>;
        })}
    </div>
  )
}

export default Active