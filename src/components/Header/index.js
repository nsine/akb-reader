import React, { Component } from 'react';
import { Box, Anchor } from 'grommet';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    return (
      <Box direction="row" pad="large" margin={{bottom: '1rem'}} justify="end">
        {
          this.props.isLoggedIn ? (
            <div>{this.props.username}</div>
          ) : (
            <Link to="/login">Login</Link>
          )
        }
      </Box>
    )
  }
}

export default connect(
  state => ({
    isLoggedIn: state.user.isLoggedIn,
    username: state.user.name,
  })
)(Header);