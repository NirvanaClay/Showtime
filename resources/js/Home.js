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

const Home = ({ loggedInUser, Link, streamingServices, fetchResults, results, checkStreaming, sliderPosition, setSliderPosition, showType, streamingId, noStreaming }) => {

  return (
    <div className="home">
      <div className='bg-img'></div>
      <Form  loggedInUser={loggedInUser} Link={Link} results={results} fetchResults={fetchResults} sliderPosition={sliderPosition} setSliderPosition={setSliderPosition} checkStreaming={checkStreaming} streamingServices={streamingServices} showType={showType} streamingId={streamingId} noStreaming={noStreaming} />

    </div>
  );
}

export default Home;
