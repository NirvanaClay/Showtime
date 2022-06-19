import Axios from 'axios'

import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

import Slider from './Slider.js'

const MoviesList = ({ movies, getMovies, Link, sliderPosition, setSliderPosition, checkStreaming, streamingId, streamingServices, showRatings, setShowRatings, loginStatus }) => {

  return (
    <>
    {loginStatus ?
      <div className='show-index'>
        <div className='shows__container'>
          <h2>My Movies</h2>
          <Slider shows={movies} getMovies={getMovies} movies={movies} Link={Link} sliderPosition={sliderPosition} setSliderPosition={setSliderPosition} checkStreaming={checkStreaming}streamingId={streamingId}  streamingServices={streamingServices} showRatings={showRatings} setShowRatings={setShowRatings} />
        </div>
      </div> 
      : <Navigate replace to="/login" />}
    </>
  )
}

export default MoviesList
