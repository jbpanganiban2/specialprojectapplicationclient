import React from 'react';
import { Chat, Channel, ChannelList, Window } from 'stream-chat-react';
import { ChannelHeader, MessageList } from 'stream-chat-react';
import { MessageInput, Thread } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';

import 'stream-chat-react/dist/css/index.css';



class ChatClient extends React.Component {


  constructor() {
      super()
      this.state = {
          chatClient: '',
          filters: '',
          sort: ''
      }
  } 

  componentWillMount() {

    // const chatClient = new StreamChat('jfnumwgjn7pk');
    // const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZ2VudGxlLWhpbGwtNSJ9.IL_4NLpDVgE15bdUrTySvtZtPx7dEjnaEwGOX_dnJTY';

    // chatClient.setUser(
    //   {
    //     id: 'gentle-hill-5',
    //     name: this.props.user.first_name + ' ' + this.props.user.last_name,
    //     image: 'https://getstream.io/random_svg/?id=gentle-hill-5&name=Gentle+hill'
    //   },
    //   userToken,
    // );


    const chatClient = new StreamChat("c9mjnrm3srny");
    // const userToken = chatClient.createToken(this.props.user.username);

    chatClient.setUser(
        {
            id: this.props.user.username,
            name: this.props.user.first_name + ' ' + this.props.user.last_name,
            image: this.props.user.profilepic
        },
        this.props.user.token,
    );
    console.log("HEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEY");                    
    console.log(this.props.user.token);                    

    const filters = { type: 'messaging', members: { $in: [this.props.user.username] } };
    const sort = { last_message_at: -1 };
    const channels = chatClient.queryChannels(filters, sort);
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        console.log(filters);
        console.log(sort);
        console.log(chatClient);
        this.setState({
                     chatClient: chatClient,
                      filters: filters,
                      sort: { last_message_at: -1 } 
                  })
        console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
        console.log(this.state.filters);
        console.log(this.state.sort);
        console.log(this.state.chatClient);
  }

  render(){
  return(
  <div className="app">  
 
    <Chat client={this.state.chatClient} theme={'messaging light'}>
      <ChannelList
        filters={this.state.filters}
        sort={this.state.sort}
      />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
 

  </div>

  );
  }

}

export default ChatClient