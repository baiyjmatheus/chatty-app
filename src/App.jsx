import React, { Component } from 'react';
import Navbar from './Navbar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: "Matheus"},
      messages: []
    };
  }

  render() {
    return (
      <div>
        <Navbar />
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} onSend={this._handleMessageAdd} changeName={this.handleNameChange} />
      </div>
    );
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    // When client connects to socket event
    this.socket.onopen = () => {
      console.log("Connected to WebSocket");
    }
    // Receive message from server
    this.socket.onmessage = (payload) => {
      const incomingMessage = JSON.parse(payload.data);
      this.setState({
        messages: [...this.state.messages, incomingMessage]
      });
    }
  }

  _handleMessageAdd = (message) => {
    const newMessage = {
      username: message.username,
      content: message.content
    };

    this.socket.send(JSON.stringify(newMessage));
  }

  _handleNameChange = (evt) => {
    this.setState({
      currentUser: {name: evt.target.value}
    })
  }

}

export default App;
