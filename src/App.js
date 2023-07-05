import React from 'react';
import './App.css';
//import Message from './Message';
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom"
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Messageapp from './Messageapp';
//import ActualMessage from './ActualMessage';
import Active from './Active';

function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path='/messages' element={<div><Active/></div>}/>
          <Route path='/messenger' element={<div><Messageapp/></div>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
