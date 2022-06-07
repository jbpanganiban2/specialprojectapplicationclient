import * as Api from '../api/auth';
import { handle } from 'redux-pack';

// Action Types
const GET_SESSION = 'AUTH/GET_SESSION';
const LOGIN = 'AUTH/LOGIN';
const LOGOUT = 'AUTH/LOGOUT';
// const SIGN_UP = 'AUTH/SIGN_UP';
const SIGN_UP_CLIENT = 'AUTH/SIGN_UP_CLIENT';
const SIGN_UP_WORKER = 'AUTH/SIGN_UP_WORKER';
const PUT_USER = 'AUTH/PUT_USER';
const UPDATE_CLIENT_SESSION = 'AUTH/UPDATE_CLIENT_SESSION';
const UPDATE_WORKER_SESSION = 'AUTH/UPDATE_WORKER_SESSION';
const UPDATE_SESSION = 'AUTH/UPDATE_SESSION';

// Action Creators
export const getSession = () => {
  return dispatch => {
    return dispatch({
      type: GET_SESSION,
      promise: Api.getSession()
    });
  };
};

export const login = credentials => {
  return dispatch => {
    return dispatch({
      type: LOGIN,
      promise: Api.login(credentials)
    });
  };
};

// export const logout = empno => {
//   return dispatch => {
//     return dispatch({
//       type: LOGOUT,
//       promise: Api.logout(empno)
//     });
//   };
// };

export const logout = () => {
  return dispatch => {
    return dispatch({
      type: LOGOUT,
      promise: Api.logout()
    });
  };
};

// export const signUp = data => {
//   return dispatch => {
//     return dispatch({
//       type: SIGN_UP,
//       promise: Api.signUp(data)
//     });
//   };
// };

export const signUpClient = data => {
  return dispatch => {
    return dispatch({
      type: SIGN_UP_CLIENT,
      promise: Api.signUpClient(data)
    });
  };
};

export const signUpWorker = data => {
  return dispatch => {
    return dispatch({
      type: SIGN_UP_WORKER,
      promise: Api.signUpWorker(data)
    });
  };
};

export const putUser = data => {
  return {
    type: PUT_USER,
    payload: data
  };
};

export const updateSession = (prevData, newData) => {
  return {
    type: UPDATE_SESSION,
    payload: {
      ...prevData,
      profilepic: newData.profilepic,
      first_name: newData.first_name,
      last_name: newData.last_name,
      address: newData.address,
      birthday: newData.birthday,
      // age: newData.age,
      sex: newData.sex,
      email: newData.email,
      // username: newData.username,
      skills: newData.skills
    }
  };
};

export const updateClientSession = (prevData, newData) => {
  return {
    type: UPDATE_CLIENT_SESSION,
    payload: {
      ...prevData,
      profilepic: newData.profilepic,
      first_name: newData.first_name,
      last_name: newData.last_name,
      address: newData.address,
      birthday: newData.birthday,
      // age: newData.age,
      sex: newData.sex,
      email: newData.email,
      // username: newData.username,
      // userName: newData.username
      // status: newData.status,
      // firstName: newData.name.split(" ")[0],
    }
  };
};

export const updateWorkerSession = (prevData, newData) => {
  return {
    type: UPDATE_WORKER_SESSION,
    payload: {
      ...prevData,
      profilepic: newData.profilepic,
      first_name: newData.first_name,
      last_name: newData.last_name,
      address: newData.address,
      birthday: newData.birthday,
      // age: newData.age,
      sex: newData.sex,
      email: newData.email,
      username: newData.username,
      skills: newData.skills
      // status: newData.status,
      // firstName: newData.name.split(" ")[0],
    }
  };
};


// Initial State
const initialState = {
  /* Get Session */
  user: null,
  hasSession: true,
  isGettingSession: true,
  admin_id: null,
  client_id: null,
  worker_id: null,

  loggedIn: false,

  error_username: '',
  error_password: '',

  /* Login */
  loginError: null
};

// Reducer
const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_SESSION:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isGettingSession: true
        }),
        success: prevState => ({
          ...prevState,
          user: payload.data.data,
          loggedIn: payload.data.data ? true:false,
          hasSession: payload.data.data ? true:false,
          admin_id: payload.data.data ? payload.data.data.admin_id : null,
          client_id: payload.data.data ? payload.data.data.client_id : null,
          worker_id: payload.data.data ? payload.data.data.worker_id : null,
        }),
        finish: prevState => ({
          ...prevState,
          isGettingSession: false
        })
      });

    case LOGIN:
      return handle(state, action, {
        start: prevState => ({
          ...prevState
        }),
        success: prevState => ({
          ...prevState,
          user: payload.data.data,
          hasSession: true,
          loginError: null,
          admin_id: payload.data.data.admin_id,
          client_id: payload.data.data.client_id,
          worker_id: payload.data.data.worker_id,

          loggedIn: true,
          error_password: false,
          error_username: false
        }),
        failure: prevState => ({
          ...prevState,
          loginError: payload.response.data.message,
          error_username: "Invalid",
          error_password: "Invalid"
        }),
        finish: prevState => ({
          ...prevState
        })
      });

    case LOGOUT:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isGettingSession: true
        }),
        success: prevState => ({
          ...prevState,
          user: null,
          hasSession: false,
          loggedIn: false,
          // admin_id: null
        }),
        finish: prevState => ({
          ...prevState,
          isGettingSession: false
        })
      });
      
    case SIGN_UP_CLIENT:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
        }),
        success: (prevState) => ({
          ...prevState,
        }),
        failure: prevState => ({
          ...prevState,
        }),
        finish: prevState => ({
          ...prevState,
        })
      });
    case SIGN_UP_WORKER:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
        }),
        success: (prevState) => ({
          ...prevState,
        }),
        failure: prevState => ({
          ...prevState,
        }),
        finish: prevState => ({
          ...prevState,
        })
      });
    case PUT_USER:
      return{
        ...state,
        admin_id: payload.admin_id,
        client_id: payload.client_id,
        worker_id: payload.worker_id,
        username: payload.username,
        user: payload,
        hasSession: true,
        loginError: null,

        loggedIn: true,
        error_password: false,
        error_username: false
      };
    case UPDATE_SESSION:
      return{
        ...state,
        user: payload
      };  
    case UPDATE_CLIENT_SESSION:
      return{
        ...state,
        user: payload
      };
    case UPDATE_WORKER_SESSION:
      return{
        ...state,
        user: payload
      };  

    default:
      return state;
  }
};

export default reducer;


