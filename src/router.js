import React from 'react';
import { Router, Route, Redirect } from 'dva/router';
import navData from './common/nav';
/**
 * navData: [
 *  { name: '首页', component: BasicLayout, children: [
 *      { name: 'Dashboard', children: [
 *          name: '分析页'
 *      ]}
 *  ]},
 *  { name: '账户', component: UserLayout, children: [] }
 * ]
 **/
 /**
  *
  * @param {Array} data 路由数据
  * @param {number} level 树的层级
  */
function getRoutes (data, level = 0) {
  return data.map((item, i) => {
    let children;
    if (item.children) children = getRoutes(item.children, level + 1);
    let homePageRedirect;
    if (level === 1 && i === 0) {
      let indexPath;
      if (item.children && item.children[0]) {
        indexPath = `/${item.path}/${item.children[0].path}`;
      } else {
        indexPath = item.path;
      }
      homePageRedirect = <Redirect from="/" to={indexPath} />
    }
    if (item.noRoute) return null;
    return (
      <Route
        key={item.key || item.path || ''}
        path={item.path}
        breadcrumbName={item.name}
        component={item.component}
      >
        { homePageRedirect }
        { children }
      </Route>
    );
  });
}

function RouterConfig ({history}) {
  return (
    <Router history={history}>
      { getRoutes(navData) }
    </Router>
  )
}

export default RouterConfig;
