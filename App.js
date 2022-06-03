import React from 'react';
import { LogBox, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import LoadingModal from './src/modals/LoadingModal';
import Route from './src/navigation/main';
import store from './src/redux/store';

const App = () => {
  LogBox.ignoreAllLogs(true);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle='dark-content' />
      <Provider store={store}>
        <LoadingModal />
        <Route />
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;