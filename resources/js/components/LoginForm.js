import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const axios = require("axios");

const LoginForm = ({ setLoginStatus, setUser, childToParent, setUserId }) => {
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    let data = {
      email: e.target[0].value,
      password: e.target[1].value
    }
    await axios.get('/sanctum/csrf-cookie')
    .then(res => {
      axios.post('/login', data)
      .then(res => {
        const userInfo = JSON.stringify(res.data)
        localStorage.setItem('user', userInfo)
        childToParent(userInfo)
        setUser(userInfo)
        setUserId(userInfo.id)
        setLoginStatus(true)
      })
    })
    navigate('/')
  }

  return(
    <div className='loginForm'>
      <h1>Login</h1>
      <form onSubmit={loginUser} method='POST' action='/login'>
        <div class='field'>
          <label htmlFor='email'>Email</label>
          <input type ='text' name='email' />
        </div>
        <div class='field'>
          <label htmlFor='password'>Password</label>
          <input type ='text' name='password' />
        </div>
        {/* <input type="hidden" name="_token" value="{{ csrf_token() }}" /> */}
        <input type='submit' value='Login' />
      </form>
    </div>
  )
}

export default LoginForm;