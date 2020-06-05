import 'react-native-gesture-handler';
import React from 'react';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar, YellowBox } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './services/RootNavigation';

import './config/ReactotronConfig';
import colors from './styles/colors';

import { store, persistor } from './store';
import App from './App';

export default function Index() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar barStyle="light-content" backgroundColor={colors.black} />
          <App />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}
