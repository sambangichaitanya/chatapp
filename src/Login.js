import React, { useState } from 'react'
import './Login.css'
import { Input , Button ,FormControl } from '@mui/material';
import vip from './vip.png';
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"





function Login() {
    const navigate = useNavigate();
    const [loginEmail,setLoginEmail] = useState("");
    const [loginPassword,setLoginPassword] = useState("");
    const login = async()=>{
        try{
            const user = await signInWithEmailAndPassword(auth,loginEmail,loginPassword);
            navigate('/messages');
            console.log(user);
        }
        catch(error){
            alert(error.message);
        }
    }
  return (
    <div className='login'>
        <img src={vip} alt="vip-logo" width="200px" height="100px" className='img2'/>
        
        <div className='vip'>
            <form method='post'>
                <FormControl className='frm'>
                <Input
                    name="text"
                    type="email"
                    placeholder="enter your mail"
                    onChange={(event)=>{setLoginEmail(event.target.value)}}
                />
                </FormControl><br/>
                <FormControl className='frm'>            
                <Input
                    name="password"
                    type="password"
                    placeholder="enter your password"
                    onChange={(event)=>{setLoginPassword(event.target.value)}}
                />
                </FormControl><br/>
                
                <div className='trend'>
                    <Link className='lnk' style={{textDecoration:'none'}} to="/"><p>Back to Home page</p></Link>
                    <Link className='lnk' style={{textDecoration:'none'}} to="/Signup"><p>create a new account</p></Link>
                </div>
                <Button onClick={login} className='frm btns2'  variant='contained'>Login</Button>    
            </form>
        </div>
    </div>
  )
}

export default Login

/*<FormControl className='frm'>
                <Input
                    name="text"
                    type="text"
                    placeholder="user Id"
                />
                </FormControl><br/>
                <FormControl className='frm'>
                <Input
                    name="password"
                    type="password"
                    placeholder="user password"
                />
                </FormControl>*/