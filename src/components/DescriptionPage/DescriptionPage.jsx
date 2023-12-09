import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function DescriptionPage (){
    const history = useHistory();
    const dispatch = useDispatch();
    const currentMovie = useSelector(store => store.currentMovie)
    const genres = useSelector(store => store.genres)
    const goBack = () => {
        history.push('/')
        dispatch({
            type: 'CLEAR_CURRENT_MOVIE',
        })
    }
    return (
        <div data-testid="movieDetails">
            <h2>{currentMovie.title}</h2>
            <img
                src={currentMovie.poster} 
                alt={currentMovie.title}/>
            <p>{currentMovie.description}</p>
            <button onClick={goBack}
                    data-testid="toList"
                >BACK</button>
            <h3>Genres:</h3>
            <ul>
            {genres.map((genre) => (
                <li>{genre.name}</li>
            ))}
            </ul>
        </div>
    )
}

export default DescriptionPage;