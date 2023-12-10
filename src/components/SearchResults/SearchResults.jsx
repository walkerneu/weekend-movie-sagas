import { useSelector } from "react-redux";
import MovieItem from "../MovieItem/MovieItem";
import Typography from "@mui/material/Typography";

function SearchResults() {
  const searchResults = useSelector((store) => store.searchResults);

  return (
    <main>
      <Typography gutterBottom variant="h5" display="block" mt={5} mb={3}>
        Click on a Movie to Learn More!
      </Typography>
      <section className="movies">
        {searchResults.map((movie) => {
          return <MovieItem key={movie.id} movie={movie} />;
        })}
      </section>
    </main>
  );
}

export default SearchResults;
