import Axios from 'axios'

import { useEffect, useState } from 'react'

import Result from './Result.js'
import Slider from './Slider'

const Form = ({ loggedInUser, Link, results, fetchResults, streamingServices, checkStreaming, sliderPosition, setSliderPosition, showType, streamingId, noStreaming, series, getSeries, movies, getMovies }) => {

  return (
    <div className='form'>
      <h1>Search Shows And Find Where To Stream Them</h1>
      <form 
        onSubmit={fetchResults}>
        <div className='radio-buttons'>
          <div className='radio-button'>
            <label htmlFor='series'>Series</label>
            <input type='radio' id='Series' name='show-type' value="Series" required></input>
          </div>
          <div className='radio-button'>
            <label htmlFor='movies'>Movie</label>
            <input type='radio' id='Movie' name='show-type' value="Movie" required></input>
          </div>
        </div>
        <input type='text'></input>
        <button>Search</button>
      </form>
      <div className='results-container'>
          <Slider loggedInUser={loggedInUser} results={results} fetchResults={fetchResults} Link={Link} sliderPosition={sliderPosition} setSliderPosition={setSliderPosition} checkStreaming={checkStreaming} streamingServices={streamingServices} showType={showType} streamingId={streamingId} noStreaming={noStreaming} series={series} getSeries={getSeries} movies={movies} getMovies={getMovies} /> 
      </div>
    </div>
  )
}

export default Form
