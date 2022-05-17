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

const Home = ({ loginStatus, name, loggedInUser, Link, streamingServices, shows, getShows, fetchResults, getResults, results, getStreamResults, isLeftHovering, setIsLeftHovering, isRightHovering, setIsRightHovering, leftArrowVisibility, setLeftArrowVisibility, rightArrowVisibility, setRightArrowVisibility, moveSliderLeft, moveSliderRight, sliderPosition }) => {

  return (
    <div className="home">
      <div className='bg-img'></div>
      {(Array.isArray(streamingServices) && streamingServices.length > 0) &&
        <h1 className='streams-heading'>Streaming on:</h1>
      } 
      {typeof streamingServices == 'string' &&
        <h2 className='streaming-services'>{streamingServices}</h2>}
      {(Array.isArray(streamingServices) && streamingServices.length > 0) &&
      streamingServices.map((streamingService, index) => (
        <div key={index}>
          <h2 className='streaming-services' key={index}>{streamingService}</h2>
        </div>
      ))}
      {/* {loggedInUser && <Greeting loginStatus={loginStatus} name={name} />} */}
      <Form fetchResults={fetchResults} getResults={getResults} results={results} getStreamResults={getStreamResults} loggedInUser={loggedInUser} shows={shows} getShows={getShows} isLeftHovering={isLeftHovering} setIsLeftHovering={setIsLeftHovering} isRightHovering={isRightHovering} setIsRightHovering={setIsRightHovering} leftArrowVisibility={leftArrowVisibility} setLeftArrowVisibility={setLeftArrowVisibility} rightArrowVisibility={rightArrowVisibility} setRightArrowVisibility={setRightArrowVisibility} moveSliderLeft={moveSliderLeft} moveSliderRight={moveSliderRight} sliderPosition={sliderPosition} />

    </div>
  );
}

export default Home;
