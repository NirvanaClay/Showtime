// import '../styles/result.css'

const $ = require( "jquery" );

const axios = require("axios");

const Result = ({ title, image, id, details, getShows, shows, user, loggedInUser, setStreamingServices, streamingServices, getStreamResults, getResults, fetchResults }) => {

  console.log("id is " + id)
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

  const checkStreaming = async (e) => {
    e.preventDefault()
    console.log(`Keyword for stream check is ${title}`)
    // const streamLocations=[]
    let showToCheck = null
    let results = []
    const streamingServicesList=[
      'peacock',
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
            if(result.imdbID == id){
              showToCheck = result
              console.log("Show to check info:")
              console.log(showToCheck)
              console.log(result)
            }
            console.log("After confirming show to check:")
            console.log(showToCheck)
            if(showToCheck !== null){
              for(let key of Object.keys(showToCheck.streamingInfo)){
                results.push(key)
              }
            }
          }
          results = [...new Set(results)]
          const usableResults = results.filter(result => streamingServicesList.includes(result))
          if(results.length > 0){
            getStreamResults(usableResults)
          }
          // else{
          //   getStreamResults("Not currently available through streaming.")
          // }
        }
        else{
          getStreamResults("Not currently available through streaming.")
        }
      })
      .catch("error")
    }
    console.log("This should be after loop.")
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
        {loggedInUser && 
          <input type='submit' className='order' name='addShowBtn' value='Add Show' />
        }
      </form>
      <button className='streamCheck' onClick={checkStreaming}>Stream Check</button>
    </div>
  )
}

export default Result
