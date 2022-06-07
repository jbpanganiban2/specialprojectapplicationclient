import { connect } from 'react-redux';
import NavigationBar from './NavigationBar';

import { logout } from '../entities/auth';

const mapStateToProps = state => {
  const { user, loggedIn } = state.auth;

  return {
    user,
    loggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
  	handleLogout: () => {
      dispatch(logout());
    }
  };
};

const NavigationBarContainer = connect(mapStateToProps, mapDispatchToProps)(
  NavigationBar
);
export default NavigationBarContainer;