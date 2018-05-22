import React from 'react';
import ReactDOM from 'react-dom';
import MasterLayout from './MasterLayout/MasterLayout';

import { hot } from 'react-hot-loader';

const App = () => {
  return (
    <MasterLayout />
  );
};

export default hot(module)(App);
