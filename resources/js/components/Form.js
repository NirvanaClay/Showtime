import Axios from 'axios'

import { useEffect, useState } from 'react'

import Result from './Result.js'
import LeftArrow from './LeftArrow'
import RightArrow from './RightArrow'

const Form = ({ results, details, fetchResults, getResults, getDetails, shows, getShows, userId, loggedInUser, setStreamingServices, streamingServices, getStreamResults, isLeftHovering, setIsLeftHovering, isRightHovering, setIsRightHovering, leftArrowVisibility, setLeftArrowVisibility, rightArrowVisibility, setRightArrowVisibility, moveSliderLeft, moveSliderRight, sliderPosition } ) => {

  let leftPosition = {
    left: sliderPosition + 'px'
  }

  return (
    <div className='form'>
      <h1>Search Shows And Find Where To Stream Them</h1>
      <form 
        onSubmit={fetchResults}>
        <input type='text'></input>
        <button>Search</button>
      </form>
      <div className='results-container'>
        <>
          <LeftArrow isLeftHovering={isLeftHovering} setIsLeftHovering={setIsLeftHovering} results={results} leftArrowVisibility={leftArrowVisibility} setLeftArrowVisibility={setLeftArrowVisibility} rightArrowVisibility={rightArrowVisibility} setRightArrowVisibility={setRightArrowVisibility} moveSliderLeft={moveSliderLeft} moveSliderRight={moveSliderRight} sliderPosition={sliderPosition} />
          <RightArrow isRightHovering={isRightHovering} setIsRightHovering={setIsRightHovering} results={results} leftArrowVisibility={leftArrowVisibility} setLeftArrowVisibility={setLeftArrowVisibility} rightArrowVisibility={rightArrowVisibility} setRightArrowVisibility={setRightArrowVisibility} moveSliderLeft={moveSliderLeft} moveSliderRight={moveSliderRight} sliderPosition={sliderPosition} />
        </>
        <div className='results slider' style={leftPosition}>
          {results && results.map((result) => (
            <div key={result.id} onClick={getDetails} id={result.id}>
              <Result title={result.title} image={result.image} id={result.id} details={details} shows={shows} getShows={getShows} userId={userId} loggedInUser={loggedInUser} setStreamingServices={setStreamingServices} streamingServices={streamingServices} getStreamResults={getStreamResults} fetchResults={fetchResults} getResults={getResults} />
            </div>
          ))}  
        </div>
      </div>
    </div>
  )
}

export default Form
