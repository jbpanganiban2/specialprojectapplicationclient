import { connect } from 'react-redux';
import DoneClient from './doneClient';

// import { doneClient } from '../entities/worker';

const mapStateToProps = state => {
  const { user } = state.auth;

  return {
    user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleDoneClient: (data) => {
      dispatch(DoneClient(data));
    }
  };
};

const doneClientContainer = connect(mapStateToProps, mapDispatchToProps)(
  DoneClient
);
export default doneClientContainer;
