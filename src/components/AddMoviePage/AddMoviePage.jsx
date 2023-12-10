import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

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
    genre_id: "",
  });
  const [selectedGenre, setSelectedGenre] = useState("");
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
    setSelectedGenre(event.target.value)
    for (let genre of genres){
        if (selectedGenre === genre.name){
          setMovieInput({ ...movieInput, genre_id: genre.id });
        }
    }
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
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <TextField
        id="filled-multiline-flexible"
        label="Movie Title"
        placeholder="Movie Title"
        multiline
        maxRows={4}
        variant="filled"
        value={movieInput.title}
        onChange={() => handleMovieSubmit(event, 1)}
      />
      <TextField
        id="filled-textarea"
        label="Movie Poster URL"
        placeholder="Movie Poster URL"
        multiline
        variant="filled"
        value={movieInput.poster}
        onChange={() => handleMovieSubmit(event, 2)}
      />
      <TextField
        id="filled-multiline-static"
        label="Movie Description"
        multiline
        rows={4}
        variant="filled"
        value={movieInput.description}
        onChange={() => handleMovieSubmit(event, 3)}
      />
      <TextField
        select
        helperText="Please select the movie's genre"
        value={selectedGenre}
        label="genre"
        onChange={handleGenreSelect}
      >
        {genres.map((genre) => (
          <MenuItem key={genre.id} value={genre.name}>
            {genre.name}
          </MenuItem>
        ))}
      </TextField>
      <Button variant="contained" color="success" onClick={submitMovie}>
        Submit
      </Button>
      <Button variant="outlined" color="error" onClick={cancelSubmission}>
        Cancel
      </Button>
    </Box>
  );
}

export default AddMoviePage;
