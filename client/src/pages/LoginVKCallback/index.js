import React, { Component } from 'react';
import { connect } from 'react-redux';
import qs from 'qs';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import * as actions from '../../actions/userActions';

class LoginVKCallbackPage extends Component {
  static propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
    location: ReactRouterPropTypes.location.isRequired,

    isLoggedIn: PropTypes.bool,
  }

  state = {
    username: null,
    password: null,
  };

  componentDidMount() {
    const queryParams = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    const vkCode = queryParams.code;
    const vkCodeChannel = new BroadcastChannel('vkCodeChannel');
    vkCodeChannel.postMessage(vkCode);
    vkCodeChannel.close();
    window.close();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isLoggedIn) {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div></div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
});

const mapDispatchToProps = {
  loginWithVk: actions.loginWithVk,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginVKCallbackPage);
