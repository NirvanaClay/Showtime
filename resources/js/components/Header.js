import { useEffect } from "react"
import { BrowserRouter } from "react-router-dom"

const Header = ({ resetSlider, loginStatus, Link, LogoutForm, setName, setEmail, setUser, setLoginStatus }) => {

  useEffect(() => {
    console.log("In header, loginStatus is:")
    console.log(loginStatus)
  }, [loginStatus])

  return (
    <div className='navbar'>
      <ul>
        <li><Link to='/' onClick={resetSlider}>Home</Link></li>
        <li>{loginStatus && <Link to='/my-series' onClick={resetSlider}>My Series</Link> }</li>
        <li>{loginStatus && <Link to='/my-movies' onClick={resetSlider}>My Movies</Link>}</li>
        <li>{loginStatus && <LogoutForm setName={setName} setEmail={setEmail} setUser={setUser} setLoginStatus={setLoginStatus} />}</li> 
        <li>{!loginStatus && <Link to='/login'>Login</Link>}</li>
        <li>{!loginStatus && <Link to='/register'>Register</Link>}</li>
      </ul>
    </div>
  )
}

export default Header
