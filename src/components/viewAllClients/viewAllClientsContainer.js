import { connect } from 'react-redux';
import ViewAllClients from './viewAllClients';

// import { viewAllClients } from '../entities/worker';

const mapStateToProps = state => {
  const { user } = state.auth;

  return {
    user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleViewAllClients: (data) => {
      dispatch(ViewAllClients(data));
    }
  };
};

const viewAllClientsContainer = connect(mapStateToProps, mapDispatchToProps)(
  ViewAllClients
);
export default viewAllClientsContainer;
