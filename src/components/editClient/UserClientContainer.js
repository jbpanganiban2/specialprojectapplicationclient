import { connect } from 'react-redux';
import UserClient from './UserClient';

// import { updateClientSession } from '../entities/auth';
import { updateSession, putUser } from '../entities/auth';


const mapStateToProps = state => {
  const { user } = state.auth;
  return {
  	user
  };
};

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

const UserClientContainer = connect(mapStateToProps, mapDispatchToProps)(
  UserClient
);
// const UserContainer = connect(mapStateToProps, mapDispatchToProps)(
//   User
// );
export default UserClientContainer;
