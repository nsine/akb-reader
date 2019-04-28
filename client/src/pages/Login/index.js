import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, FormField, Button, Box } from 'grommet';
import { connect } from 'react-redux';
import qs from 'qs';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';


import * as actions from '../../actions/userActions';

class LoginPage extends Component {
  static propTypes = {
    login: PropTypes.func,
    loginWithVk: PropTypes.func,

    isLoggedIn: PropTypes.bool,

    history: ReactRouterPropTypes.history.isRequired,
  }

  state = {
    username: null,
    password: null,
  };

  handleFormSubmit = ({ value }) => {
    this.props.login(value.name, value.password);
  }

  handleVKLinkClick = () => {
    const params = {
      client_id: process.env.REACT_APP_VK_APP_ID,
      scope: 'friends',
      redirect_uri: process.env.REACT_APP_VK_REDIRECT_URL,
      response_type: 'code',
      v: '5.92',
    };

    const width = 600, height = 600;
    const left = (window.innerWidth / 2) - (width / 2);
    const top = (window.innerHeight / 2) - (height / 2);

    let vkCodeChannel = new BroadcastChannel('vkCodeChannel');
    vkCodeChannel.onmessage = e => {
      const vkCode = e.data;
      this.props.loginWithVk(vkCode);
    };

    window.open('https://oauth.vk.com/authorize?' + qs.stringify(params), '',
      `toolbar=no, location=no, directories=no, status=no, menubar=no,
      scrollbars=no, resizable=no, copyhistory=no, width=${width},
      height=${height}, top=${top}, left=${left}`
    );
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('did update');
    if (this.props.isLoggedIn) {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div>
        <div>LoginPage</div>
        <Link to='/'>Go to home</Link>

        <Box fill align="center" justify="center">
          <Box width="medium">
            <Form
              onSubmit={this.handleFormSubmit}
            >
              <FormField name="name" label="Name" />
              <FormField name="password" label="Password" />
              <Button type="submit" primary label="Login" />
              <Button type="button" primary label="VK" onClick={this.handleVKLinkClick} />
            </Form>
          </Box>
        </Box>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
});

const mapDispatchToProps = {
  login: actions.login,
  loginWithVk: actions.loginWithVk,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
