import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
// import { StatusBar } from 'react-native';

import './config/ReactotronConfig';

import { store, persistor } from './store';

import Routes from './routes';

export default function src() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}
