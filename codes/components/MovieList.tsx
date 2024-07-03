import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const navigation = useNavigation();

  const renderItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity
      style={styles.movieContainer}
      onPress={() => navigation.navigate('MovieDetail', { movie: item })}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.moviePoster}
      />
      <Text style={styles.movieTitle}>{item.title}</Text>
      <Text style={styles.movieRating}>Rating: {item.vote_average}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={movies}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10,
  },
  movieContainer: {
    marginRight: 15,
    width: 120,
  },
  moviePoster: {
    width: 120,
    height: 180,
    borderRadius: 10,
  },
  movieTitle: {
    color: '#ffffff',
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  movieRating: {
    color: '#ccc',
    marginTop: 2,
    fontSize: 12,
  },
});

export default MovieList;
