import * as Api from '../api/admin';
import { handle } from 'redux-pack';

// Action Types
const VIEW_ALL_CLIENT_PROFILE = 'ADMIN/VIEW_ALL_CLIENT_PROFILE';


export const viewAllClientProfile = () => {
  return dispatch => {
    return dispatch({
      type: VIEW_ALL_CLIENT_PROFILE,
      promise: Api.viewAllClientProfile()
    });
  };
};


// Initial State
const initialState = {
  /* Get Session */
  data: [],
  clientData: [],
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
    
    default:
      return state;
  }
};

export default reducer;