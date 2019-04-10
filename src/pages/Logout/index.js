import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/userActions';

class LogoutPage extends Component {
  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.logout();
    }
    
    this.props.history.push('/');
  }

  render() {
    return (
      <div></div>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.user.isLoggedIn,
  }),
  {
    logout: actions.logout,
  }
)(LogoutPage);