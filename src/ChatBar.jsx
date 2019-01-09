import React, { Component } from 'react';

class ChatBar extends Component {
  render() {
    return(
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" onChange={this.props.changeName} value={ this.props.currentUser.name } />
        <input onSend= {this._handleMessage}className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }

  _handleMessage = (evt) => {
    if (evt.key === 'Enter' && evt.target.value !== '') {
      const message = {
        username: this.props.currentUser.name,
        content: evt.target.value
      };
      evt.target.value = '';
      this.props.onSend(message);
    }
  }

}

export default ChatBar;