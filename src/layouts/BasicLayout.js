import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon, Avatar, Dropdown, Tag, message } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import HeaderSearch from '../components/HeaderSearch';
import { getNavData } from '../common/nav';
import styles from './BasicLayout.less';
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
class BasicLayout extends Component {

  static childContextTypes = {
    routes: PropTypes.array,
    params: PropTypes.object
  };

  constructor (props) {
    super(props);
    this.menus = getNavData().reduce((arr, current) => arr.concat(current.children), []);
    console.log('菜单项==========', this.menus);
  }

  state = {
    mode: 'inline'
  };

  getChildContext () {
    const { routes, params } = this.props;
    return { routes, params };
  }

  componentDidMount () {
    // 获取当前用户信息
    this.props.dispatch({
      type: 'user/fetchCurrentUser'
    })
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

  // 点击头像菜单
  onMenuClick ({ key }) {
    if (key === 'logout') {
      this.props.dispatch(routerRedux.push('/user/login'));
    }
  }

  // 侧边栏菜单
  getNavMenuItems (menus, parentPath = '') {
    if (!menus) return [];
    return menus.map(item => {
      if (!item.name) return;
      const itemPath = `${parentPath}/${item.path || ''}`.replace(/\/+g/, '/');
      if (item.children && item.children.some(child => child.name)) {
        return (
          <SubMenu
            title={
              item.icon ? (<span>
                <Icon type={item.icon} />
                <span>{item.name}</span>
              </span>) : item.name
            }
            key={item.key || item.path}
          >
            { this.getNavMenuItems(item.children, itemPath) }
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.key || item.path}>
          <Link to={itemPath}>
            { item.icon && <Icon type={item.icon} /> }
            <span>{item.name}</span>
          </Link>
        </Menu.Item>
      );
    });
  }

  //
  getDefaultSubMenu = () => {
    const currentSelectedKeys = [...this.getCurrentSelectedKeys()];
    currentSelectedKeys.splice(-1, 1);
    return currentSelectedKeys;
  }

  //
  getCurrentSelectedKeys = () => {
    const { location: { pathname } } = this.props;
    const keys = pathname.split('/').slice(1);
    if (keys.length === 1 && keys[0] === '') {
      return [this.menus[0].key];
    }
    return keys;
  }

  render () {
    const { currentUser, children } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick.bind(this)}>
        <Menu.Item><Icon type="user" />个人中心</Menu.Item>
        <Menu.Item><Icon type="setting" />设置</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout"><Icon type="logout" />退出</Menu.Item>
      </Menu>
    );
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <Layout>
          <Sider
            trigger={null}
            style={{ minHeight: '100vh'}}
            width={272}
          >
            <div className={styles.logo}>
              <Link to="/">
                <h1>Ant Design Pro</h1>
              </Link>
            </div>
            <Menu
              theme="dark"
              mode="inline"
              defaultOpenKeys={this.getDefaultSubMenu()}
              selectedKeys={this.getCurrentSelectedKeys()}
              style={{ margin: '24px 0', width: '100%' }}
            >
              { this.getNavMenuItems(this.menus) }
            </Menu>
          </Sider>
          <Layout>
            <Header className={styles.header}>
              <div className={styles.right}>
                <HeaderSearch
                  className={`${styles.action} ${styles.search}`}
                  placeholder="站内搜索"
                  dataSource={['提示一', '提示二', '提示三']}
                  onSearch={(value) => {
                    console.log('input: ', value);
                  }}
                  onPressEnter={(value) => {
                    console.log('enter: ', value);
                  }}
                >
                </HeaderSearch>
                <Dropdown overlay={menu}>
                  <span className={`${styles.action} ${styles.account}`}>
                    <Avatar size="small" className={styles.avatar} src={currentUser.avatar} />
                    { currentUser.name }
                  </span>
                </Dropdown>
              </div>
            </Header>
            <Content className={{ margin: '24px', height: '100%' }}>
              { children }
            </Content>
          </Layout>
        </Layout>
      </DocumentTitle>
    );
  }
}

export default connect(state => ({
   // 获取Store中的当前用户信息
  currentUser: state.user.currentUser,
}))(BasicLayout);
