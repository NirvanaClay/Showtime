import { useEffect, useState } from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Link } from 'react-router-dom'

import React from 'react';
import ReactDOM from 'react-dom';

import Axios from 'axios'

import Form from './components/Form.js'
import StreamService from './components/StreamService.js'
import Result from './components/Result.js'
import ShowList from './components/ShowList.js'
import ShowUser from './components/ShowUser.js'
import ShowGuest from './components/ShowGuest.js'
import RegisterForm from './components/RegisterForm.js'
import Greeting from './components/Greeting.js'

import $ from 'jquery'
import axios from 'axios';

const Home = ({ loginStatus, name, userId, loggedInUser, setUser, childToParent, user, Link }) => {
  const [results, getResults] = useState([])
  const [details, getDetails] = useState([])
  const [shows, getShows] = useState([])
  const [streamingServices, setStreamingServices] = useState([])

  const getStreamResults = (streamResults) => {
    setStreamingServices(streamResults)
    console.log(streamingServices)
  }

  useEffect(() => {
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

  return (
    <div className="home">
      {streamingServices.length > 0 &&
        <h1 className='streams-heading'>Streaming on:</h1>
      } 
      {streamingServices.length > 0 &&
      streamingServices.map((streamingService, index) => (
        <div key={index}>
          <h2 className='streaming-services' key={index}>{streamingService}</h2>
        </div>
      ))}
      {loggedInUser && <Greeting loginStatus={loginStatus} name={name} />}
      <Form results={results} details={details} getResults={fetchResults} getDetails={fetchDetails} shows={shows} getShows={getShows} loggedInUser={loggedInUser} setStreamingServices={setStreamingServices} streamingServices={streamingServices} getStreamResults={getStreamResults} />
      <ShowList shows={shows} getShows={getShows} Link={Link} />
    </div>
  );
}

export default Home;
