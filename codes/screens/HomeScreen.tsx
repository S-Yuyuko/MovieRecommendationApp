import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Button, ActivityIndicator, TouchableOpacity, Modal, Animated, Dimensions, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tmdbService from '../services/tmdbService';
import MovieList from '../components/MovieList';
import MovieSlider from '../components/MovieSlider';
import { useMovieData } from '../hooks/useMovieData';

const screenHeight = Dimensions.get('window').height;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [searchFailed, setSearchFailed] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const translateY = useState(new Animated.Value(screenHeight))[0];
  const {
    isPending,
    startTransition,
    state,
    fetchMovies,
  } = useMovieData();

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleNavigate = () => {
    startTransition(() => {
      navigation.navigate('Catalog');
    });
  };

  const handleSearch = async () => {
    try {
      const results = await tmdbService.searchMovie(searchQuery);
      if (results.length > 0) {
        const movieDetails = await tmdbService.getMovieDetails(results[0].id);
        setSearchResult(movieDetails);
        setSearchFailed(false);
      } else {
        setSearchResult(null);
        setSearchFailed(true);
      }
      setIsModalVisible(true);
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResult(null);
      setSearchFailed(true);
      setIsModalVisible(true);
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleCloseModal = () => {
    Animated.timing(translateY, {
      toValue: screenHeight,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsModalVisible(false);
      setSearchResult(null);
      setSearchFailed(false);
    });
  };

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  if (state.isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for movies..."
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={styles.searchButtonContainer}>
          <Button title="Search" onPress={handleSearch} color="#6200ee" />
        </View>
        <Button title="Browse Catalog" onPress={handleNavigate} color="#6200ee" />
      </View>
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="none"
        onRequestClose={handleCloseModal}
      >
        <Animated.View style={[styles.modalContainer, { transform: [{ translateY }] }]}>
          <View style={styles.modalContent}>
            {searchResult && (
              <View style={styles.searchResult}>
                <Text style={styles.sectionTitle}>Search Result:</Text>
                <Text style={styles.movieTitle}>{searchResult.title}</Text>
                <Text style={styles.movieDetails}>Release Date: {searchResult.release_date}</Text>
                <Text style={styles.movieDetails}>Rating: {searchResult.vote_average}</Text>
                <Text style={styles.movieDetails}>{searchResult.overview}</Text>
                <View style={styles.linksContainer}>
                  {searchResult.external_ids.imdb_id && (
                    <TouchableOpacity onPress={() => openLink(`https://www.imdb.com/title/${searchResult.external_ids.imdb_id}`)}>
                      <Text style={styles.link}>IMDb</Text>
                    </TouchableOpacity>
                  )}
                  {searchResult.homepage && (
                    <TouchableOpacity onPress={() => openLink(searchResult.homepage)}>
                      <Text style={styles.link}>Official Site</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}
            {searchFailed && (
              <View style={styles.searchFailedContainer}>
                <Text style={styles.searchFailed}>Search failed. No movie found.</Text>
              </View>
            )}
            <Button title="Close" onPress={handleCloseModal} color="#6200ee" />
          </View>
        </Animated.View>
      </Modal>
      <ScrollView>
        <MovieSlider movies={state.recommendedMovies} />
        {isPending && <Text style={styles.loadingText}>Loading...</Text>}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
          <MovieList movies={state.recommendedMovies} />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Now</Text>
          <MovieList movies={state.trendingMovies} />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>New Releases</Text>
          <MovieList movies={state.newReleases} />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Rated</Text>
          <MovieList movies={state.topRatedMovies} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#1f1f1f',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    backgroundColor: '#1f1f1f',
    color: '#ffffff',
    padding: 10,
    borderRadius: 25,
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  searchButtonContainer: {
    marginHorizontal: 10,
  },
  modalContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: screenHeight,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1f1f1f',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: screenHeight * 0.7,
  },
  searchResult: {
    marginBottom: 20,
  },
  movieTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  movieDetails: {
    color: '#ffffff',
    fontSize: 14,
    marginBottom: 5,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  link: {
    color: '#6200ee',
    fontSize: 16,
  },
  searchFailedContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  searchFailed: {
    color: '#ff0000',
    textAlign: 'center',
    fontSize: 16,
  },
  closeButton: {
    color: '#6200ee',
    fontSize: 16,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  loadingText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    marginVertical: 10,
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

export default HomeScreen;
