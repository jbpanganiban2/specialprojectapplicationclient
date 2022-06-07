import { connect } from 'react-redux';
import Login from './LogIn';

import { login, putUser } from '../entities/auth';

const mapStateToProps = state => {
  const { loginError, error_username, error_password } = state.auth;

  return {
    loginError,
    error_username,
    error_password
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleLogin: credentials => {
      dispatch(login(credentials));
    },
    handlePutUser: data => {
      dispatch(putUser(data));
    }
  };
};

const LogInContainer = connect(mapStateToProps, mapDispatchToProps)(Login);
export default LogInContainer;
