import React, { Component } from 'react';
import Message from './Message.jsx';
import PropTypes from 'prop-types';

class MessageList extends Component {
  render() {
    // Create a new Message component for each message
    const messagesList = this.props.messages.map((message) => {
      return <Message key={message.id} username={message.username} content={message.content} type={message.type} color={message.color} imgSrc={message.image}/>
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
// prop validation
MessageList.propTypes = {
  messages: PropTypes.array.isRequired
}
export default MessageList;