import { useState, useEffect, useTransition } from 'react';
import { useStore } from '../store/StoreProvider';
import tmdbService from '../services/tmdbService';
import {
  setRecommendedMovies,
  setTrendingMovies,
  setNewReleases,
  setTopRatedMovies,
  setGenres,
  setMoviesByGenre,
  setLoading,
} from '../store/actions';

export const useMovieData = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isPending, startTransition] = useTransition();
  const { state, dispatch } = useStore();
  const [loadingRecommended, setLoadingRecommended] = useState(true);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [loadingNewReleases, setLoadingNewReleases] = useState(true);
  const [loadingTopRated, setLoadingTopRated] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    setLoadingRecommended(true);
    setLoadingTrending(true);
    setLoadingNewReleases(true);
    setLoadingTopRated(true);

    const recommended = await tmdbService.getRecommendedMovies();
    const trending = await tmdbService.getTrendingMovies();
    const newReleases = await tmdbService.getNewReleases();
    const topRated = await tmdbService.getTopRated();

    dispatch(setRecommendedMovies(recommended));
    dispatch(setTrendingMovies(trending));
    dispatch(setNewReleases(newReleases));
    dispatch(setTopRatedMovies(topRated));

    setLoadingRecommended(false);
    setLoadingTrending(false);
    setLoadingNewReleases(false);
    setLoadingTopRated(false);
  };

  const fetchGenresAndMovies = async () => {
    dispatch(setLoading(true));
    const fetchedGenres = await tmdbService.getGenres();
    dispatch(setGenres(fetchedGenres));
    const movies: { [key: string]: any[] } = {};
    for (const genre of fetchedGenres) {
      movies[genre.name] = await tmdbService.getMoviesByGenre(genre.id);
      dispatch(setMoviesByGenre(genre.name, movies[genre.name]));
    }
    dispatch(setLoading(false));
  };

  return {
    searchQuery,
    setSearchQuery,
    isPending,
    startTransition,
    state,
    fetchMovies,
    fetchGenresAndMovies,
    loadingRecommended,
    loadingTrending,
    loadingNewReleases,
    loadingTopRated,
  };
};
