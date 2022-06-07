import { connect } from 'react-redux';
import App from './App';

import { getSession, login, logout } from './components/entities/auth';

const mapStateToProps = state => {
  const { isGettingSession, hasSession, user } = state.auth;

  return {
    isGettingSession,
    hasSession,
    user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleGetSession: () => {
      dispatch(getSession());
    },
    handleLogin: credentials => {
      dispatch(login(credentials));
    },
    handleLogout: empno => {
      dispatch(logout(empno));
    }
  };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppContainer;
