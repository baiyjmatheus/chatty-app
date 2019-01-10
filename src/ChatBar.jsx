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

  handleKeyPress = (evt) => {
    if (evt.key === 'Enter' && evt.target.value !== '') {
      const message = {
        // username: this.props.currentUser.name,
        content: evt.target.value
      };
      this.props.currentUser.name === '' ? message.username = 'Anonymous' : message.username = this.props.currentUser.name
      evt.target.value = '';
      this.props.onSendMessage(message);
    }
  }

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