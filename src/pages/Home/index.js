import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../../actions/jokesActions';
import JokesList from './components/JokesList';

class HomePage extends Component {
  state = {
    itemsPerPage: 10,
  }

  componentWillMount() {
    this.props.loadPosts(0, this.state.itemsPerPage);
  }

  render() {
    return (
      <div>
        <Link to='/joke/1'>Go to joke</Link>
        <Link to='/login'>Go to login</Link>

        <div style={{marginTop: '30px'}}>
          <JokesList posts={this.props.posts} loadMorePosts={this.loadMorePosts}></JokesList>
        </div>
      </div>
    );
  }

  loadMorePosts = (start) => {
    this.props.loadPosts(start, this.state.itemsPerPage);
  }
}

const mapStateToProps = state => ({
  posts: state.jokes.posts,
});

const mapDispatchToProps = {
  loadPosts: actions.loadPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);