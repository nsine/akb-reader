import React, { Component } from 'react';

import JokeItem from '../JokeItem';

class JokesList extends Component {
  render() {
    return (
      this.props.posts.forEach(post => <JokeItem post={post}></JokeItem>)
    );
  }
}

export default JokesList;
