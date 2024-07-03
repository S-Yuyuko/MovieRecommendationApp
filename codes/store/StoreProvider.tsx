import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import reducer, { initialState } from './reducer';

const StoreContext = createContext<any>(null);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
