const axios = require("axios");

import { useEffect, useState } from 'react'

import Show from './Show'
import Result from './Result'

const Slider = ({ user, fetchResults, results, getResults, shows, series, getSeries, movies, getMovies, Link, checkStreaming, sliderPosition, setSliderPosition, streamingServices, streamingId, noStreaming, showType, showRatings, setShowRatings, isLoading, spinnerDegree, setSpinnerDegree, selectedResult, setSelectedResult, resizeResetSlider }) => {

  const [leftArrowVisibility, setLeftArrowVisibility] = useState(false)
  const [rightArrowVisibility, setRightArrowVisibility] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [rightHover, setRightHover] = useState(false)
  const [leftHover, setLeftHover] = useState(false)

  const [dimensions, setDimensions] = useState({ 
    height: window.innerHeight,
    width: window.innerWidth
  })

  useEffect(() => {
    function handleResize() {
      console.log("Running resize screen effect.")
      resizeResetSlider()
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })  
    }
    window.addEventListener('resize', handleResize)
    return _ => {
      window.removeEventListener('resize', handleResize)
    }
  })
    

  const large = window.matchMedia('(max-width: 992px)');
  const medium = window.matchMedia('(max-width: 768px)');
  const small = window.matchMedia('(max-width: 576px)');
  const xSmall = window.matchMedia('(max-width: 320px)');

  let sliderWidth
  let showsPerPage

  if(large.matches && !medium.matches && !small.matches && !xSmall.matches){
    sliderWidth = 750
    showsPerPage = 3
    console.log("large matches, with a sliderWidth of:")
    console.log(sliderWidth)
  }
  else if (medium.matches && !small.matches && !xSmall.matches){
    sliderWidth=600
    showsPerPage = 3
    console.log("medium matches, with a sliderWidth of:")
    console.log(sliderWidth)
  } 
  else if(small.matches && !xSmall.matches){
    sliderWidth=320;
    showsPerPage = 2
    console.log("small matches, with a sliderWidth of:")
    console.log(sliderWidth)
  } 
  else if(xSmall.matches){
    sliderWidth=240; 
    showsPerPage = 2
    console.log("xSmall matches, with a sliderWidth of:")
    console.log(sliderWidth)
  }  
  else {
    sliderWidth=900;
    showsPerPage = 4
    console.log("Desktop matches, with a sliderWidth of:")
    console.log(sliderWidth)
  }

  useEffect(() => {
    if(shows){
      shows.sort((a, b) => a.title.localeCompare(b.title))
      console.log("shows.length is:")
      console.log(shows.length)
      const showLength = shows.length
      if(showLength % showsPerPage != 0){
        setTotalPages(Math.floor(shows.length / showsPerPage) + 1)
      }
      else{
        setTotalPages(Math.floor(shows.length / showsPerPage))
      }
      setCurrentPage((sliderPosition / -sliderWidth) + 1)
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
      const showLength = results.length
      if(showLength % showsPerPage != 0){
        setTotalPages(Math.floor(results.length / showsPerPage) + 1)
      }
      else{
        setTotalPages(Math.floor(results.length / showsPerPage))
      }
      setCurrentPage((sliderPosition / -sliderWidth) + 1)
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
    setSliderPosition(sliderPosition + sliderWidth)
  }

  const moveSliderRight = (e) => {
    console.log("Moving slider right.")
    console.log("With a sliderWidth of:")
    console.log(sliderWidth)
    setSliderPosition(sliderPosition - sliderWidth)
  }
  let seriesSliderPosition = {
    left: sliderPosition + 'px'
  }

  const chooseResult = (e) => {
    setSliderPosition(0)
    setSelectedResult(true)
    getResults(results.filter((result) => result.id == e.target.id))
  }

  useEffect(() => {
    console.log("in Slider effect, results are:")
    console.log(results)
  }, [results])

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
          <Show title={show.title} image={show.image_url} imdb_id={show.imdb_id} id={show.id} rating={show.pivot && show.pivot.rating ? show.pivot.rating : 0} pivotId={show.pivot && show.pivot.show_id} pivotUser={show.pivot && show.pivot.user_id} checkStreaming={checkStreaming} streamingServices={streamingServices} streamingId={streamingId} show_type={show.show_type} noStreaming={noStreaming} series={series} getSeries={getSeries} movies={movies} getMovies={getMovies} isLoading={isLoading} spinnerDegree={spinnerDegree} setSpinnerDegree={setSpinnerDegree} />
        </div>
      ))}
      {results && results.map((result) => (
        <div key={result.id} onClick={chooseResult}>
          <Result title={result.title} image={result.image} id={result.id} user={user} streamingServices={streamingServices} fetchResults={fetchResults} checkStreaming={checkStreaming} showType={showType} streamingId={streamingId} noStreaming={noStreaming} series={series} getSeries={getSeries} movies={movies} getMovies={getMovies} selectedResult={selectedResult} isLoading={isLoading} spinnerDegree={spinnerDegree} setSpinnerDegree={setSpinnerDegree} />
        </div>))}  
      </div>
    </div>
  )
}

export default Slider
