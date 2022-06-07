import { connect } from 'react-redux';
import ChatWorker from './ChatWorker';

// import { ChatWorker } from '../entities/worker';

const mapStateToProps = state => {
  const { user } = state.auth;

  return {
    user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleChatWorker: (data) => {
      dispatch(ChatWorker(data));
    }
  };
};

const ChatWorkerContainer = connect(mapStateToProps, mapDispatchToProps)(
  ChatWorker
);
export default ChatWorkerContainer;
