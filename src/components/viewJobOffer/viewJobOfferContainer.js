import { connect } from 'react-redux';
import ViewJobOffer from './viewJobOffer';

// import { viewJobOffer } from '../entities/worker';

const mapStateToProps = state => {
  const { user } = state.auth;

  return {
    user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleViewJobOffer: (data) => {
      dispatch(ViewJobOffer(data));
    }
  };
};

const viewJobOfferContainer = connect(mapStateToProps, mapDispatchToProps)(
  ViewJobOffer
);
export default viewJobOfferContainer;
