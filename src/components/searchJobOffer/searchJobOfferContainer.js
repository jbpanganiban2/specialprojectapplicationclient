import { connect } from 'react-redux';
import SearchJobOffer from './searchJobOffer';

// import { searchJobOffer } from '../entities/worker';

const mapStateToProps = state => {
  const { user } = state.auth;

  return {
    user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleSearchJobOffer: (data) => {
      dispatch(SearchJobOffer(data));
    }
  };
};

const searchJobOfferContainer = connect(mapStateToProps, mapDispatchToProps)(
  SearchJobOffer
);
export default searchJobOfferContainer;
