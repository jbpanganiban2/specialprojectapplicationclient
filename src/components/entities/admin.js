import * as Api from '../api/admin';
import { handle } from 'redux-pack';

// Action Types
const VIEW_ALL_CLIENTS = 'COURSE/VIEW_ALL_CLIENTS';


export const viewAllClientProfile = () => {
  return dispatch => {
    return dispatch({
      type: GET_USERS,
      promise: Api.viewAllClientProfile()
    });
  };
};


// Initial State
const initialState = {
  /* Get Session */
  data: [],
  clientData: []

};


// Reducer
const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case VIEW_ALL_CLIENTS:
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