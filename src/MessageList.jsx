import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const messagesList = this.props.messages.map((message) => {
      return <Message key={message.id} username={message.username} content={message.content} type={message.type}/>
    });

    return (
      <div>
        <main className="messages">
          {messagesList}
        </main>
      </div>
    );
  }
}
export default MessageList;