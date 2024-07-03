import React, { useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, FlatList, Animated } from 'react-native';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface MovieSliderProps {
  movies: Movie[];
}

const { width: screenWidth } = Dimensions.get('window');

const MovieSlider: React.FC<MovieSliderProps> = ({ movies }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList<Movie>>(null);
  const currentIndex = useRef(0);

  useEffect(() => {
    console.log('Movies in MovieSlider:', movies);
  }, [movies]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (flatListRef.current && movies.length > 0) {
        currentIndex.current = (currentIndex.current + 1) % movies.length;
        flatListRef.current.scrollToIndex({
          index: currentIndex.current,
          animated: true,
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [movies]);

  const renderItem = ({ item }: { item: Movie }) => (
    <View style={styles.slide}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      />
      <View style={styles.indicatorContainer}>
        {movies.map((_, i) => {
          const width = scrollX.interpolate({
            inputRange: [
              screenWidth * (i - 1),
              screenWidth * i,
              screenWidth * (i + 1),
            ],
            outputRange: [8, 16, 8],
            extrapolate: 'clamp',
          });
          return <Animated.View key={i} style={[styles.dot, { width }]} />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  slide: {
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  image: {
    width: screenWidth,
    height: 250,
    borderRadius: 10,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginHorizontal: 4,
  },
});

export default MovieSlider;
