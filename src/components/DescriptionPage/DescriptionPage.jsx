import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

function DescriptionPage (){
    const history = useHistory();
    const dispatch = useDispatch();
    const currentMovie = useSelector(store => store.currentMovie)
    const goBack = () => {
        history.push('/')
        dispatch({
            type: 'CLEAR_CURRENT_MOVIE',
        })
    }
    return (
        <div>
            <h2>{currentMovie.title}</h2>
            <img
                src={currentMovie.poster} 
                alt={currentMovie.title}/>
            <p>{currentMovie.description}</p>
            <button onClick={goBack}
                    data-testid="toList"
                >BACK</button>
        </div>
    )
}

export default DescriptionPage;