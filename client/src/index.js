import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import App from './components/App';

import 'sanitize.css';
import './styles/styles.css';

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<AppContainer />, document.getElementById('root'));
