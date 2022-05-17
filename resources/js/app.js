import { useEffect, useState } from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import React from 'react';
import ReactDOM from 'react-dom';

import Axios from 'axios'

import Routing from './Routing.js'
import Home from './Home.js'
import Header from './components/Header.js'
import Form from './components/Form.js'
import Result from './components/Result.js'
import ShowList from './components/ShowList.js'
import RegisterForm from './components/RegisterForm.js'
import LoginForm from './components/LoginForm.js'
import LogoutForm from './components/LogoutForm.js'
import Dashboard from './components/Dashboard.js'

import $ from 'jquery'

const App = () => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [user, setUser] = useState();
  const [name, setName] = useState('Guest');
  const [email, setEmail] = useState('')
  const [userId, setUserId] = useState(0)
  const [results, getResults] = useState([])
  const [details, getDetails] = useState([])
  const [shows, getShows] = useState([])
  const [streamingServices, setStreamingServices] = useState([])

  // const [showArrowVisibility, setShowArrowVisibility] = useState(false)
  // const [resultArrowVisibility, setResultArrowVisibility] = useState(false)
  const [rightArrowVisibility, setRightArrowVisibility] = useState(false)
  const [leftArrowVisibility, setLeftArrowVisibility] = useState(false)
  const [isLeftHovering, setIsLeftHovering] = useState(false)
  const [isRightHovering, setIsRightHovering] = useState(false)
  const [sliderPosition, setSliderPosition] = useState(0)

  let loggedInUser = JSON.parse(localStorage.getItem("user"));

  const moveSliderLeft = () => {
    setSliderPosition(sliderPosition - 900)
  }

  const moveSliderRight = () => {
    setSliderPosition(sliderPosition + 900)
  }

  const getStreamResults = (streamResults) => {
    console.log("Trying to get stream results, which are:")
    console.log(streamResults)
    setStreamingServices(streamResults)
    console.log(streamingServices)
  }

  const childToParent = (childData) => {
    console.log("Child data is " + childData)
    setUser(childData)
    if(null !== childData){
      setLoginStatus(true)
      setUserId(childData.id)
    }
    else{
      setLoginStatus(false)
    }
  }

  useEffect(() => {
    if (loggedInUser) {
      // const userData = JSON.parse(loggedInUser)
      setName(loggedInUser.name)
      setEmail(loggedInUser.email)
      setUserId(loggedInUser.id)
      setLoginStatus(true)
      console.log("Logged in. User id is " + userId)
    }
    else{
      console.log("No one is logged in.")
    }
  }, [user]);

  useEffect((e) => {
    console.log("On home effect user is " + loggedInUser)
    const fetchShows = async () => {
      const res = await fetch('/api/shows')
      const data = await res.json()
      if(null !== loggedInUser){
        let userShows = data.filter(datum => datum.user_id == loggedInUser.id)
        getShows(userShows)
        console.log(userShows)
        childToParent(loggedInUser)
      }
      else{
        console.log("On home effect there is no user.")
        getShows()
      }
    }
    fetchShows()
  }, [loginStatus])

  const fetchResults = async (e) => {
    e.preventDefault()
    const res = await fetch(`https://imdb-api.com/en/API/SearchSeries/k_j0x59844/${e.target[0].value}`)
    const data = await res.json()
    console.log(data.results)
    getResults(data.results)
  }

  const fetchDetails = async (e) => {
    const res = await fetch(`https://imdb-api.com/en/API/Title/k_j0x59844/${e.target.id}`)
    const data = await res.json()
    getResults(results.filter((result) => result.id == e.target.id))
    getDetails(data.plot)
  }

  return(
    <Router>
      <Header Link={Link} loginStatus={loginStatus} setName={setName} setEmail={setEmail} setUser={setUser} setLoginStatus={setLoginStatus} LogoutForm={LogoutForm} childToParent={childToParent} />
      <Routes>
        <Route path="/" element={<Home loginStatus={loginStatus} name={name} loggedInUser={loggedInUser} Link={Link}  results={results} details={details} getResults={getResults} fetchResults={fetchResults} fetchDetails={fetchDetails} shows={shows} getShows={getShows} setStreamingServices={setStreamingServices} streamingServices={streamingServices} getStreamResults={getStreamResults} isLeftHovering={isLeftHovering} setIsLeftHovering={setIsLeftHovering} isRightHovering={isRightHovering} setIsRightHovering={setIsRightHovering} leftArrowVisibility={leftArrowVisibility} setLeftArrowVisibility={setLeftArrowVisibility} rightArrowVisibility={rightArrowVisibility} setRightArrowVisibility={setRightArrowVisibility} moveSliderLeft={moveSliderLeft} moveSliderRight={moveSliderRight} sliderPosition={sliderPosition} />} />
        <Route path="register" element={<RegisterForm setUser={setUser} />} />
        <Route path="login" element={loginStatus ? <Dashboard name={name} email={email} /> : <LoginForm setLoginStatus={setLoginStatus} loginStatus={loginStatus} setUser={setUser} childToParent={childToParent} setUserId={setUserId} />} />

        <Route path='my-shows' element={<ShowList shows={shows} getShows={getShows} Link={Link} isLeftHovering={isLeftHovering} setIsLeftHovering={setIsLeftHovering} isRightHovering={isRightHovering} setIsRightHovering={setIsRightHovering} leftArrowVisibility={leftArrowVisibility} setLeftArrowVisibility={setLeftArrowVisibility} rightArrowVisibility={rightArrowVisibility} setRightArrowVisibility={setRightArrowVisibility} moveSliderLeft={moveSliderLeft} moveSliderRight={moveSliderRight} sliderPosition={sliderPosition} />} />

      </Routes>
    </Router>
  )
}

if (document.getElementById('root')) {
  ReactDOM.render(<App />, document.getElementById('root'));
}

export default App;
