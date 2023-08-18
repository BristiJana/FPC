import React from 'react';
import RootTab from './src/navigation/RootTab';
import {Provider} from 'react-redux';
import store from './src/redux/Store';

const App = () => {
  return (
    <Provider store={store}>
      <RootTab />
    </Provider>
  );
};

export default App;