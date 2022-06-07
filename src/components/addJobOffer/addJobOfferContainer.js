import { connect } from 'react-redux';
import AddJobOffer from './addJobOffer';

import { addJobOffer } from '../entities/client';

const mapStateToProps = state => {
  const { user } = state.auth;

  return {
    user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleAddJobOffer: (data) => {
      dispatch(addJobOffer(data));
    }
  };
};

const addJobOfferContainer = connect(mapStateToProps, mapDispatchToProps)(
  AddJobOffer
);
export default addJobOfferContainer;
