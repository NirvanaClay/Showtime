import { useState, useEffect } from 'react'
const axios = require("axios");

import $ from 'jquery'
import { set } from 'lodash';

const Show = ({ title, image, id, rating, shows, getShows }) => {

  const [stateRating, setRating] = useState([rating || 0])
  const [previewRating, setPreviewRating] = useState(rating)

  useEffect(() => {
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

  const deleteShow = async (e) => {
    e.preventDefault();
    axios.delete(`/api/shows/${id}`)
    getShows(shows.filter((show) => show.id !== id))
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

  const addRating = async (e) => {
    e.preventDefault()

    await axios.post(`/api/shows/${id}`, {
      _method: 'PUT',
      id: id,
      rating: stateRating
    })

  }

  const setRatingValue = async (e) => {
    setRating(e.target.getAttribute('value'))
  }

  return (
    <>
      <h3>{title}</h3>
      <img src={image} />
      <div className='stars-container' id={id}>
        <form action='/api/shows/{id}' method='POST' onSubmit={addRating}>
          <input type="hidden" name="_method" value="PUT" />
          <input type ='hidden' name='id' value={id} className='id' />
          <input type="hidden" name="_token" value="{{ csrf_token() }}" />
          <input type='hidden' className='rating' name='rating' value={stateRating} />
          <button type='submit'>
            <i className="far fa-star" onMouseEnter={addRatingPreview} onMouseLeave={removeRatingPreview} onClick={setRatingValue} value={1}></i>
          </button>
          <button type='submit'>
            <i className="far fa-star" onMouseEnter={addRatingPreview} onMouseLeave={removeRatingPreview} onClick={setRatingValue} value={2}></i>
          </button>
          <button type='submit'>
            <i className="far fa-star" onMouseEnter={addRatingPreview} onMouseLeave={removeRatingPreview} onClick={setRatingValue} value={3}></i>
          </button>
          <button type='submit'>
            <i className="far fa-star" onMouseEnter={addRatingPreview} onMouseLeave={removeRatingPreview} onClick={setRatingValue} value={4}></i>
          </button>
          <button type='submit'>
            <i className="far fa-star" onMouseEnter={addRatingPreview} onMouseLeave={removeRatingPreview} onClick={setRatingValue} value={5}></i>
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
    </>
  )
}

export default Show