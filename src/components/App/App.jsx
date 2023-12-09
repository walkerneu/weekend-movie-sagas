import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList';
import DescriptionPage from '../DescriptionPage/DescriptionPage';
import Header from '../Header/Header';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />      
        <Route path="/" exact>
          <MovieList />
        </Route>
        <Route 
          exact path="/description/:id">
            <DescriptionPage />
          </Route>
        {/* Add Movie page */}
        
      </Router>
    </div>
  );
}


export default App;
