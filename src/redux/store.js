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

const currentGenres = (state = [], action) => {
  switch (action.type) {
    case 'SET_CURRENT_GENRES':
      return action.payload;
    default:
      return state;
  }
}

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

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
    currentMovie,
    currentGenres,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

export default storeInstance;
