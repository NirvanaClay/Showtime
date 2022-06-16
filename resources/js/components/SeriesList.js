import Axios from 'axios'

import { useEffect, useState } from 'react'

import Show from './Show.js'
import Slider from './Slider.js'

const SeriesList = ({ series, getSeries, Link, sliderPosition, setSliderPosition, checkStreaming, streamingServices, streamingId, noStreaming, showRatings, setShowRatings }) => {

  return (
    <div className='show-index'>
      <div className='shows__container'>
        <h2>My Series</h2>
        <Slider series={series} getSeries={getSeries} shows={series} Link={Link} sliderPosition={sliderPosition} setSliderPosition={setSliderPosition} checkStreaming={checkStreaming} streamingServices={streamingServices} streamingId={streamingId} noStreaming={noStreaming}  showRatings={showRatings} setShowRatings={setShowRatings} />
      </div>
    </div>
  )
}

export default SeriesList