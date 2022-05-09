import Show from './Show.js'

const ShowList = ({ shows, getShows, Link }) => {

  return (
    <div className='show-index'>
      <h2>My Shows</h2>
      <div className='shows'>
        {shows ? shows.map((show) => (
          <div key={show.id} className='show' id={show.id}>
            <Show title={show.title} image={show.image_url} shows={shows} id={show.id} rating={show.rating} getShows={getShows} />
          </div>
        )) : <p><Link to='/login'>Login</Link> or <Link to='/register'>register</Link> to add shows, rate them, and share your thoughts.</p>}  
      </div>
    </div>
  )
}

export default ShowList