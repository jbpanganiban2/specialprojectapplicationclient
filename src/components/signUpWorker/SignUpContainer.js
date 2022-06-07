import { connect } from 'react-redux';
import SignUp from './SignUp';

import { signUpWorker } from '../entities/auth';

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleSignUp: (data) => {
      dispatch(signUpWorker(data));
    }
  };
};

const SignUpContainer = connect(mapStateToProps, mapDispatchToProps)(
  SignUp
);
export default SignUpContainer;
