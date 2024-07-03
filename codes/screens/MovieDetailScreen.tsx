import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import tmdbService from '../services/tmdbService';
import InAppBrowser from '../components/InAppBrowser';

interface MovieDetailScreenProps {
  route: any;
}

const MovieDetailScreen: React.FC<MovieDetailScreenProps> = ({ route }) => {
  const { movie } = route.params;
  const [movieDetails, setMovieDetails] = useState<any>(null);
  const [isBrowserVisible, setIsBrowserVisible] = useState<boolean>(false);
  const [browserUrl, setBrowserUrl] = useState<string>('');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const details = await tmdbService.getMovieDetails(movie.id);
        setMovieDetails(details);
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movie.id]);

  const openLink = (url: string) => {
    setBrowserUrl(url);
    setIsBrowserVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.rating}>Rating: {movie.vote_average}</Text>
      <Text style={styles.overview}>{movie.overview}</Text>
      {movieDetails && (
        <View style={styles.linksContainer}>
          {movieDetails.external_ids.imdb_id && (
            <TouchableOpacity onPress={() => openLink(`https://www.imdb.com/title/${movieDetails.external_ids.imdb_id}`)}>
              <Text style={styles.link}>IMDb</Text>
            </TouchableOpacity>
          )}
          {movieDetails.homepage && (
            <TouchableOpacity onPress={() => openLink(movieDetails.homepage)}>
              <Text style={styles.link}>Official Site</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      <InAppBrowser url={browserUrl} visible={isBrowserVisible} onClose={() => setIsBrowserVisible(false)} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#121212',
  },
  poster: {
    width: '100%',
    height: 400,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
  rating: {
    fontSize: 18,
    color: '#ccc',
    marginTop: 10,
  },
  overview: {
    fontSize: 16,
    color: '#fff',
    marginTop: 20,
    lineHeight: 24,
  },
  linksContainer: {
    marginTop: 20,
  },
  link: {
    color: '#6200ee',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default MovieDetailScreen;
