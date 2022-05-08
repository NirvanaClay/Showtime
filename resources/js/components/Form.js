import Axios from 'axios'

import { useEffect, useState } from 'react'

import Result from './Result.js'

const Form = ({ results, details, getResults, getDetails, shows, getShows, userId, loggedInUser, setStreamingServices, streamingServices, getStreamResults } ) => {

  return (
    <div className='form'>
      <form 
        onSubmit={getResults}>
        <input type='text'></input>
        <button>Search</button>
      </form>
      <div className='results'>
        {results ? results.map((result) => (
          <div key={result.id} className='result' onClick={getDetails} id={result.id}>
            <Result title={result.title} image={result.image} id={result.id} details={details} shows={shows} getShows={getShows} userId={userId} loggedInUser={loggedInUser} setStreamingServices={setStreamingServices} streamingServices={streamingServices} getStreamResults={getStreamResults} />
          </div>
        )) : "No results"}  
      </div>
    </div>
  )
}

export default Form
