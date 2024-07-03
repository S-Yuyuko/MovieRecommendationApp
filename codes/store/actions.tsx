import {
  SET_RECOMMENDED_MOVIES,
  SET_TRENDING_MOVIES,
  SET_NEW_RELEASES,
  SET_TOP_RATED_MOVIES,
  SET_GENRES,
  SET_MOVIES_BY_GENRE,
  SET_LOADING,
} from './actionTypes';

export const setRecommendedMovies = (movies: any[]) => ({
  type: SET_RECOMMENDED_MOVIES,
  payload: movies,
});

export const setTrendingMovies = (movies: any[]) => ({
  type: SET_TRENDING_MOVIES,
  payload: movies,
});

export const setNewReleases = (movies: any[]) => ({
  type: SET_NEW_RELEASES,
  payload: movies,
});

export const setTopRatedMovies = (movies: any[]) => ({
  type: SET_TOP_RATED_MOVIES,
  payload: movies,
});

export const setGenres = (genres: any[]) => ({
  type: SET_GENRES,
  payload: genres,
});

export const setMoviesByGenre = (genre: string, movies: any[]) => ({
  type: SET_MOVIES_BY_GENRE,
  payload: { genre, movies },
});

export const setLoading = (isLoading: boolean) => ({
  type: SET_LOADING,
  payload: isLoading,
});
