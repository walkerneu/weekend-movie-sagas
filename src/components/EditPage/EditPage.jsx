import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { useHistory, useParams } from "react-router-dom";

function EditPage() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const currentMovie = useSelector((store) => store.currentMovie);
  const [movieInput, setMovieInput] = useState({
    title: currentMovie.title,
    description: currentMovie.description,
  });
  const handleMovieSubmit = (event, num) => {
    if (num === 1) {
      setMovieInput({ ...movieInput, title: event.target.value });
    } else {
      setMovieInput({ ...movieInput, description: event.target.value });
    }
  };
  const cancelSubmission = () => {
    setMovieInput({
      title: currentMovie.title,
      description: currentMovie.description,
    });
    history.push(`/description/${id}`);
  };
  const updateMovie = () => {
    dispatch({
      type: "SAGA/UPDATE_MOVIE",
      payload: { id: id, data: movieInput },
    });
    history.push(`/description/${id}`);
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
        id="filled-multiline-static"
        label="Movie Description"
        multiline
        rows={4}
        variant="filled"
        value={movieInput.description}
        onChange={() => handleMovieSubmit(event, 2)}
      />
      <Button variant="contained" color="success" onClick={updateMovie}>
        Submit
      </Button>
      <Button variant="outlined" color="error" onClick={cancelSubmission}>
        Cancel
      </Button>
    </Box>
  );
}

export default EditPage;
