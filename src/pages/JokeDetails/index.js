import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class JokeDetailsPage extends Component {
  state = {  }
  render() {
    return (
      <div>
        <div>JokeDetailsPage</div>
        <Link to='/'>Go to home</Link>
      </div>
    );
  }
}

export default JokeDetailsPage;