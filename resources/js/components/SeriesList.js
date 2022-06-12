import Axios from 'axios'

import { useEffect, useState } from 'react'

import Show from './Show.js'
import Slider from './Slider.js'

const SeriesList = ({ series, Link, sliderPosition, setSliderPosition, checkStreaming, streamingServices, streamingId, noStreaming }) => {

  return (
    <div className='show-index'>
      <div className='shows__container'>
        <h2>My Series</h2>
        <Slider shows={series} Link={Link} sliderPosition={sliderPosition} setSliderPosition={setSliderPosition} checkStreaming={checkStreaming} streamingServices={streamingServices} streamingId={streamingId} noStreaming={noStreaming} />
      </div>
    </div>
  )
}

export default SeriesList