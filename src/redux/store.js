import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery('FETCH_MOVIES', fetchAllMovies);
  yield takeLatest('SAGA/GET_CURRENT_MOVIE', getMovieById);
  yield takeLatest('SAGA/GET_CURRENT_GENRES', getGenresById);
  yield takeLatest('SAGA/GET_GENRES', fetchAllGenres);
  yield takeLatest('SAGA/POST_MOVIE', addNewMovie);
  yield takeLatest('SAGA/UPDATE_MOVIE', updateMovie);
  yield takeLatest('SAGA/GET_SEARCH', searchForMovies);
  yield takeLatest('SAGA/GET_GENRE_SEARCH', searchByGenre);
}

function* fetchAllMovies() {
  try {
    // Get the movies:
    const moviesResponse = yield axios.get('/api/movies');
    // Set the value of the movies reducer:
    yield put({
      type: 'SET_MOVIES',
      payload: moviesResponse.data
    });
  } catch (error) {
    console.log('fetchAllMovies error:', error);
  }
}
// saga function to get the list of genres from the database
function* fetchAllGenres() {
  try {
    const response = yield axios.get('/api/genres');
    yield put({
      type: 'SET_GENRES',
      payload: response.data
    });
  } catch (error) {
    console.log('fetchAllGenres error:', error);
  }
}
// saga function to get the movie object of a selected movie
function* getMovieById(action){
  try {
    const response = yield axios.get(`/api/movies/${action.payload}`);
    yield put ({
      type: 'SET_CURRENT_MOVIE',
      payload: response.data[0]
    })
    yield getGenresById(action.payload);
  } catch (error) {
    console.log('GET movie by ID error', error)
  }
}
// saga function to get all genres associated with a specific movie id
function* getGenresById(id){
  try {
    const response = yield axios.get(`/api/movies/genres/${id}`);
    yield put ({
      type: 'SET_CURRENT_GENRES',
      payload: response.data
    })
  } catch (error) {
    console.log('Get genres by ID failed', error)
  }
}
// saga function sends a post request to the server with a new movie object
function* addNewMovie(action){
  try {
    const response = yield axios ({
      method: 'POST',
      url: '/api/movies',
      data: action.payload
    })
    yield fetchAllMovies();
  } catch (error) {
    console.log('POST new movie SAGA fail', error)
  }
}
// saga function to update the values of a selected movie object in the database
function* updateMovie(action){
  try {
    const response = yield axios ({
      method: 'PUT',
      url: `api/movies/${action.payload.id}`,
      data: action.payload.data
    })
    yield put ({
      type: 'SAGA/GET_CURRENT_MOVIE',
      payload: action.payload.id
    })
  } catch (error) {
    console.log('ERROR in SAGA update', error);
  }
}
// saga function to execute a get request with a search query and returns movies with matching titles
function* searchForMovies(action){
  try {
    const response = yield axios ({
      method: 'GET',
      url: `api/movies/search/${action.payload}`
    })
    yield put ({
      type: 'SET_SEARCH_RESULTS',
      payload: response.data
    })
  } catch (error) {
    console.log('error happend in the saga GET search', error);
  }
}
// saga function to execute a get request with a search query that returns movies with the selected genre
function* searchByGenre(action){
  try {
    const response = yield axios ({
      method: 'GET',
      url: `api/movies/search/genres/${action.payload}`
    })
    yield put ({
      type: 'SET_SEARCH_RESULTS',
      payload: response.data
    })
  } catch (error) {
    console.log('Error happened in Saga genre search', error)
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload;
    default:
      return state;
  }
}

// Used to store the movie genres
const genres = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload;
    default:
      return state;
  }
}

// Used to store the genres of a selected movie
const currentGenres = (state = [], action) => {
  switch (action.type) {
    case 'SET_CURRENT_GENRES':
      return action.payload;
    default:
      return state;
  }
}
// used to store the current movie object
const currentMovie = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_MOVIE':
      return action.payload;
    case 'CLEAR_CURRENT_MOVIE':
      return {}
    default:
      return state;
  }
}
// used to store all movie objects from a search query
const searchResults = (state = [], action) => {
  switch (action.type){
    case 'SET_SEARCH_RESULTS':
      return action.payload;
    default:
      return state;
  }
}

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
    currentMovie,
    currentGenres,
    searchResults,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

export default storeInstance;
