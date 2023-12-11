import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CardActions } from '@mui/material';
import { useHistory } from "react-router-dom";
import { Select } from "@mui/material";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

function AddMoviePage() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "SAGA/GET_GENRES" });
  }, []);
  const genres = useSelector((store) => store.genres);
  const [movieInput, setMovieInput] = useState({
    title: "",
    poster: "",
    description: "",
    genre_id: [],
  });
  const handleMovieSubmit = (event, num) => {
    if (num === 1) {
      setMovieInput({ ...movieInput, title: event.target.value });
    } else if (num === 2) {
      setMovieInput({ ...movieInput, poster: event.target.value });
    } else {
      setMovieInput({ ...movieInput, description: event.target.value });
    }
  };
  const handleGenreSelect = (event) => {
    setMovieInput({...movieInput, genre_id: event.target.value})
    console.log(event.target.value);
  };
  const cancelSubmission = () => {
    setMovieInput({
      title: "",
      poster: "",
      description: "",
      genre_id: "",
    });
    history.push("/");
  };
  const submitMovie = () => {
    dispatch({
      type: "SAGA/POST_MOVIE",
      payload: movieInput,
    });
    setMovieInput({
      title: "",
      poster: "",
      description: "",
      genre_id: "",
    });
    history.push("/");
  };
  return (
    <Card 
        sx={{ maxWidth: 600, height: 775 }} 
        data-testid="movieDetails"
        className="description-box">
      <Typography gutterBottom variant="h4" component="div" mt={5}>
        Add A New Movie!
      </Typography>
        <p>
      <Typography gutterBottom variant="overline" display="block">
        Enter Movie Title:
      </Typography>
      <TextField
        id="filled-multiline-flexible"
        label="Movie Title"
        placeholder="Movie Title"
        multiline
        maxRows={2}
        variant="filled"
        value={movieInput.title}
        onChange={() => handleMovieSubmit(event, 1)}
      />
      </p>
      <Typography gutterBottom variant="overline" display="block">
        Enter URL to Movie Poster:
      </Typography>
      <TextField
        label="Movie Poster URL"
        placeholder="Movie Poster URL"
        multiline
        maxRows={4}
        variant="filled"
        value={movieInput.poster}
        onChange={() => handleMovieSubmit(event, 2)}
      />
      <p>
      <Typography gutterBottom variant="overline" display="block">
        Enter Movie Description:
      </Typography>
      <TextField
        id="filled-multiline-static"
        label="Movie Description"
        multiline
        rows={5}
        variant="filled"
        value={movieInput.description}
        onChange={() => handleMovieSubmit(event, 3)}
      />
      </p>
      <p>
      <Typography gutterBottom variant="overline" display="block">
        Select All Relevant Genres:
      </Typography>
      <Select
        multiple
        helperText="Please select the movie's genre"
        value={movieInput.genre_id}
        label="genre"
        onChange={handleGenreSelect}
      >
        {genres.map((genre) => (
          <MenuItem key={genre.id} value={genre.id}>
            {genre.name}
          </MenuItem>
        ))}
      </Select>
      </p>
      <CardActions>
      <Button variant="contained" color="success" onClick={submitMovie}>
        Submit
      </Button>
      <Button variant="outlined" color="error" onClick={cancelSubmission}>
        Cancel
      </Button>
      </CardActions>
    </Card>
  );
}

export default AddMoviePage;
