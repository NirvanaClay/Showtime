import ShowUser from './ShowUser.jsx'
import ShowGuest from './ShowGuest.jsx'

const Greeting = ({ loginStatus, name }) => {
  return(
    <h1>Hello, {name}</h1>
  )
}

export default Greeting
