import { useEffect, useState } from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Link } from 'react-router-dom'

import React from 'react';
import ReactDOM from 'react-dom';

import Axios from 'axios'

import Form from './components/Form.jsx'
import StreamService from './components/StreamService.jsx'
import Result from './components/Result.jsx'
import ShowUser from './components/ShowUser.jsx'
import ShowGuest from './components/ShowGuest.jsx'
import RegisterForm from './components/RegisterForm.jsx'
import Greeting from './components/Greeting.jsx'

import $ from 'jquery'
import axios from 'axios';

const Home = ({ user, Link, streamingServices, fetchResults, results, getResults, checkStreaming, sliderPosition, setSliderPosition, showType, setShowType, streamingId, noStreaming, series, getSeries, movies, getMovies, isLoading, spinnerDegree, setSpinnerDegree, failedSearch, setFailedSearch, resizeResetSlider }) => {

  console.log("Home component.")
  return (
    <div className="home">
      <div className='bg-img'></div>
      <Form user={user} Link={Link} results={results} getResults={getResults} fetchResults={fetchResults} sliderPosition={sliderPosition} setSliderPosition={setSliderPosition} checkStreaming={checkStreaming} streamingServices={streamingServices} showType={showType} setShowType={setShowType} streamingId={streamingId} noStreaming={noStreaming} series={series} getSeries={getSeries} movies={movies} getMovies={getMovies} isLoading={isLoading} spinnerDegree={spinnerDegree} setSpinnerDegree={setSpinnerDegree} failedSearch={failedSearch} setFailedSearch={setFailedSearch} resizeResetSlider={resizeResetSlider} />

    </div>
  );
}

export default Home;
