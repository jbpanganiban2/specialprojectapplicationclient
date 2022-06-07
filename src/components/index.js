import { combineReducers } from 'redux';

import auth from './entities/auth';
import admin from './entities/admin';
import client from './entities/client';
import worker from './entities/worker';

const root = combineReducers({
  // place all reducers here
  auth,
  admin,
  client,
  worker
});

export default root;