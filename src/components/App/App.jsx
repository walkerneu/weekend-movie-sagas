import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList';
import DescriptionPage from '../DescriptionPage/DescriptionPage';

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        <Route 
          exact path="/description">
            <DescriptionPage 
              data-testid="movieDetails" />
          </Route>
        {/* Add Movie page */}
        
      </Router>
    </div>
  );
}


export default App;
