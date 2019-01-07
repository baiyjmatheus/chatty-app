import React, {Component} from 'react';
import Navbar from './Navbar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <MessageList />
        <ChatBar />
      </div>
    );
  }
}
export default App;
