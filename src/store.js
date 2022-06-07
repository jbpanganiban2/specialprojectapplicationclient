import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { middleware as reduxpack } from 'redux-pack';

import reducers from './components';

const store = createStore(
  reducers,
  {},
  applyMiddleware(logger, thunk, reduxpack)
);

export default store;