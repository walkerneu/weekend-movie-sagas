import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList';
import DescriptionPage from '../DescriptionPage/DescriptionPage';
import Header from '../Header/Header';
import AddMoviePage from '../AddMoviePage/AddMoviePage';
import EditPage from '../EditPage/EditPage';

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
        <Route exact path="/addMovie">
          <AddMoviePage />
        </Route>
        <Route exact path="/edit/:id">
          <EditPage />
        </Route>
        
      </Router>
    </div>
  );
}


export default App;
