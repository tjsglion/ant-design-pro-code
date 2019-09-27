import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import styles from './UserLayout.less';

export default class UserLayout extends Component {

  static childContextTypes = {
    routes: PropTypes.array,
    params: PropTypes.object
  }

  getChildContext () {
    const { routes, params } = this.props;
    return { routes, params };
  }

  // 获取页面标题
  getPageTitle () {
    const { routes } = this.props;
    for (let i = 0, len = routes.length; i < len; i++) {
      if (routes[i].breadcrumbName) {
        return `${routes[i].breadcrumbName} - Ant Design Pro`;
      }
    }
    return 'Ant Design Pro';
  }

  render () {
    const { children } = this.props;
    return (
      <DocumentTitle title={ this.getPageTitle() }>
        <div className={styles.container}>
          { children }
        </div>
      </DocumentTitle>
    );
  }
}
