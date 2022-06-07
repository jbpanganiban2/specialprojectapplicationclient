import React from 'react';
import { Chat, Channel, ChannelList, Window } from 'stream-chat-react';
import { ChannelHeader, MessageList } from 'stream-chat-react';
import { MessageInput, Thread } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';

import 'stream-chat-react/dist/css/index.css';

// const chatAdmin = new StreamChat("bv3gdthqv2pt");
//     // const userToken = chatAdmin.createToken(this.props.user.username);

//     chatAdmin.setUser(
//         {
//             id: 'admin',
//             name: 'Admin'
//         },
//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWRtaW4ifQ.VSStJVHY_pl-L0rgLVDDA7hoPVeji8-JTKh24_wairE',
//     );

//     const filters = { type: 'messaging', members: { $in: ['admin'] } };
//     const sort = { last_message_at: -1 };
//     const channels = chatAdmin.queryChannels(filters, sort);

class ChatAdmin extends React.Component {


  constructor() {
      super()
      this.state = {
          chatAdmin: '',
          filters: '',
          sort: ''
      }
  } 

  componentWillMount() {

    // const chatAdmin = new StreamChat('jfnumwgjn7pk');
    // const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZ2VudGxlLWhpbGwtNSJ9.IL_4NLpDVgE15bdUrTySvtZtPx7dEjnaEwGOX_dnJTY';

    // chatAdmin.setUser(
    //   {
    //     id: 'gentle-hill-5',
    //     name: this.props.user.first_name + ' ' + this.props.user.last_name,
    //     image: 'https://getstream.io/random_svg/?id=gentle-hill-5&name=Gentle+hill'
    //   },
    //   userToken,
    // );


    const chatAdmin = new StreamChat("2q5sjjwwhm5j");
    // // const userToken = chatAdmin.createToken(this.props.user.username);

    chatAdmin.setUser(
        {
            id: this.props.user.username,
            name: 'Admin'
        },
        this.props.user.token,
    );
    console.log("HEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEY");                    
    console.log(this.props.user.token);                    

    const filters = { type: 'messaging', members: { $in: [this.props.user.username] } };
    const sort = { last_message_at: -1 };
    const channels = chatAdmin.queryChannels(filters, sort);
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        console.log(filters);
        console.log(sort);
        console.log(chatAdmin);
        this.setState({
                     chatAdmin: chatAdmin,
                      filters: filters,
                      sort: sort 
                  })

        // await this.setState(state => ({
        //   chatAdmin: chatAdmin,
        //   filters: filters,
        //   sort: sort 
        // }))

        console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
        console.log(this.state.filters);
        console.log(this.state.sort);
        console.log(this.state.chatAdmin);
  }

  render(){
  return(
  <div className="app">  
 
    <Chat client={this.state.chatAdmin} theme={'messaging light'}>
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

export default ChatAdmin;