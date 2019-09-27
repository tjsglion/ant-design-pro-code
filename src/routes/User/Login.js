import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';

class Login extends Component {

  state = {
    count: 0,
    type: 'account'
  }

  render () {
    return (
      <h2>用户登录页</h2>
    )
  }
}

export default connect(state => ({
  login: state.login
}))(Login);
