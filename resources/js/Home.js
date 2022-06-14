import { useEffect, useState } from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Link } from 'react-router-dom'

import React from 'react';
import ReactDOM from 'react-dom';

import Axios from 'axios'

import Form from './components/Form.js'
import StreamService from './components/StreamService.js'
import Result from './components/Result.js'
import ShowUser from './components/ShowUser.js'
import ShowGuest from './components/ShowGuest.js'
import RegisterForm from './components/RegisterForm.js'
import Greeting from './components/Greeting.js'

import $ from 'jquery'
import axios from 'axios';

const Home = ({ user, Link, streamingServices, fetchResults, results, getResults, checkStreaming, sliderPosition, setSliderPosition, showType, streamingId, noStreaming, series, getSeries, movies, getMovies }) => {

  return (
    <div className="home">
      <div className='bg-img'></div>
      <Form user={user} Link={Link} results={results} getResults={getResults} fetchResults={fetchResults} sliderPosition={sliderPosition} setSliderPosition={setSliderPosition} checkStreaming={checkStreaming} streamingServices={streamingServices} showType={showType} streamingId={streamingId} noStreaming={noStreaming} series={series} getSeries={getSeries} movies={movies} getMovies={getMovies} />

    </div>
  );
}

export default Home;
