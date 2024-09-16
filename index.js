import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import App from './App'; // Replace with your main App component
import {name as appName} from './app.json';
import store from './src/redux/store'; // Import your Redux store configuration

const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
