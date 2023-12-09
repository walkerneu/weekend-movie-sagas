import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import { useEffect } from "react";

function DescriptionPage (){
    const { id } = useParams()
    const history = useHistory();
    const dispatch = useDispatch();
    const currentMovie = useSelector(store => store.currentMovie)
    const genres = useSelector(store => store.currentGenres)
    useEffect(() => {
        dispatch({ 
            type: 'SAGA/GET_CURRENT_MOVIE',
            payload: id });
      }, []);
    const goBack = () => {
        history.push('/')
        dispatch({
            type: 'CLEAR_CURRENT_MOVIE',
        })
    }
    return (
    <Card 
        sx={{ maxWidth: 300 }} 
        data-testid="movieDetails"
        className="description-box">
  
        <CardMedia
          component="img"
          className="movie-media"
          image={currentMovie.poster}
          alt={currentMovie.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h3" component="div">
            {currentMovie.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {currentMovie.description}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Genres:
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {genres.map((genre) => (
                <span> {genre.name} /</span>
            ))}
          </Typography>
        </CardContent>
    
      <CardActions>
        <Button 
            size="small" 
            color="primary"
            onClick={goBack}
            data-testid="toList">
          BACK
        </Button>
      </CardActions>
    </Card> 
    )
}

export default DescriptionPage;