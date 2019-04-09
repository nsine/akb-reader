import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, FormField, Button, Box } from 'grommet';
import VK, {Auth} from 'react-vk';
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
              <VK apiId={process.env.REACT_APP_VK_APP_ID}>
                <Auth options={{
                  onAuth: user => {
                    console.log(user);
                  },
                }}/>
              </VK>
              {/* <Button type="submit" primary label="VK" /> */}
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