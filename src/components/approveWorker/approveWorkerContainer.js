import { connect } from 'react-redux';
import ApproveWorker from './approveWorker';

// import { approveWorker } from '../entities/worker';

const mapStateToProps = state => {
  const { user } = state.auth;

  return {
    user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleApproveWorker: (data) => {
      dispatch(ApproveWorker(data));
    }
  };
};

const approveWorkerContainer = connect(mapStateToProps, mapDispatchToProps)(
  ApproveWorker
);
export default approveWorkerContainer;
