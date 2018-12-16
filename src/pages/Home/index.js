import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../../actions';
import JokesList from './components/JokesList';

class HomePage extends Component {
  state = {  }

  componentWillMount() {
    this.props.loadPosts();
  }

  render() {
    return (
      <div>
        <div>HomePage</div>
        <Link to='/joke/1'>Go to joke</Link>
        <Link to='/login'>Go to login</Link>

        <div style={{marginTop: '30px'}}>
          <JokesList posts={this.props.posts}></JokesList>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
});

const mapDispatchToProps = {
  loadPosts: actions.loadPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);