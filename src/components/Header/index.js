import React, { Component } from 'react';
import { Box, Anchor } from 'grommet';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <Box direction="row" pad="large" margin={{bottom: '1rem'}} justify="end">
        <Link to="/login">Login</Link>
      </Box>
    )
  }
}

export default Header;