import React, { Component } from 'react';

class ChatBar extends Component {
  render() {
    return(
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" value={ this.props.currentUser.name } />
        <input onKeyPress= {this.handleKeyPress}className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }

  handleKeyPress = (evt) => {
    if (evt.key === 'Enter' && evt.target.value !== '') {
      const message = {
        username: this.props.currentUser.name,
        content: evt.target.value
      };
      evt.target.value = '';
      this.props.onEnterPress(message);
    }
  }

}

export default ChatBar;