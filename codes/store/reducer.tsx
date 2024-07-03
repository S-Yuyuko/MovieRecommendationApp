import {
  SET_RECOMMENDED_MOVIES,
  SET_TRENDING_MOVIES,
  SET_NEW_RELEASES,
  SET_TOP_RATED_MOVIES,
  SET_GENRES,
  SET_MOVIES_BY_GENRE,
  SET_LOADING,
} from './actionTypes';

const initialState = {
  recommendedMovies: [],
  trendingMovies: [],
  newReleases: [],
  topRatedMovies: [],
  genres: [],
  moviesByGenre: {},
  isLoading: true,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_RECOMMENDED_MOVIES:
      return { ...state, recommendedMovies: action.payload };
    case SET_TRENDING_MOVIES:
      return { ...state, trendingMovies: action.payload };
    case SET_NEW_RELEASES:
      return { ...state, newReleases: action.payload };
    case SET_TOP_RATED_MOVIES:
      return { ...state, topRatedMovies: action.payload };
    case SET_GENRES:
      return { ...state, genres: action.payload };
    case SET_MOVIES_BY_GENRE:
      return {
        ...state,
        moviesByGenre: { ...state.moviesByGenre, [action.payload.genre]: action.payload.movies },
      };
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export default reducer;
export { initialState };
