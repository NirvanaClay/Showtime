import { BrowserRouter } from "react-router-dom"

const Header = ({ resetSlider, loginStatus, Link, LogoutForm, setName, setEmail, setUser, setLoginStatus }) => {
  return (
    <div className='navbar'>
      <ul>
        <li><Link to='/' onClick={resetSlider}>Home</Link></li>
        <li>{loginStatus ? <Link to='/my-series' onClick={resetSlider}>My Series</Link> : <Link to='/register'>Register</Link>}</li>
        <li>{loginStatus && <Link to='/my-movies' onClick={resetSlider}>My Movies</Link>}</li>
        <li>{loginStatus ? <LogoutForm setName={setName} setEmail={setEmail} setUser={setUser} setLoginStatus={setLoginStatus} /> : <Link to='/login'>Login</Link>}</li>
      </ul>
    </div>
  )
}

export default Header
