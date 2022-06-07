import { connect } from 'react-redux';
import OnGoingWorker from './onGoingWorker';

// import { onGoingWorker } from '../entities/worker';

const mapStateToProps = state => {
  const { user } = state.auth;

  return {
    user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleOnGoingWorker: (data) => {
      dispatch(OnGoingWorker(data));
    }
  };
};

const onGoingWorkerContainer = connect(mapStateToProps, mapDispatchToProps)(
  OnGoingWorker
);
export default onGoingWorkerContainer;
