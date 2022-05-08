// import '../styles/result.css'

const $ = require( "jquery" );

const axios = require("axios");

const Result = ({ title, image, id, details, getShows, shows, user, loggedInUser, setStreamingServices, streamingServices, getStreamResults }) => {

  console.log(loggedInUser)
  const myShow = async (e) => {
    e.preventDefault();
    console.log("While trying to add show user Id is " + loggedInUser.id)
    if(loggedInUser !== null){
      console.log("Thinks there's a logged in user")
      let data = {
        title: title,
        image_url: image,
        user_id: loggedInUser.id
      } 
    }
    else{
      console.log("Thinks there's not a logged in user")
      let data = {
        title: title,
        image_url: image
      }
    }
    await axios.post('api/shows', data)
    .then(function(response){
      getShows([...shows, {
        title: title,
        image_url: image,
        id: response.data
      }])
    }).catch(() => {
      alert("You must be logged in to add a show")
    })
  }

  const checkStreaming = async (e) => {
    e.preventDefault()
    console.log(`Keyword for stream check is ${title}`)
    // const streamLocations=[]
    let results=[]
    const streamingServicesList=[
      'netflix',
      'hulu',
      'prime',
      'disney', 
      'hbo'
    ]
    for(let i=0; i < streamingServicesList.length; i++){
      axios.get('https://streaming-availability.p.rapidapi.com/search/basic', {
        params: {
          country: 'us',
          // service: 'netflix',
          service: streamingServicesList[i],
          type: 'series',
          // genre: '18',
          // page: '1',
          output_language: 'en',
          language: 'en',
          keyword: `${title}`
        },
        headers: {
          'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
          'X-RapidAPI-Key': '153541ba38msh3a4675a0a844ccdp1a6a0cjsnc83d7caf9c90'
        }
      }).then(res =>{
        if(res.data.results.length > 0){
          for(let result of res.data.results){
            for(let key of Object.keys(result.streamingInfo)){
              results.push(key)
              console.log(key)
            }
          }
          results = [...new Set(results)]
          const usableResults = results.filter(result => streamingServicesList.includes(result))
          getStreamResults(usableResults)
          console.log(usableResults)
        }
      })
      .catch("error")
    }
    // console.log("After stream service search usable results are:")
    // console.log(results)
    // return results
  }

  return (
    <div className='result'>
      <h2>{title}</h2>
      <img src={image}></img>
      <p>{details}</p>
      <form onSubmit={myShow} method="POST" action="/api/shows" name='show-form' className='show-form'>
        <input type ='hidden' name='title' value={title} className='title' />
        <input type ='hidden' name='image_url' value={image} className='image_url' />
        <input type ='hidden' name='user_id' value={loggedInUser ? loggedInUser.id : 0} className='user_id' />
        <input type="hidden" name="_token" value="{{ csrf_token() }}" />
        <input type='submit' className='order' name='addShowBtn' value='Add Show' />
      </form>
      <button className='streamCheck' onClick={checkStreaming}>Check Streaming</button>
    </div>
  )
}

export default Result
