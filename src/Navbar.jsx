import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="counter">{this.props.counter} users online</span>
        </nav>
      </div>
    );
  }
}

export default Navbar;