import { connect } from 'react-redux';
import SearchBid from './searchBid';

// import { searchBid } from '../entities/worker';

const mapStateToProps = state => {
  const { user } = state.auth;

  return {
    user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleSearchBid: (data) => {
      dispatch(SearchBid(data));
    }
  };
};

const searchBidContainer = connect(mapStateToProps, mapDispatchToProps)(
  SearchBid
);
export default searchBidContainer;
