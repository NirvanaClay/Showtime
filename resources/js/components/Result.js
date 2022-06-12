// import '../styles/result.css'

const $ = require( "jquery" );

const axios = require("axios");

const Result = ({ title, image, id, details, getShows, shows, user, loggedInUser, setStreamingServices, streamingServices, getStreamResults, getResults, fetchResults, checkStreaming, showType }) => {

  const myShow = async (e) => {
    e.preventDefault();
    const data = {
      title: title,
      image_url: image,
      user_id: loggedInUser.id
    } 
    console.log("Data is:")
    console.log(data)
    await axios.post('api/shows', data)
    .then(function(response){
      getShows([...shows, {
        title: title,
        image_url: image,
        id: response.data
      }])
      getResults([])
    }).catch((e) => {
      console.log(e)
    })
  }

  return (
    <div className='result'>
      <h2>{title}</h2>
      <img src={image}></img>
      {streamingServices && streamingId == imdb_id && streamingServices != noStreaming &&
      <h4>Streaming on:</h4>}
      {streamingServices && streamingId == imdb_id && streamingServices.map((service, key) => (
        <p key={key}>{service}</p>
      ))}
      <form onSubmit={myShow} method="POST" action="/api/shows" name='show-form' className='show-form'>
        <input type ='hidden' name='title' value={title} className='title' />
        <input type ='hidden' name='image_url' value={image} className='image_url' />
        <input type ='hidden' name='user_id' value={loggedInUser ? loggedInUser.id : 0} className='user_id' />
        <input type="hidden" name="_token" value="{{ csrf_token() }}" />
        {loggedInUser && 
          <input type='submit' className='order' name='addShowBtn' value='Add Show' />
        }
      </form>
      <button className='streamCheck' show_type={showType} imdb_id={id} title={title} onClick={checkStreaming}>Stream Check</button>
    </div>
  )
}

export default Result
