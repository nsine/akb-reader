import React, { Component } from 'react';
import styled from 'styled-components';
import { InfiniteScroll, Box } from 'grommet';
import PropTypes from 'prop-types';

import JokeItem from './JokeItem';

const JokeItemWrapper = styled.div`
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

class JokesList extends Component {
  static propTypes = {
    posts: PropTypes.array,
    loadMorePosts: PropTypes.func,
  }

  render() {
    const posts = this.props.posts;
    return (
      <Box pad={{horizontal: '1rem'}} style={{maxWidth: '700px',
        margin: '0 auto'}}>
        <InfiniteScroll step={5} items={posts} onMore={this.loadMorePosts}>
          {item => (
            <JokeItemWrapper key={item.id}>
              <JokeItem post={item}></JokeItem>
            </JokeItemWrapper>
          )}
        </InfiniteScroll>
      </Box>
    );
  }

  loadMorePosts = () => {
    const startIndex = this.props.posts.length;
    this.props.loadMorePosts(startIndex);
  }
}

export default JokesList;
