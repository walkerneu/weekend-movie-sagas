import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function SearchBar(){
    const dispatch = useDispatch();
    const history = useHistory();
    const [searchQuery, setSearchQuery] = useState('')
    const handleSearchInput = (event) => {
        setSearchQuery(event.target.value);
    }
    const submitSearch = () => {
        dispatch({
            type: 'SAGA/GET_SEARCH',
            payload: searchQuery
        })
        history.push('/searchResults');
    }
    return (
        <>
        <Typography gutterBottom variant="overline" display="block" mt={3}>
        Search for Movies in the collection:
        </Typography>
        <TextField 
            id="outlined-search" 
            label="Search field" 
            type="search" 
            onChange={handleSearchInput}
            value={searchQuery}/>
        <Button 
            variant="contained" 
            color="success" 
            onClick={submitSearch}>
        Submit
        </Button>
        </>
    )
}

export default SearchBar;