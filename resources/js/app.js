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
import SeriesList from './components/SeriesList.js'
import MoviesList from './components/MoviesList.js'
import RegisterForm from './components/RegisterForm.js'
import LoginForm from './components/LoginForm.js'
import LogoutForm from './components/LogoutForm.js'
import Dashboard from './components/Dashboard.js'

import $ from 'jquery'
import { set } from 'lodash';
import axios from 'axios';

const App = () => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [user, setUser] = useState();
  const [name, setName] = useState('Guest');
  const [email, setEmail] = useState('')
  const [userId, setUserId] = useState(0)
  const [results, getResults] = useState([])
  const [details, getDetails] = useState([])

  const [streamingServices, setStreamingServices] = useState([])
  const [streamingId, setStreamingId] = useState('')

  const [series, getSeries] = useState([])
  const [movies, getMovies] = useState([])

  const [loggingIn, setLoggingIn] = useState(false)

  // let userCheck = document.getElementById('authenticated').value
  // console.log("userCheck is:")
  // console.log(userCheck)

  useEffect(() => {
    console.log("Check auth status in app effect.")
    axios.get('/authenticated')
    .then((res) => {
      const user = res.data
      console.log("Which has res.data of:")
      console.log(user)
      if(user != 'guest'){
        console.log("There is a user, which is:")
        console.log(user)
        setUser(user)
        setName(user.name)
        setEmail(user.email)
        setUserId(user.id)
        setLoginStatus(true)
      }
      else{
        console.log("There is not a user.")
        setName('Guest')
        setEmail('')
        setUserId(0)
        setLoginStatus(false)
      }
    })
  }, [])

  const noStreaming = "This show is not currently available through streaming."

  const [showType, setShowType] = useState('')
  const [changedRating, setChangedRating] = useState(false)

  useEffect((e) => {
    console.log("On home effect user is " + user)
    const fetchShows = async () => {
      if(user){
        const res = await fetch('/api/shows')
        const data = await res.json()
        console.log("Data from fetchShows is:")
        console.log(data)
        let userShows = data.filter(datum => datum.user_id == user.id)
        let userSeries = userShows.filter(show => show.show_type == 'series')
        let userMovies = userShows.filter(show => show.show_type == 'movie')
        getSeries([...userSeries])
        getMovies([...userMovies])
        // if(null != user){
        //   // let userShows = data.filter(datum => datum.user_id == user.id)
        //   // let userSeries = userShows.filter(show => show.show_type == 'series')
        //   // let userMovies = userShows.filter(show => show.show_type == 'movie')
        //   // getSeries([...userSeries])
        //   // getMovies([...userMovies])
        // }
      }

      else{
        console.log("On home effect there is no user.")
        getSeries([])
        getMovies([])
        setName('Guest')
        setEmail('')
        setUserId(0)
        setLoginStatus(false)
      }
    }
    fetchShows()
  }, [user, changedRating])

  const fetchResults = async (e) => {
    e.preventDefault()
    let theShowType = document.querySelector('input[name="show-type"]:checked').value
    theShowType = theShowType.toLowerCase()
    console.log("theShowType is:")
    console.log(theShowType)
    setShowType(theShowType)
    const searchString = `https://imdb-api.com/en/API/Search${theShowType}/k_j0x59844/${e.target[2].value}`
    const res = await fetch(searchString)
    const data = await res.json()
    getResults(data.results)
  }

  const getStreamingResults = async (streamingService, imdb_id, title, results, show_type) => {
  
  }

  useEffect(() => {
    console.log("streamingServices are:")
    console.log(streamingServices)
  }, [streamingServices])

  const checkStreaming = async (e) => {
    setStreamingServices([])
    const show_type = e.target.getAttribute('show_type')
    const imdb_id = e.target.getAttribute('imdb_id')
    const title = e.target.title
    let showToCheck = null
    let results = []
    const streamingServicesList=[
      'peacock',
      'netflix',
      'hulu',
      'prime',
      'disney', 
      'hbo'
    ]
    setStreamingId(imdb_id)
    const url = 'https://streaming-availability.p.rapidapi.com/search/pro'

    const headers = {
      'X-RapidAPI-Key': '153541ba38msh3a4675a0a844ccdp1a6a0cjsnc83d7caf9c90',
      'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
    }

    console.log("Running getStreamingResults")
    let promises = []
    for(let i=0; i < streamingServicesList.length; i++){
      let streamingService = streamingServicesList[i]
      promises.push(await new Promise((resolve, reject) => {
        let params = {
          country: 'us',
          service: streamingService,
          type: show_type,
          order_by: 'original_title',
          output_language: 'en',
          language: 'en',
          keyword: `${title}`
        }
        Axios.get(url, {
          params: params,
          headers: headers
        }).then(res =>{
          console.log("Initial res is:")
          console.log(res)
          if(res.data.total_pages > 1){
            console.log("Thinks there is more than 1 page.")
            for(let i=0; i < res.data.total_pages; i++){
              let page = i + 1
              Axios.get(url, {
                params: {
                  country: 'us',
                  service: streamingService,
                  type: show_type,
                  order_by: 'original_title',
                  page: page,
                  output_language: 'en',
                  language: 'en',
                  keyword: `${title}`
                },
                headers: headers
              }).then(res =>{
                console.log("This is in then statement with page number of:")
                console.log(page)
                console.log("With results of:")
                console.log(res.data.results)
                if(res.data.results.length > 0){
                  let usableResults
                  for(let result of res.data.results){
                    if(result.imdbID == imdb_id){
                      console.log("Found matching show.")
                      showToCheck = result
                    }
                    if(showToCheck !== null){
                      for(let key of Object.keys(showToCheck.streamingInfo)){
                        results.push(key)
                      }
                      console.log("About to resolve1 with results of:")
                      console.log(results)                      
                    }
                  }
                  return resolve(results)
                }
                else{
                  resolve()
                }
              })
              .catch((e) => {
                console.log("Catching1, with e:")
                console.log(e)
              })
            }
          }
          else{
            if(res.data.results.length > 0){
              let usableResults
              for(let result of res.data.results){
                if(result.imdbID == imdb_id){
                  console.log("Found match for show.")
                  showToCheck = result
                }
                if(showToCheck !== null){
                  for(let key of Object.keys(showToCheck.streamingInfo)){
                    results.push(key)
                  }
                  console.log("About to resolve2 with results of:")
                  console.log(results)
                }
              }
              return resolve(results)
            }
            else{
              console.log("Running resolve with no results.")
              resolve()
            }
          }
        }).catch(() => {
          console.log("Catching2, with e:")
          console.log(e)
        })
      }))
    }
    Promise.all(promises)
    .then((responses) => {
      let validResponses = []
      let finalArray
      let finalResults
      for(let response of responses){
        if(response.length == 0){
          console.log("Response is undefined.")
        }
        else{
          console.log("There is a valid response, which is:")
          console.log(response)
          validResponses.push(response)
          // removeDuplicates(uniqueResponses)
        }
      }
      if(validResponses.length == 0){
        console.log("There are no validResponses")
        setStreamingServices([noStreaming])
      }
      else{
        finalArray = [].concat(...validResponses)
        console.log("finalArray is:")
        console.log(finalArray)
        finalResults = ([...new Set(finalArray)])
        console.log("finalResults are:")
        console.log(finalResults)
        setStreamingServices([...finalResults])
      }
    })
  }

  const [sliderPosition, setSliderPosition] = useState(0)

  const resetSlider = () => {
    setSliderPosition(0)
    getResults([])
    setStreamingServices([])
  }

  return (
    <Router>
      <Header resetSlider={resetSlider} Link={Link} loginStatus={loginStatus} setName={setName} setEmail={setEmail} setUser={setUser} setLoginStatus={setLoginStatus} LogoutForm={LogoutForm} />
      <Routes>
        <Route path="/" element={<Home user={user} Link={Link}  results={results} getResults={getResults} fetchResults={fetchResults} streamingServices={streamingServices} checkStreaming={checkStreaming} sliderPosition={sliderPosition} setSliderPosition={setSliderPosition} streamingId={streamingId} noStreaming={noStreaming} showType={showType} series={series} getSeries={getSeries} movies={movies} getMovies={getMovies} />} />

        <Route path="register" element={<RegisterForm setUser={setUser} />} />

        <Route path="login" element={loginStatus ? <Dashboard name={name} email={email} /> : <LoginForm setLoginStatus={setLoginStatus} loginStatus={loginStatus} setUser={setUser} setUserId={setUserId} />} />

        <Route path='my-series' element={<SeriesList user={user} series={series} getSeries={getSeries} movies={movies} getMovies={getMovies} Link={Link} checkStreaming={checkStreaming} sliderPosition={sliderPosition} setSliderPosition={setSliderPosition} streamingServices={streamingServices} streamingId={streamingId} noStreaming={noStreaming} changedRating={changedRating} setChangedRating={setChangedRating} />} />

        <Route path='my-movies' element={<MoviesList movies={movies} getMovies={getMovies} series={series} getSeries={getSeries} Link={Link} checkStreaming={checkStreaming} sliderPosition={sliderPosition} setSliderPosition={setSliderPosition} streamingServices={streamingServices} changedRating={changedRating} setChangedRating={setChangedRating} streamingId={streamingId} />} />

      </Routes>
    </Router>
  )
}

if (document.getElementById('root')) {
  ReactDOM.render(<App />, document.getElementById('root'));
}

export default App;
