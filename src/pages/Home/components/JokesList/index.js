import React, { Component } from 'react';
import styled from "styled-components";
import { InfiniteScroll, Box } from 'grommet';

import JokeItem from '../JokeItem';

const Container = styled.div`
  padding: 0 2rem;
  margin-bottom: 2rem;
`;

const JokeItemWrapper = styled.div`
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

class JokesList extends Component {
  render() {
    const posts = this.props.posts;
    return (
      <Box pad={{horizontal: '1rem'}}>
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
    console.log('more')
    const startIndex = this.props.posts.length;
    this.props.loadMorePosts(startIndex);
  }
}

export default JokesList;
