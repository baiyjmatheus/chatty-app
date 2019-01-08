import React, { Component } from 'react';
import Navbar from './Navbar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import messagesData from './messages.json';

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: messagesData.messages,
      currentUser: messagesData.currentUser
    };
  }

  sendMessage = (message) => {
    const newMessage = {
      // hard coded id
      id: this.state.messages.length + 1, 
      username: message.username,
      content: message.content,
      // hard coded type
      type: 'incomingMessage'
    };

    this.setState({
      messages: this.state.messages.concat(newMessage)
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} onEnterPress={this.sendMessage}/>
      </div>
    );
  }

  componentDidMount() {
    setTimeout(() => {
      const newMessage = {id: 8, username: 'Michelle', content: 'LETS GET DINNER EVERYONE!', type: 'incomingMessage'};
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages});
    }, 3000);
  }
}

export default App;
