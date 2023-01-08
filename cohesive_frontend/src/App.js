import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Login  from './components/Login';
import Register from './components/Register';
import Friends from './components/Friends';
import Transactions from './components/Transactions';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {

  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const userLogin = (tok) => {
    setToken(tok);
  }

  const userLogout = () => {
    setToken('');
  }

  return(
    <>
    <BrowserRouter>
    <Navigation token={token} userLogout = {userLogout} />
    <Routes>
      <Route exact path="/" element={<Home token={token}/>} />
      <Route exact path="/transactions" element={<Transactions token={token}/>} />
      <Route exact path="/friends" element={<Friends token={token}/>} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/login" element={<Login userLogin = {userLogin} />} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;