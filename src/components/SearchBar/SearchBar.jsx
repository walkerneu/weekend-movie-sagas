import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';

function SearchBar(){

    return (
        <>
        <Typography gutterBottom variant="overline" display="block" mt={3}>
        Search for Movies in the collection:
        </Typography>
        <TextField id="outlined-search" label="Search field" type="search" />
        </>
    )
}

export default SearchBar;