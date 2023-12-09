import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function MovieItem ({ movie }){
    const dispatch = useDispatch();
    const history = useHistory();
    const imgClick = () => {
        dispatch({ 
            type: 'SAGA/GET_CURRENT_MOVIE',
            payload: movie.id });
        history.push(`/description`);
    }
    return (  
    <Card sx={{ maxWidth: 183 }} data-testid='movieItem'>
      <CardActionArea>
        <CardMedia
          component="img"
          className="movie-media"
          image={movie.poster}
          alt={movie.title}
          onClick={imgClick}
          data-testid="toDetails"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {movie.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    )
}

export default MovieItem