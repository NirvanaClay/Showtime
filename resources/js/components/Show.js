import { useState, useEffect } from 'react'
const axios = require("axios");

import $ from 'jquery'
import { set } from 'lodash';

const Show = ({ title, image, id, imdb_id, rating, checkStreaming, streamingServices, streamingId, show_type, noStreaming, series, getSeries, movies, getMovies, setRatingValue, pivotId, pivotUser, isLoading }) => {

  const [stateRating, setStateRating] = useState([rating])
  const [previewRating, setPreviewRating] = useState(rating)

  useEffect(() =>{
    const checkRating = (e) => {
      let stars = document.querySelectorAll('i')
      for(let star of stars){
        if(star.parentElement.parentElement.parentElement.id == id){
          if(star.getAttribute('value') <= stateRating){
            star.classList.add('fas')
          }
          else{
            star.classList.remove('fas')
          }
        }
      }
    }
    checkRating()
  }, [stateRating])

  const addRating = async (e) => {
    e.preventDefault()
    const newRating = parseInt(e.target.getAttribute('value'))
    console.log("id for addRating is:")
    console.log(id)
    console.log("newRating is:")
    console.log(newRating)
    setStateRating(newRating)
    await axios.post(`/api/shows/${id}`, {
      _method: 'PUT',
      id: id,
      rating: newRating
    })
  }

  const deleteShow = async (e) => {
    e.preventDefault();
    axios.delete(`/api/shows/${id}`)
    if(series){
      getSeries(series.filter((show) => show.id !== id))
    }
    if(movies){
      getMovies(movies.filter((movie) => movie.id !== id))
    }
  }

  const addRatingPreview = (e) => {      
    let stars = document.querySelectorAll('i')
    for(let star of stars){
      if(star.parentElement.parentElement.parentElement.id == id){
        if(star.getAttribute('value') <= e.target.getAttribute('value')){
          star.classList.add('fas')
        }
        else{
          star.classList.remove('fas')
        }
      }
    }
  }

  const removeRatingPreview = (e) => {  
    let stars = document.querySelectorAll('i')
    for(let star of stars){
      if(star.parentElement.parentElement.parentElement.id == id){
        if(star.getAttribute('value') <= stateRating){
          star.classList.add('fas')
        }
        else{
          star.classList.remove('fas')
        }
      }
    }
  }

  const [spinnerDegree, setSpinnerDegree] = useState(0)

  useEffect(() => {
    if(isLoading){
      const interval = setInterval(() => {
        setSpinnerDegree(spinnerDegree + 90)
        console.log("set spinner degree, which should be:")
        console.log(spinnerDegree + 90)
      }, 1);
      return () => clearInterval(interval);
    }
    else{

    }
  }, [spinnerDegree, isLoading]);

  return (
    <div className='show'>
      <h3>{title}</h3>
      <img src={image} />
      {streamingId == imdb_id &&
          <div className={`loading ${isLoading && 'visible'}`}>
            <i className="fas fa-spinner" style={{transform: `rotate(${spinnerDegree}deg)`}}></i>
          </div>
      }
      {streamingServices.length > 0 && streamingId == imdb_id && streamingServices != noStreaming &&
      <h4>Streaming on:</h4>}
      {streamingServices.length > 0 && streamingServices != noStreaming && streamingId == imdb_id && streamingServices.map((service, key) => (
        <img key={key} src={service} className='streaming-image'></img>
      ))}
      {streamingServices == noStreaming && streamingId == imdb_id &&
        <p>{streamingServices}</p>
      }
      <div className='stars-container' id={id}>
        <form action='/api/shows/{id}' method='POST'>
          <input type="hidden" name="_method" value="PUT" />
          <input type ='hidden' name='id' value={id} className='id' />
          <input type="hidden" name="_token" value="{{ csrf_token() }}" />
          <input type='hidden' className='rating' name='rating' value={stateRating} />
          <button type='submit'>
            <i className="far fa-star" onMouseEnter={addRatingPreview} onMouseLeave={removeRatingPreview} onClick={addRating} value={1}></i>
          </button>
          <button type='submit'>
            <i className="far fa-star" onMouseEnter={addRatingPreview} onMouseLeave={removeRatingPreview} onClick={addRating} value={2}></i>
          </button>
          <button type='submit'>
            <i className="far fa-star" onMouseEnter={addRatingPreview} onMouseLeave={removeRatingPreview} onClick={addRating} value={3}></i>
          </button>
          <button type='submit'>
            <i className="far fa-star" onMouseEnter={addRatingPreview} onMouseLeave={removeRatingPreview} onClick={addRating} value={4}></i>
          </button>
          <button type='submit'>
            <i className="far fa-star" onMouseEnter={addRatingPreview} onMouseLeave={removeRatingPreview} onClick={addRating} value={5}></i>
          </button>
        </form>
      </div>
      <form onSubmit={deleteShow} className='deleteShow' method='POST'>
        <input type="hidden" name="_method" value="DELETE" />
        <input type="hidden" name="_token" value="{{ csrf_token() }}" />
        <input type ='hidden' name='id' value={id} />
        <input type ='hidden' name='title' value={title} />
        <input type ='hidden' name='image_url' value={image} />
        <input type='submit' value="Remove" />
      </form>
      <button className='streamCheck' title={title} imdb_id={imdb_id} show_type={show_type} onClick={checkStreaming}>Stream Check</button>
    </div>
  )
}

export default Show