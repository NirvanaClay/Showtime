import Axios from 'axios'

import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

import Slider from './Slider.js'

const SeriesList = ({ series, getSeries, Link, sliderPosition, setSliderPosition, checkStreaming, streamingServices, streamingId, noStreaming, showRatings, setShowRatings, loginStatus }) => {

  return (
    <>
    {loginStatus ? 
         <div className='show-index'>
         <div className='shows__container'>
           <h2>My Series</h2>
           <Slider series={series} getSeries={getSeries} shows={series} Link={Link} sliderPosition={sliderPosition} setSliderPosition={setSliderPosition} checkStreaming={checkStreaming} streamingServices={streamingServices} streamingId={streamingId} noStreaming={noStreaming}  showRatings={showRatings} setShowRatings={setShowRatings} />
         </div>
       </div> 
    : <Navigate replace to="/login" />}
    </>
  )
}

export default SeriesList