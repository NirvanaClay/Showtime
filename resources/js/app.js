import { useEffect, useState } from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import React from 'react';
import ReactDOM from 'react-dom';

import Axios from 'axios'

import Routing from './Routing.js'
import Home from './Home.js'
import Header from './components/Header.js'
import Form from './components/Form.js'
import Result from './components/Result.js'
import ShowList from './components/ShowList.js'
import RegisterForm from './components/RegisterForm.js'
import LoginForm from './components/LoginForm.js'
import LogoutForm from './components/LogoutForm.js'
import Dashboard from './components/Dashboard.js'

import $ from 'jquery'

const App = () => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [user, setUser] = useState();
  const [name, setName] = useState('Guest');
  const [email, setEmail] = useState('')
  const [userId, setUserId] = useState(0)

  let loggedInUser = JSON.parse(localStorage.getItem("user"));

  const childToParent = (childData) => {
    console.log("Child data is " + childData)
    setUser(childData)
    if(null !== childData){
      setLoginStatus(true)
      setUserId(childData.id)
    }
    else{
      setLoginStatus(false)
    }
  }

  useEffect(() => {
    if (loggedInUser) {
      // const userData = JSON.parse(loggedInUser)
      setName(loggedInUser.name)
      setEmail(loggedInUser.email)
      setUserId(loggedInUser.id)
      setLoginStatus(true)
      console.log("Logged in. User id is " + userId)
    }
    else{
      console.log("No one is logged in.")
    }
  }, [user]);

  return(
    <Router>
      <Header Link={Link} loginStatus={loginStatus} setName={setName} setEmail={setEmail} setUser={setUser} setLoginStatus={setLoginStatus} LogoutForm={LogoutForm} childToParent={childToParent} />
      <Routes>
        <Route path="/" element={<Home loginStatus={loginStatus} name={name} loggedInUser={loggedInUser} setUser={setUser} childToParent={childToParent} user={user} />} />
        <Route path="register" element={<RegisterForm setUser={setUser} />} />
        <Route path="login" element={loginStatus ? <Dashboard name={name} email={email} /> : <LoginForm setLoginStatus={setLoginStatus} loginStatus={loginStatus} setUser={setUser} childToParent={childToParent} setUserId={setUserId} />} />
      </Routes>
    </Router>
  )
}

if (document.getElementById('root')) {
  console.log('Is this thing on?');
  ReactDOM.render(<App />, document.getElementById('root'));
}

export default App;
