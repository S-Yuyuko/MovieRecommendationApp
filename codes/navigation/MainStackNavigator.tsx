import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CatalogScreen from '../screens/CatalogScreen';
import MovieDetailScreen from '../screens/MovieDetailScreen';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Movie Recommendations' }} />
        <Stack.Screen name="Catalog" component={CatalogScreen} options={{ title: 'Catalog' }} />
        <Stack.Screen name="MovieDetail" component={MovieDetailScreen} options={{ title: 'Movie Detail' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;
