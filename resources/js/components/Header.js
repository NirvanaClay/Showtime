import { BrowserRouter } from "react-router-dom"

const Header = ({ loginStatus, Link, LogoutForm, setName, setEmail, setUser, setLoginStatus, childToParent }) => {
  return (
    <div className='navbar'>
      <ul>
        <li><Link to='/'>Shows</Link></li>
        <li><Link to='/register'>Register</Link></li>
        <li>{loginStatus ? <LogoutForm setName={setName} setEmail={setEmail} setUser={setUser} setLoginStatus={setLoginStatus} childToParent={childToParent} /> : <Link to='/login'>Login</Link>}</li>
      </ul>
    </div>
  )
}

export default Header
