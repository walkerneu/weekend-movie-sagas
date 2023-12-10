import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Button, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function SearchBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch({ type: "SAGA/GET_GENRES" });
  }, []);
  const genres = useSelector((store) => store.genres);
  const [searchQuery, setSearchQuery] = useState("");
  const [genreQuery, setGenreQuery] = useState("");
  const handleSearchInput = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleGenreInput = (event) => {
    setGenreQuery(event.target.value);
  };
  const submitSearch = () => {
    dispatch({
      type: "SAGA/GET_SEARCH",
      payload: searchQuery,
    });
    history.push("/searchResults");
  };
  const submitGenreSearch = () => {
    dispatch({
      type: "SAGA/GET_GENRE_SEARCH",
      payload: genreQuery,
    });
    history.push("/searchResults");
  };
  return (
    <>
      <div className="search-container">
        <div className="search-box">
          <Typography gutterBottom variant="overline" display="block" mt={3}>
            Search for Movies in the collection:
          </Typography>
          <TextField
            label="Search by Title"
            type="search"
            onChange={handleSearchInput}
            value={searchQuery}
          />
          <Button variant="contained" color="secondary" onClick={submitSearch}>
            Submit
          </Button>
        </div>
        <div className="search-box">
          <Typography gutterBottom variant="overline" display="block">
            Search By Genre:
          </Typography>
          <Select
            helperText="Please select a genre"
            value={genreQuery}
            label="genre"
            onChange={handleGenreInput}
          >
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
          <Button
            variant="contained"
            color="secondary"
            onClick={submitGenreSearch}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
