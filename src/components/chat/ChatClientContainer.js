import { connect } from 'react-redux';
import ChatClient from './ChatClient';

// import { ChatClient } from '../entities/client';

const mapStateToProps = state => {
  const { user } = state.auth;

  return {
    user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleChatClient: (data) => {
      dispatch(ChatClient(data));
    }
  };
};

const ChatClientContainer = connect(mapStateToProps, mapDispatchToProps)(
  ChatClient
);
export default ChatClientContainer;
