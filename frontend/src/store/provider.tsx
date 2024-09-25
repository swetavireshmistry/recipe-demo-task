'use client';

import { Provider } from 'react-redux';
import { ReactNode } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';

interface ReduxProviderProps {
  children: ReactNode;
}

const ReduxProvider = ({ children }: ReduxProviderProps) => {
  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>;
};

export default ReduxProvider;
