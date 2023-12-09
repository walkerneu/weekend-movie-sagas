import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom";
import {HashRouter as Link} from "react-router-dom";

function MovieItem ({ movie }){
    const dispatch = useDispatch();
    const history = useHistory();
    const imgClick = () => {
        dispatch({ 
            type: 'SAGA/GET_CURRENT_MOVIE',
            payload: movie.id });
        history.push(`/description/`);
    }
    return (
        <div data-testid='movieItem'>
              <h3>{movie.title}</h3>
              <img 
                onClick={imgClick} 
                src={movie.poster} 
                alt={movie.title}
                data-testid="toDetails"/> 
        </div>
    )
}

export default MovieItem