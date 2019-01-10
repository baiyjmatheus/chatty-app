import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <footer className="chatbar">
        <input onKeyPress={this.handleNameChange} className="chatbar-username" placeholder="Your Name (Optional)" />
        <input onKeyPress= {this.handleKeyPress}className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }

  // When enter is pressed, sends new message to server
  handleKeyPress = (evt) => {
    if (evt.key === 'Enter' && evt.target.value !== '') {
      const message = {
        content: evt.target.value
      };
      this.props.currentUser.name === '' ? message.username = 'Anonymous' : message.username = this.props.currentUser.name
      evt.target.value = '';
      this.props.onSendMessage(message);
    }
  }

  // When enter is pressed, sends new username to server
  handleNameChange = (evt) => {
    if (evt.key === 'Enter') {
      const newUsername = evt.target.value === '' ? 'Anonymous' : evt.target.value;
      const previousUsername = this.props.currentUser.name === '' ? 'Anoynmous' : this.props.currentUser.name;
      const notificationMessage = {
        content: `${previousUsername} has changed their name to ${newUsername}`
      };
      this.props.changeName(newUsername);
      this.props.onEnterNameChange(notificationMessage);
    }
  }

}

export default ChatBar;