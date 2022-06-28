import Axios from 'axios'

import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

import Slider from './Slider.js'

const MoviesList = ({ movies, getMovies, Link, sliderPosition, setSliderPosition, checkStreaming, streamingId, streamingServices, showRatings, setShowRatings, loginStatus, user, noStreaming, spinnerDegree, setSpinnerDegree, isLoading, resizeResetSlider, stateRating, setStateRating }) => {

  return (
    <>
      <div className='show-index'>
        <div className='shows__container'>
          <h2>My Movies</h2>
          <Slider shows={movies} getMovies={getMovies} movies={movies} Link={Link} sliderPosition={sliderPosition} setSliderPosition={setSliderPosition} checkStreaming={checkStreaming}streamingId={streamingId}  streamingServices={streamingServices} showRatings={showRatings} setShowRatings={setShowRatings} noStreaming={noStreaming} spinnerDegree={spinnerDegree} setSpinnerDegree={setSpinnerDegree} isLoading={isLoading} resizeResetSlider={resizeResetSlider} stateRating={stateRating} setStateRating={setStateRating} />
        </div>
      </div> 
    </>
  )
}

export default MoviesList
