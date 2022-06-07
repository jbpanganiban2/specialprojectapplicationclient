import { connect } from 'react-redux';
import SignUp from './SignUp';

import { signUpClient } from '../entities/auth';

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleSignUp: (data) => {
      dispatch(signUpClient(data));
    }
  };
};

const SignUpContainer = connect(mapStateToProps, mapDispatchToProps)(
  SignUp
);
export default SignUpContainer;
