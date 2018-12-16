import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';

class TestComponent extends Component {
  state = {  }

  componentWillMount() {
    this.props.updateTestValue();
  }

  render() {
    return (
      <div>
        {this.getFormattedDate(this.props.testValue)}
      </div>
    );
  }

  getFormattedDate(date) {
    return date && date.toLocaleTimeString();
  }
}

const mapStateToProps = state => ({
  testValue: state.test.testValue,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateTestValue: () => {
    dispatch(actions.updateTestValue());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TestComponent);