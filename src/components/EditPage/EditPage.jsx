import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CardActions } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

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
    history.goBack();
  };
  const updateMovie = () => {
    dispatch({
      type: "SAGA/UPDATE_MOVIE",
      payload: { id: id, data: movieInput },
    });
    history.push(`/description/${id}`);
  };
  return (
    <Card
      sx={{ maxWidth: 600, height: 600 }}
      data-testid="movieDetails"
      className="description-box"
    >
      <Typography gutterBottom variant="h4" component="div" mt={5}>
        Edit {currentMovie.title}!
      </Typography>
      <p>
        <Typography gutterBottom variant="overline" display="block">
          Edit Movie Title:
        </Typography>
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
      </p>
      <p>
        <Typography gutterBottom variant="overline" display="block">
          Edit Movie Description:
        </Typography>
        <TextField
          id="filled-multiline-static"
          label="Movie Description"
          multiline
          rows={6}
          variant="filled"
          value={movieInput.description}
          onChange={() => handleMovieSubmit(event, 2)}
        />
      </p>
      <CardActions>
        <Button variant="contained" color="success" onClick={updateMovie}>
          Submit
        </Button>
        <Button variant="outlined" color="error" onClick={cancelSubmission}>
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}

export default EditPage;
