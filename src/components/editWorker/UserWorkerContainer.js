import { connect } from 'react-redux';
import UserWorker from './UserWorker';

// import { updateWorkerSession } from '../entities/auth';
import { updateSession, putUser } from '../entities/auth';

const mapStateToProps = state => {
  const { user } = state.auth;
  return {
  	user
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//   	handleUpdateWorkerSession: (prevData, newData) => {
//       dispatch(updateWorkerSession(prevData, newData));
//     }
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    // handleUpdateClientSession: (prevData, newData) => {
   //    dispatch(updateClientSession(prevData, newData));
    // }  
    handleUpdateSession: (prevData, newData) => {
      dispatch(updateSession(prevData, newData));
    },
    // handleLogin: credentials => {
    //   dispatch(login(credentials));
    // },
    handlePutUser: data => {
      dispatch(putUser(data));
    }
  };
};

const UserWorkerContainer = connect(mapStateToProps, mapDispatchToProps)(
  UserWorker
);
export default UserWorkerContainer;
