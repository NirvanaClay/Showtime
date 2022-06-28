import Axios from 'axios'

import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

import Slider from './Slider.js'

const SeriesList = ({ series, getSeries, Link, sliderPosition, setSliderPosition, checkStreaming, streamingServices, streamingId, noStreaming, showRatings, setShowRatings, loginStatus, isLoading, spinnerDegree, setSpinnerDegree, resizeResetSlider, stateRating, setStateRating }) => {

  return (
    <>
      <div className='show-index'>
        <div className='shows__container'>
          <h2>My Series</h2>
          <Slider series={series} getSeries={getSeries} shows={series} Link={Link} sliderPosition={sliderPosition} setSliderPosition={setSliderPosition} checkStreaming={checkStreaming} streamingServices={streamingServices} streamingId={streamingId} noStreaming={noStreaming} showRatings={showRatings} setShowRatings={setShowRatings} isLoading={isLoading} spinnerDegree={spinnerDegree} setSpinnerDegree={setSpinnerDegree} resizeResetSlider={resizeResetSlider} stateRating={stateRating} setStateRating={setStateRating} />
        </div>
      </div> 
    </>
  )
}

export default SeriesList