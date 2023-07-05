import React, { useEffect, useState } from 'react';
import { Input , Button ,FormControl } from '@mui/material';
import './Signup.css';
import vip from './vip.png';
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailLink , sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "./firebase"
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore"; 
import db from './firebase';
import firebase from 'firebase/compat/app';
function Signup() {
    const [ userName , setUserName ] = useState([]);
    const [ regEmail , setRegEmail ] = useState("");
    const [ regPassword , setRegPassword ] = useState("");
    console.log(regEmail);
    console.log(regPassword);
    const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: 'vips-authentication-app.web.app/finishSignUp?cartId=1234',
        // This must be true.
        handleCodeInApp: true,
        iOS: {
          bundleId: 'vips-authentication-app.web.app.ios'
        },
        android: {
          packageName: 'vips-authentication-app.web.app.android',
          installApp: true,
          minimumVersion: '12'
        },
        dynamicLinkDomain: 'vips-authentication-app.web.app.link'
      };
    const navigate = useNavigate();
    /*useEffect(()=>{
        const q = query(collection(db,"users"),orderBy("timestamp",'desc'));
          onSnapshot(q,(snapshot)=>{
            setRegUsers((snapshot.docs.map(doc=>({id:doc.id,email:doc.data().email}))));
          })
      },[]);*/
    const register = async (event)=>{
        event.preventDefault();
        try{
            createUserWithEmailAndPassword(auth , regEmail, regPassword)
                .then((userCredential) => {
                    // send verification mail.
                    //userCredential.user.sendEmailVerification();
                    addDoc(collection(db, "users"), {
                        email:regEmail,
                        username:userName,
                        timestamp:firebase.firestore.FieldValue.serverTimestamp()
                      });
                      navigate('/messages')
                    //auth.signOut();
                    //alert("Email sent");
            }).catch(alert);
        }
        catch(error)
        {
            alert(error.message);
            setRegEmail("");
            setRegPassword("");
            setUserName("");
        }
/*      
        try{
            //signInWithEmailLink(auth, regEmail, window.location.href);
            firebase.auth().currentUser.sendEmailVerification()
        .then(() => {
            // Email verification sent!
            alert('Email Verification sent! Check your mail box');
            // ...
            addDoc(collection(db, "users"), {
                email:regEmail,
                username:userName,
                timestamp:firebase.firestore.FieldValue.serverTimestamp()
              });
              navigate('/messages')
            }).catch(alert);
            
            //navigate('/messages');
            //console.log(user);
        }
        catch(error){
            alert(error.message);
            setRegEmail("");
            setRegPassword("");
            setUserName("");
        }*/
        // Add a new document in collection "cities"
        
    }
  return (
    <div className='Signup'>
        <img src={vip} alt="vip-logo" width="200px" height="100px" className='img3'/>
        <div className='vip1'>
            <form method='post'>
                <FormControl className='frm'>
                    <Input
                        name="text"
                        type="email"
                        placeholder="enter your mail-id"
                        onChange={(event)=>{setRegEmail(event.target.value)}}
                        value={regEmail}
                    />
                </FormControl><br/>
                <FormControl className='frm'>
                    <Input
                        name="text"
                        type="text"
                        placeholder="enter your userName"
                        onChange={(event)=>{setUserName(event.target.value)}}
                        value={userName}
                    />
                </FormControl><br/>
                <FormControl className='frm'>            
                    <Input
                        name="password"
                        type="password"
                        placeholder="create a strong password"
                        onChange={(event)=>{setRegPassword(event.target.value)}}
                        value={regPassword}
                    />
                </FormControl><br/>
                <div className='trend1'>
                    <Link className='lnk1' style={{textDecoration:'none'}} to="/"><p>Go to Home page</p></Link>
                    <Link className='lnk1' style={{textDecoration:'none'}} to="/Login"><p>already signed up, login</p></Link>
                </div>
                <Button variant='contained' className='btns1' onClick={register}>create new account</Button>
            </form>
        </div>
    </div>
    
  )
}
export default Signup

/*

                <FormControl className='frm'>
                    <Input
                        name="text"
                        type="text"
                        placeholder="create company Id"
                    />
                </FormControl><br/>
                
                <FormControl className='frm'>            
                    <Input
                        name="password"
                        type="password"
                        placeholder="confirm company password"
                    />
                </FormControl><br/>*/ 