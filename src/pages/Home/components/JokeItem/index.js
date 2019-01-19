import React, { Component } from 'react';
import styled from "styled-components";
import moment from 'moment';

import { Text } from 'grommet';

const Wrapper = styled.div`
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);

  &:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
`;

class JokeItem extends Component {
  render() {
    const post = this.props.post;

    return (
      <Wrapper>
        <Text>
          {post.text}
        </Text>
        <Text>
          {this.getFormattedDate(post.date)}
        </Text>
      </Wrapper>
    );
  }

  getFormattedDate(ms) {
    const date = moment.unix(ms);
    return date.format('lll');
  }
}

export default JokeItem;