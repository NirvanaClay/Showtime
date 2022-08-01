import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'


const axios = require("axios");

const LoginForm = ({ setLoginStatus, setUser, loginStatus, passwordVisibility, setPasswordVisibility, changePasswordVisibility }) => {
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    let data = {
      email: e.target[0].value,
      password: e.target[1].value
    }
    axios.get('/api/fuck')
    // await axios.get('/sanctum/csrf-cookie')
    // .then(res => {
    //   console.log("In initial sanctum get, res is:")
    //   console.log(res)
    //   // let token = res.config.headers.X-XSRF-TOKEN
    //   axios.post('/login', data)
    //   .then(() => {
    //     axios.get('/user')
    //     .then((res) => {
    //       const userInfo = res.data
    //       console.log("In login form, userInfo is:")
    //       console.log(userInfo)
    //       setUser(userInfo)
    //       setLoginStatus(true)
    //     })
    //   })
    // })
    navigate('/')
  }

  useEffect(() => {
    console.log("Password visibility is:")
    console.log(passwordVisibility)
  }, [passwordVisibility])

  // const resetPassword = () => {
  //   axios.get('/passwordReset')
  //   .then((res) =>{
  //     console.log("In resetPassword, res is:")
  //     console.log(res)
  //   })
  // }

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
            {/* <div className='password-container'> */}
            <input type = {`${!passwordVisibility ? 'password' : 'text'}`} name='password'  autoComplete='off' />
            <div className='visibility-container'>
              <i className={`fas fa-eye${!passwordVisibility ? '-slash' : ''}`} onClick={changePasswordVisibility}></i>
            </div>
            {/* </div> */} 
          </div>
          {/* <p onClick={resetPassword}>Forgot password?</p> */}
          {/* <input type="hidden" name="_token" value="{{ csrf_token() }}" /> */}
          <input type='submit' value='Login' />
        </form>
      </div>
    </>
  )
}

export default LoginForm;