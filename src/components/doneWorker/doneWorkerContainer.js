import { connect } from 'react-redux';
import DoneWorker from './doneWorker';

// import { doneWorker } from '../entities/worker';

const mapStateToProps = state => {
  const { user } = state.auth;

  return {
    user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleDoneWorker: (data) => {
      dispatch(DoneWorker(data));
    }
  };
};

const doneWorkerContainer = connect(mapStateToProps, mapDispatchToProps)(
  DoneWorker
);
export default doneWorkerContainer;
