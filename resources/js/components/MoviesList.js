import Axios from 'axios'

import { useEffect, useState } from 'react'

import Show from './Show.js'
import Slider from './Slider.js'

const MoviesList = ({ movies, getMovies, Link, sliderPosition, setSliderPosition, checkStreaming }) => {

  return (
    <div className='show-index'>
      <div className='shows__container'>
        <h2>My Movies</h2>
        <Slider shows={movies} getMovies={getMovies} movies={movies} Link={Link} sliderPosition={sliderPosition} setSliderPosition={setSliderPosition} checkStreaming={checkStreaming} />
      </div>
      
    </div>
  )
}

export default MoviesList
