// import * as Api from '../api/client';
// import { handle } from 'redux-pack';

// // Action Types

// const EDIT_CLIENT_PROFILE = 'CLIENT/EDIT_CLIENT_PROFILE';
// const EDIT_CLIENT_PICTURE = 'CLIENT/EDIT_CLIENT_PICTURE';
// const UPDATE_SESSION = 'CLIENT/UPDATE_SESSION';



// // Action Creators

// export const editClientProfile = data => {
//   return dispatch => {
//     return dispatch({
//       type: EDIT_CLIENT_PROFILE,
//       promise: Api.editClientProfile(data)
//     });
//   };
// };


// export const editClientPicture = data => {
//   return dispatch => {
//     return dispatch({
//       type: EDIT_CLIENT_PICTURE,
//       promise: Api.editClientPicture(data)
//     });
//   };
// };


// export const updateClientSession = (prevData, newData) => {
//   return {
//     type: UPDATE_CLIENT_SESSION,
//     payload: {
//       ...prevData,
//       profilepic: newData.profilepic,
//       first_name: newData.first_name,
//       last_name: newData.last_name,
//       address: newData.address,
//       birthday: newData.birthday,
//       // age: newData.age,
//       sex: newData.sex,
//       email: newData.email,
//       username: newData.username,
//       userName: newData.username
//       // status: newData.status,
//       // firstName: newData.name.split(" ")[0],
//     }
//   };
// };



// // Initial State
// const initialState = {
//   /* Get Session */
//   data: [],
//   dataStudent: [],
//   adviserData: [],
//   adviserHistoryData: []

// };