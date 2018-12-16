import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LoginPage extends Component {
  state = {  }
  render() {
    return (
      <div>
        <div>LoginPage</div>
        <Link to='/'>Go to home</Link>
      </div>
    );
  }
}

export default LoginPage;