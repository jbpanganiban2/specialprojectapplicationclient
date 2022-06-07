import { connect } from 'react-redux';
import Unapproved from './Unapproved';

// import { unapproved, putUser } from '../entities/auth';

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

const UnapprovedContainer = connect(mapStateToProps, mapDispatchToProps)(Unapproved);
export default UnapprovedContainer;
