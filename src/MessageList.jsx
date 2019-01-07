import React, { Component } from 'react';
import Message from './Message.jsx';
import messages from './messages.json';

function getMessages() {
  return new Promise(resolve => {
    setTimeout(resolve, 1000);
  }).then(() => messages);
}

class MessageList extends Component {
  render() {
    const messagesList = messages.map((message) => {
      return <Message username={message.username} content={message.content} type={message.type}/>
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