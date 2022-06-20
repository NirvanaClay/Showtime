import Axios from 'axios'

import { useEffect, useState } from 'react'

import Result from './Result.js'
import Slider from './Slider'

const Form = ({ user, Link, results, getResults, fetchResults, streamingServices, checkStreaming, sliderPosition, setSliderPosition, showType, setShowType, streamingId, noStreaming, series, getSeries, movies, getMovies }) => {

  const [failedSearch, setFailedSearch] = useState(false)

  const addShowType = (e) => {
    const theShowType = (e.target.value).toLowerCase();
    setShowType(theShowType)
  }

  const checkShowType = () => {
    if(!showType){
      setFailedSearch(true)
    }
  }

  const [isLoading, setIsLoading] = useState(false)
  const [spinnerDegree, setSpinnerDegree] = useState(0)

  useEffect(() => {
    console.log("spinnerDegree is:")
    console.log(spinnerDegree)
  }, [spinnerDegree])

  return (
    <div className='form'>
      <h1>Search Shows And Find Where To Stream Them</h1>
      <form 
        onSubmit={fetchResults}>
        <div className='radio-buttons'>
          <div className='radio-button'>
            <label htmlFor='series'>Series</label>
            <input type='radio' id='Series' name='show-type' value="Series" onClick={addShowType}></input>
          </div>
          <div className='radio-button'>
            <label htmlFor='movies'>Movie</label>
            <input type='radio' id='Movie' name='show-type' value="Movie" onClick={addShowType}></input>
          </div>
        </div>
        <p className={`selection_warning ${failedSearch && !showType && 'visible'}`}>Please select a show type.</p>
        <input type='text'></input>
        <button onClick={checkShowType}>Search</button>
        <p className='streaming-list'>*We search Netflix, Hulu, Amazon Prime, HBO, Disney+, and Peacock.</p>
      </form>
      <div className='results-container'>
          <Slider user={user} results={results} getResults={getResults} fetchResults={fetchResults} Link={Link} sliderPosition={sliderPosition} setSliderPosition={setSliderPosition} checkStreaming={checkStreaming} streamingServices={streamingServices} showType={showType} streamingId={streamingId} noStreaming={noStreaming} series={series} getSeries={getSeries} movies={movies} getMovies={getMovies} /> 
      </div>
    </div>
  )
}

export default Form
