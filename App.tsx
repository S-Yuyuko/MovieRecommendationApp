import React from 'react';
import MainStackNavigator from './codes/navigation/MainStackNavigator';
import { StoreProvider } from './codes/store/StoreProvider';

const App = () => {
  return (
    <StoreProvider>
      <MainStackNavigator />
    </StoreProvider>
  );
};

export default App;
