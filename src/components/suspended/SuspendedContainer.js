import { connect } from 'react-redux';
import Suspended from './Suspended';

// import { suspended, putUser } from '../entities/auth';

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

const SuspendedContainer = connect(mapStateToProps, mapDispatchToProps)(Suspended);
export default SuspendedContainer;
