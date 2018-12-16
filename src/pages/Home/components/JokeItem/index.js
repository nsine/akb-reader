import React, { Component } from 'react';

class JokeItem extends Component {
  render() {
    return (
      <div>{this.props.post.text}</div>
    );
  }
}

export default JokeItem;