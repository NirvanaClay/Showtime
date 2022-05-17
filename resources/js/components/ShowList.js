import Axios from 'axios'

import { useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

import Show from './Show.js'
import LeftArrow from './LeftArrow'
import RightArrow from './RightArrow'

const ShowList = ({ shows, getShows, Link, isLeftHovering, setIsLeftHovering, isRightHovering, setIsRightHovering, leftArrowVisibility, setLeftArrowVisibility, rightArrowVisibility, setRightArrowVisibility, moveSliderLeft, moveSliderRight, sliderPosition }) => {

    let leftPosition = {
      left: sliderPosition + 'px'
    }

  return (
    <div className='show-index'>
      <h2>My Shows</h2>
      <div className='shows__container' >
        <>
          <LeftArrow isLeftHovering={isLeftHovering} setIsLeftHovering={setIsLeftHovering} shows={shows} leftArrowVisibility={leftArrowVisibility} setLeftArrowVisibility={setLeftArrowVisibility} moveSliderLeft={moveSliderLeft} sliderPosition={sliderPosition} />
          <RightArrow isRightHovering={isRightHovering} setIsRightHovering={setIsRightHovering} shows={shows} rightArrowVisibility={rightArrowVisibility} setRightArrowVisibility={setRightArrowVisibility} moveSliderRight={moveSliderRight} sliderPosition={sliderPosition} />
        </>
        <div className='shows slider' style={leftPosition}>
          {shows ? shows.map((show) => (
            <div key={show.id} id={show.id}>
              <Show title={show.title} image={show.image_url} shows={shows} id={show.id} rating={show.rating} getShows={getShows} />
            </div>
          )) : <p><Link to='/login'>Login</Link> or <Link to='/register'>register</Link> to add shows, rate them, and share your thoughts.</p>}  
          </div>
      </div>
    </div>
  )
}

export default ShowList