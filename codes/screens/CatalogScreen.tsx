import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import MovieList from '../components/MovieList';
import { useMovieData } from '../hooks/useMovieData';

const CatalogScreen: React.FC = () => {
  const { state, isPending, startTransition, fetchGenresAndMovies } = useMovieData();

  useEffect(() => {
    startTransition(() => {
      fetchGenresAndMovies();
    });
  }, []);

  if (state.isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {state.genres.map((genre) => (
        <View key={genre.id} style={styles.section}>
          <Text style={styles.sectionTitle}>{genre.name}</Text>
          <MovieList movies={state.moviesByGenre[genre.name] || []} />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    marginLeft: 10,
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 5,
  },
});

export default CatalogScreen;
