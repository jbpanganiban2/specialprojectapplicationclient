import * as Api from '../api/admin';
import { handle } from 'redux-pack';

// Action Types
const VIEW_ALL_CLIENT_PROFILE = 'ADMIN/VIEW_ALL_CLIENT_PROFILE';
const VIEW_ALL_WORKER_PROFILE = 'ADMIN/VIEW_ALL_WORKER_PROFILE';

// Action Creators
export const viewAllClientProfile = () => {
  return dispatch => {
    return dispatch({
      type: VIEW_ALL_CLIENT_PROFILE,
      promise: Api.viewAllClientProfile()
    });
  };
};

export const viewAllWorkerProfile = () => {
  return dispatch => {
    return dispatch({
      type: VIEW_ALL_WORKER_PROFILE,
      promise: Api.viewAllWorkerProfile()
    });
  };
};


// Initial State
const initialState = {
  /* Get Session */
  data: [],
  clientData: [],
  workerData: [],
  clientData: null

};


// Reducer
const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case VIEW_ALL_CLIENT_PROFILE:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
        }),
        success: prevState => ({
          ...prevState,
          clientData: payload.data.data
        }),
        finish: prevState => ({
          ...prevState,
        })
      });

    case VIEW_ALL_WORKER_PROFILE:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
        }),
        success: prevState => ({
          ...prevState,
          workerData: payload.data.data
        }),
        finish: prevState => ({
          ...prevState,
        })
      });

    default:
      return state;
  }
};

export default reducer;