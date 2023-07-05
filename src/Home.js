import React from 'react'
import './Home.css'
import Button from '@mui/material/Button';
import vip from './vip.png';
import Login from './Login';
import { Link } from "react-router-dom";


function Home() {
  return (
    <div className='home'>
      <img src={vip} alt="vip-logo" width="200px" height="100px" className='img'/>
      <div className='Home'>
          <Button variant='contained' className='btn' onClick={<Login/>}><Link style={{textDecoration:'none'}} to="/Login"><h3>Login to your account</h3></Link></Button>
          <Button className='btn'  variant='contained'><Link style={{textDecoration:'none'}} to="/Signup"><h3>create a new account</h3></Link></Button>
      </div>
    </div>
  )
}

export default Home