import React from 'react';
import ReactDOM from 'react-dom';

import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import './index.css'

import App from './AppContainer';
// Redux
import { Provider } from 'react-redux';
import store from './store';


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

if(module.hot){
  module.hot.accept();
}