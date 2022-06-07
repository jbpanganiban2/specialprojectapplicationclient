import { connect } from 'react-redux';
import OnGoingClient from './onGoingClient';

// import { onGoingClient } from '../entities/worker';

const mapStateToProps = state => {
  const { user } = state.auth;

  return {
    user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleOnGoingClient: (data) => {
      dispatch(OnGoingClient(data));
    }
  };
};

const onGoingClientContainer = connect(mapStateToProps, mapDispatchToProps)(
  OnGoingClient
);
export default onGoingClientContainer;
