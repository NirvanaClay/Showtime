import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'


const axios = require("axios");

const LoginForm = ({ setLoginStatus, setUser, loginStatus }) => {
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    let data = {
      email: e.target[0].value,
      password: e.target[1].value
    }
    await axios.get('/sanctum/csrf-cookie')
    .then(res => {
      console.log("In initial sanctum get, res is:")
      console.log(res)
      // let token = res.config.headers.X-XSRF-TOKEN
      axios.post('/api/login', data)
      .then(() => {
        axios.get('/api/user')
        .then((res) => {
          const userInfo = res.data
          console.log("In login form, userInfo is:")
          console.log(userInfo)
          setUser(userInfo)
          setLoginStatus(true)
        })
      })
    })
    navigate('/')
  }

  return(
    <>
      <div className='loginForm'>
        <h1>Log In</h1>
        <form onSubmit={loginUser} method='POST' action='/login'>
          <div className='field'>
            <label htmlFor='email'>Email</label>
            <input type ='text' name='email' />
          </div>
          <div className='field'>
            <label htmlFor='password'>Password</label>
            <input type ='password' name='password'  autoComplete='off' />
          </div>
          {/* <input type="hidden" name="_token" value="{{ csrf_token() }}" /> */}
          <input type='submit' value='Login' />
        </form>
      </div>
    </>
  )
}

export default LoginForm;