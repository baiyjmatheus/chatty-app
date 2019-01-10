import React, { Component } from 'react';

class Message extends Component {
  render() {
    const messageStyle = {
      color: this.props.color
    };
    if (this.props.type === 'incomingMessage') {
      return(
        <div key={ this.props.id } className="message">
          <span className="message-username" style={messageStyle}>{ this.props.username }</span>
          <span className="message-content">{ this.props.content }</span>
        </div>
      );
    } else {
      return (
        <div className="message system">
          <span className="message-content">{ this.props.content }</span>
        </div>
      );
    }
  }
}

export default Message;