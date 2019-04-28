import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, Button } from 'grommet';
import { Like } from 'grommet-icons';

import { likeJoke } from '../../../actions/jokesActions';

const Wrapper = styled.div`
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);

  &:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
`;

class JokeItem extends Component {
  static propTypes = {
    post: PropTypes.shape({
      _id: PropTypes.string,
      text: PropTypes.string,
      date: PropTypes.string,
      likes: PropTypes.arrayOf(PropTypes.string),
    }),

    likeJoke: PropTypes.func,
    isLoggedIn: PropTypes.bool,
    userId: PropTypes.string,
  }

  handleLikeClick = () => {
    this.props.likeJoke(this.props.post._id);
  }

  isLikedByMe = () => {
    const likes = this.props.post.likes;
    const myId = this.props.userId;
    return likes.some(userId => userId === myId);
  }

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
        <div style={{cursor: 'pointer'}}>
          {
            (this.props.isLoggedIn) && (
              <div onClick={this.handleLikeClick}>
                <Like color={this.isLikedByMe() ? 'purple' : ''}/>
              </div>
            )
          }
        </div>
      </Wrapper>
    );
  }

  getFormattedDate(ms) {
    const date = moment.unix(ms);
    return date.format('lll');
  }
}

export default connect(state => ({
  isLoggedIn: state.user.isLoggedIn,
  userId: state.user.id,
}), {
  likeJoke,
})(JokeItem);
