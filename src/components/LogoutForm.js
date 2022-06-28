import axios from "axios";

import { useNavigate } from 'react-router-dom'

const LogoutForm = ({ setName, setEmail, setUser, setLoginStatus }) => {
  const navigate = useNavigate();

  const logout = async (e) => {
    e.preventDefault()
    axios.post('/api/logout')
    setUser()
    navigate('/')
  }
  return (
    <form method='POST' action='/logout' onSubmit={logout}>
      <input type='submit' value='Log Out' />
    </form>
  )
}

export default LogoutForm
