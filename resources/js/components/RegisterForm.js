const axios = require("axios");
import { useNavigate } from 'react-router-dom'

const RegisterForm = ({ setUser, setLoginStatus }) => {
  const navigate = useNavigate();

  const addUser = async (e) => {
    e.preventDefault();
    let data = {
      email: e.target[0].value,
      password: e.target[1].value
    }
    await axios.post('/api/register', {
      email: e.target[0].value,
      password: e.target[1].value,
      password_confirmation: e.target[2].value
    }).then(
      await axios.get('/sanctum/csrf-cookie')
      .then(res => {
        axios.post('/login', data)
        .then((res) => {
          console.log("in login post, res is:")
          console.log(res)
          axios.get('/api/user')
          .then((res) => {
            const userInfo = res.data
            console.log("In register form, userInfo is:")
            console.log(userInfo)
            setUser(userInfo)
            setLoginStatus(true)
          })
        })
      })
    ).catch(
      res => {
        console.log(res)
      }
    )
    navigate('/')
  }

  return (
    <div className='register'>
      <h1>Register</h1>
      <form onSubmit={addUser} method="POST" action="/api/register" name='newUserForm' className='newUserForm'>
        <div className='field'>
          <label htmlFor='email'>Email</label>
          <input type ='text' name='email' />
        </div>
        <div className='field'>
          <label htmlFor='password'>Password</label>
          <input type ='password' name='password' autoComplete='off' />
        </div>
        <div className='field'>
          <label htmlFor='password_confirmation'>Confirm Password</label>
          <input type ='password' name='password_confirmation' autoComplete='off' />
        </div>
        <input type='submit' value='Register' />
      </form>
    </div>
  )
}

export default RegisterForm
