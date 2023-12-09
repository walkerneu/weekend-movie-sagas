import { useDispatch } from "react-redux"
import  {HashRouter as Route, Link } from 'react-router-dom'

function MovieItem ({ movie }){
    const dispatch = useDispatch();

    const imgClick = () => {
        dispatch({
            type: 'SET_CURRENT_MOVIE',
            payload: movie
        })
    }    
    return (
        <div>
              <h3>{movie.title}</h3>  
              <Link to={movie.id}>
              <img 
                onClick={imgClick} 
                src={movie.poster} 
                alt={movie.title}/>
                </Link>
        </div>
    )
}

export default MovieItem