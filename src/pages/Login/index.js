import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, FormField, Button, Box } from 'grommet';
import { connect } from 'react-redux';

import * as actions from '../../actions/userActions';

class LoginPage extends Component {
  state = {
    username: null,
    password: null,
  };

  handleFormSubmit = ({ value }) => {
    this.props.login(value.name, value.password);
  }

  handleVKLinkClick = () => {
    const backendVkUrl = `${process.env.REACT_APP_API_URL}/auth/vk`;

    window.open(`https://oauth.vk.com/authorize?  
      client_id=${process.env.REACT_APP_VK_APP_ID}&  
      scope=friends&  
      redirect_uri=${backendVkUrl}&  
      response_type=code& 
      v=5.92`
    )
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('did update')
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
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);