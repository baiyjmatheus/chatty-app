import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <footer className="chatbar">
        <input onKeyPress={this.handleNameChange} className="chatbar-username" placeholder="Your Name (Optional)" />
        <input onKeyPress= {this.handleSendMessage}className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }

  // When enter is pressed, sends new message to server
  handleSendMessage = (evt) => {
    if (evt.key === 'Enter' && evt.target.value !== '') {
      const message = {
        content: evt.target.value
      };
      this.props.currentUser.name === '' ? message.username = 'Anonymous' : message.username = this.props.currentUser.name
      evt.target.value = '';
      if (message.content.match(/(https?:\/\/.*\.(?:png|jpg|gif))$/)) {
        message.image = message.content.match(/(https?:\/\/.*\.(?:png|jpg|gif))$/)[0];
        message.content = message.content.replace(message.image, '');
      }
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