import axios from "axios";

import { useNavigate } from 'react-router-dom'

const LogoutForm = ({ setName, setEmail, setUser, setLoginStatus, childToParent }) => {
  const navigate = useNavigate();

  const logout = async (e) => {
    e.preventDefault()
    axios.post('/logout')
    childToParent(null)
    setName('Guest')
    setEmail('')
    setUser()
    setLoginStatus(false)
    localStorage.clear()
    navigate('/')
  }
  return (
    <form method='POST' action='/logout' onSubmit={logout}>
      <input type='submit' value='Log Out' />
    </form>
  )
}

export default LogoutForm
