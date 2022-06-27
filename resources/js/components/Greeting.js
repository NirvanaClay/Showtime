import ShowUser from './ShowUser.js'
import ShowGuest from './ShowGuest.js'

const Greeting = ({ loginStatus, name }) => {
  return(
    <h1>Hello, {name}</h1>
  )
}

export default Greeting
