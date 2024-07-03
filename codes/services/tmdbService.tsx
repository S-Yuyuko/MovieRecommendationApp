import axios from 'axios';

const API_KEY = '5bb5cc709b309e9c01bf1e4590cc80b5';
const BASE_URL = 'https://api.themoviedb.org/3';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
}

interface Genre {
  id: number;
  name: string;
}

const tmdbService = {
  getRecommendedMovies: async (): Promise<Movie[]> => {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results;
  },
  getTrendingMovies: async (): Promise<Movie[]> => {
    const response = await axios.get(`${BASE_URL}/trending/movie/week`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results;
  },
  getNewReleases: async (): Promise<Movie[]> => {
    const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results;
  },
  getTopRated: async (): Promise<Movie[]> => {
    const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results;
  },
  getGenres: async (): Promise<Genre[]> => {
    const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.genres;
  },
  getMoviesByGenre: async (genreId: number): Promise<Movie[]> => {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        with_genres: genreId,
      },
    });
    return response.data.results;
  },
  searchMovie: async (query: string): Promise<Movie[]> => {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query,
      },
    });
    return response.data.results;
  },
  getMovieDetails: async (movieId: number): Promise<any> => {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        append_to_response: 'external_ids',
      },
    });
    return response.data;
  },
};

export default tmdbService;
