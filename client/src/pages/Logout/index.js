import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import * as actions from '../../actions/userActions';

class LogoutPage extends Component {
  static propTypes = {
    history: ReactRouterPropTypes.history.isRequired,

    isLoggedIn: PropTypes.bool,
    logout: PropTypes.func,
  }

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
