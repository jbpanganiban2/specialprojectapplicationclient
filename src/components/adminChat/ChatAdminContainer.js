import { connect } from 'react-redux';
import ChatAdmin from './ChatAdmin';

// import { ChatAdmin } from '../entities/admin';

const mapStateToProps = state => {
  const { user } = state.auth;

  return {
    user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleChatAdmin: (data) => {
      dispatch(ChatAdmin(data));
    }
  };
};

const ChatAdminContainer = connect(mapStateToProps, mapDispatchToProps)(
  ChatAdmin
);
export default ChatAdminContainer;
