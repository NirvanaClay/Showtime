const axios = require("axios");
import { useNavigate } from 'react-router-dom'

const RegisterForm = ({ setUser }) => {
  const navigate = useNavigate();

  const addUser = async (e) => {
    e.preventDefault();
    await axios.post('/api/register', {
      name: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
      password_confirmation: e.target[3].value
    }).then(
      await axios.get('/sanctum/csrf-cookie')
      .then(res => {
        axios.post('/login', {
          email: e.target[1].value,
          password: e.target[2].value
        })
        .then(res => {
          const userInfo = JSON.stringify(res.data)
          localStorage.setItem('user', userInfo)
          setUser(userInfo)
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
    <div className='result'>
      <form onSubmit={addUser} method="POST" action="/api/register" name='newUserForm' className='newUserForm'>
        <div className='field'>
          <label htmlFor='name'>Name</label>
          <input type ='text' name='name' />
        </div>
        <div className='field'>
          <label htmlFor='email'>Email</label>
          <input type ='text' name='email' />
        </div>
        <div className='field'>
          <label htmlFor='password'>Password</label>
          <input type ='text' name='password' />
        </div>
        <div className='field'>
          <label htmlFor='password_confirmation'>Confirm Password</label>
          <input type ='text' name='password_confirmation' />
        </div>
        <input type='submit' value='Register' />
      </form>
    </div>
  )
}

export default RegisterForm
