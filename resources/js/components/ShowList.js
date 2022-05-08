import Show from './Show.js'

const ShowList = ({ shows, getShows }) => {

  return (
    <div className='show-index'>
      <h2>My Shows</h2>
      <div className='shows'>
        {shows ? shows.map((show) => (
          <div key={show.id} className='show' id={show.id}>
            <Show title={show.title} image={show.image_url} shows={shows} id={show.id} rating={show.rating} getShows={getShows} />
          </div>
        )) : "No shows"}  
      </div>
    </div>
  )
}

export default ShowList