import React, { Component } from 'react';
import Navbar from './Navbar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: ''},
      messages: [],
      counter: ''
    };
  }

  render() {
    return (
      <div>
        <Navbar counter={this.state.counter}/>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} onSendMessage={this._addMessage} changeName={this._changeName} onEnterNameChange={this._sendNotification} />
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
      if (incomingMessage.type === 'counter') {
        this.setState({
          counter: incomingMessage.counter
        });
      } else {
        this.setState({
          messages: [...this.state.messages, incomingMessage]
        });
      }
    }
  }

  // Sends new message to server
  _addMessage = (message) => {
    const newMessage = {
      type: "postMessage",
      username: message.username,
      content: message.content
    };

    this.socket.send(JSON.stringify(newMessage));
  }

  // Changes currentUser state
  _changeName = (newUsername) => {
    this.setState({
      currentUser: {name: newUsername}
    });
  }

  // Send notification to server when a user changes the name
  _sendNotification = (message) => {
    const newMessage = {
      type: 'postNotification',
      content: message.content
    };
    this.socket.send(JSON.stringify(newMessage));
  }

}

export default App;
