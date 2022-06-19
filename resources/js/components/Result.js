import { useState, useEffect } from 'react'
import SeriesList from './SeriesList';

const $ = require( "jquery" );

const axios = require("axios");

const Result = ({ title, image, id, user, streamingServices, getResults, checkStreaming, showType, streamingId, noStreaming, series, getSeries, movies, getMovies, selectedResult }) => {

  const myShow = async (e) => {
    e.preventDefault();
    showType = showType.toLowerCase()
    const data = {
      title: title,
      image_url: image,
      imdb_id: id,
      show_type: showType
    } 
    console.log("Data is:")
    console.log(data)
    await axios.post('api/shows', data)
    .then(function(response){
      console.log("response from .then of myShow is:")
      console.log(response)
      if(showType == 'series'){
        console.log("Knows showType is series.")
        series.some(show => {
          if (show.id == response.data) {
            getSeries([...series, {
              title: title,
              image_url: image,
              id: response.data,
              imdb_id: id,
              show_type: showType
            }])
          }
        });
      }
      else if(showType == 'movie'){
        console.log("Knows showType is movie")
        movies.some(movie => {
          if(movie.id == response.data){
            getMovies([...movies, {
              title: title,
              image_url: image,
              id: response.data,
              imdb_id: id,
              show_type: showType
            }])
          }
        })
      }
    }).catch((e) => {
      console.log(e)
    })
  }

  return (
    <div id={id} className={`result ${selectedResult && 'single'}`}>
      <h2 id={id}>{title}</h2>
      <img id={id} src={image}></img>
      {streamingServices.length > 0 && streamingId == id && streamingServices != noStreaming &&
      <h4>Streaming on:</h4>}
      {streamingServices.length > 0 && streamingId == id && streamingServices.map((service, key) => (
        <p key={key}>{service}</p>
      ))}
      <form id={id} onSubmit={myShow} method="POST" action="/api/shows" name='show-form' className='show-form'>
        <input type ='hidden' name='title' value={title} />
        <input type ='hidden' name='image_url' value={image} />
        <input type ='hidden' name='imdb_id' value={id} />
        <input type ='hidden' name='sbow_type' value={showType} />
        <input type="hidden" name="_token" value="{{ csrf_token() }}" />
        {user && 
          <input id={id} type='submit' className='order' name='addShowBtn' value='Add Show' />
        }
      </form>
      <button id={id} className='streamCheck' show_type={showType} imdb_id={id} title={title} onClick={checkStreaming}>Stream Check</button>
    </div>
  )
}

export default Result
