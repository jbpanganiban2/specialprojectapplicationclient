import { connect } from 'react-redux';
import ViewReported from './viewReported';

// import { viewReported } from '../entities/worker';

const mapStateToProps = state => {
  const { user } = state.auth;

  return {
    user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleViewReported: (data) => {
      dispatch(ViewReported(data));
    }
  };
};

const viewReportedContainer = connect(mapStateToProps, mapDispatchToProps)(
  ViewReported
);
export default viewReportedContainer;
