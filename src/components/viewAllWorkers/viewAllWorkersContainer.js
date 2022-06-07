import { connect } from 'react-redux';
import ViewAllWorkers from './viewAllWorkers';

// import { viewAllWorkers } from '../entities/worker';

const mapStateToProps = state => {
  const { user } = state.auth;

  return {
    user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleViewAllWorkers: (data) => {
      dispatch(ViewAllWorkers(data));
    }
  };
};

const viewAllWorkersContainer = connect(mapStateToProps, mapDispatchToProps)(
  ViewAllWorkers
);
export default viewAllWorkersContainer;
