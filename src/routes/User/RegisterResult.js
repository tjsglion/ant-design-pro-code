import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';

class RegisterResult extends Component {

  state = {
    count: 0,
    type: 'account'
  }

  render () {
    return (
      <h2>用户注册结果页面</h2>
    )
  }
}

export default connect(state => ({
  login: state.registerResult
}))(RegisterResult);
