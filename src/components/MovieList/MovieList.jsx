import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import MovieItem from '../MovieItem/MovieItem';
import Typography from '@mui/material/Typography';

function MovieList() {

  const dispatch = useDispatch();
  const movies = useSelector(store => store.movies);

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
  }, []);

  return (
    <main>
      <Typography gutterBottom variant="h5" display="block" mt={5} mb={3}>
        Click on a Movie to Learn More!
      </Typography>
      <section className="movies">
        {movies.map(movie => {
          return (
            <MovieItem key={movie.id} movie={movie}/>
          );
        })}
      </section>
    </main>

  );
}


export default MovieList;
