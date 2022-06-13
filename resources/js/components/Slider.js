import Axios from 'axios'

import { useEffect, useState } from 'react'

import Show from './Show'
import Result from './Result'

const Slider = ({ loggedInUser, fetchResults, results, shows, series, getSeries, movies, getMovies, Link, checkStreaming, sliderPosition, setSliderPosition, streamingServices, streamingId, noStreaming, showType, changedRating, setChangedRating }) => {

  const [leftArrowVisibility, setLeftArrowVisibility] = useState(false)
  const [rightArrowVisibility, setRightArrowVisibility] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [rightHover, setRightHover] = useState(false)
  const [leftHover, setLeftHover] = useState(false)

  useEffect(() => {
    if(shows){
      console.log("shows.length is:")
      console.log(shows.length)
      const showLength = shows.length
      if(showLength % 4 != 0){
        setTotalPages(Math.floor(shows.length / 4) + 1)
      }
      else{
        setTotalPages(Math.floor(shows.length / 4))
      }
      setCurrentPage((sliderPosition / -900) + 1)
      console.log("totalPages is:")
      console.log(totalPages)
      console.log("currentPage is:")
      console.log(currentPage)    
      console.log("sliderPosition is:")
      console.log(sliderPosition)
      if(currentPage < totalPages){
        console.log("Current page is less than total pages.")
        setRightArrowVisibility(true)
      }
      else{
        console.log("Current page is not less than total pages.")
        setRightArrowVisibility(false)
      }
      if(currentPage > 1){
        setLeftArrowVisibility(true)
      }
      else{
        setLeftArrowVisibility(false)
      }
    }
    if(results){
      console.log("results.length is:")
      console.log(results.length)
      setTotalPages(Math.floor(results.length / 4) + 1)
      setCurrentPage((sliderPosition / -900) + 1)
      console.log("totalPages is:")
      console.log(totalPages)
      console.log("currentPage is:")
      console.log(currentPage)    
      console.log("sliderPosition is:")
      console.log(sliderPosition)
      if(currentPage < totalPages){
        setRightArrowVisibility(true)
      }
      else{
        setRightArrowVisibility(false)
      }
      if(currentPage > 1){
        setLeftArrowVisibility(true)
      }
      else{
        setLeftArrowVisibility(false)
      }
    }
  }, [shows, results, sliderPosition, currentPage, totalPages])

  const toggleLeftHover = () => {
    setLeftHover(!leftHover)
  }

  const toggleRightHover = () => {
    setRightHover(!rightHover)
  }

  const moveSliderLeft = (e) => {
    setSliderPosition(sliderPosition + 900)
  }

  const moveSliderRight = (e) => {
    console.log("Moving slider right.")
    console.log("Setting new value as sliderPosition - 900, which is:")
    console.log(sliderPosition - 900)
    setSliderPosition(sliderPosition - 900)
  }
  let seriesSliderPosition = {
    left: sliderPosition + 'px'
  }

  return (
    <div className='slider-container'>
      <div className={`left-arrow__container ${leftHover && "inverted-bg"} ${leftArrowVisibility && "visible"}`} onMouseEnter={toggleLeftHover} onMouseLeave={toggleLeftHover} onClick={moveSliderLeft}>
        <i className={`fas fa-arrow-left left-arrow ${leftHover && "inverted"}`}></i>
      </div> 
      <div className={`right-arrow__container ${rightHover && "inverted-bg"} ${rightArrowVisibility && "visible"}`} onMouseEnter={toggleRightHover} onMouseLeave={toggleRightHover} onClick={moveSliderRight}>
        <i className={`fas fa-arrow-right right-arrow ${rightHover && "inverted"}`}></i>
      </div>
      <div className='shows' style={seriesSliderPosition}>
      {shows && shows.map((show) => (
        <div key={show.id}>
          <Show title={show.title} image={show.image_url} imdb_id={show.imdb_id} id={show.id} rating={show.rating} checkStreaming={checkStreaming} streamingServices={streamingServices} streamingId={streamingId} show_type={show.show_type} noStreaming={noStreaming} series={series} getSeries={getSeries} movies={movies} getMovies={getMovies} changedRating={changedRating} setChangedRating={setChangedRating} />
        </div>
      ))}
      {results && results.map((result) => (
        <div key={result.id}>
          <Result title={result.title} image={result.image} id={result.id} loggedInUser={loggedInUser} streamingServices={streamingServices} fetchResults={fetchResults} checkStreaming={checkStreaming} showType={showType} streamingId={streamingId} noStreaming={noStreaming} series={series} getSeries={getSeries} movies={movies} getMovies={getMovies} />
        </div>))}  
      </div>
    </div>
  )
}

export default Slider
