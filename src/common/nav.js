import BasicLayout from '../layouts/BasicLayout';
import UserLayout from '../layouts/UserLayout';

import Login from '../routes/User/Login';
import Register from '../routes/User/Register';
import RegisterResult from '../routes/User/RegisterResult';
import Exception404 from '../routes/Exception/404';
import Exception500 from '../routes/Exception/500';
import Analysis from '../routes/Dashhoard/Analysis';

// 递归 user 数组， 直接打开新的页面
function userAdapter (userData) {
  userData.children.forEach(item => {
    if (item.children) userAdapter(item);
    else {
      const userItem = item;
      userItem.noRoute = true;
    }
  });
  return userData;
}

export const user = [
  {
    name: '账户',
    icon: 'setting',
    path: 'user',
    children: [
      {
        name: '登录',
        path: 'login',
        component: Login,
        icon: 'setting'
      },
      {
        name: '注册',
        path: 'register',
        component: Register,
        icon: 'setting'
      },
      {
        name: '注册结果',
        path: 'register-result',
        component: RegisterResult,
        icon: 'setting'
      }
    ]
  }
];

export const menus = [
  {
    name: 'Dashboard',
    icon: 'setting',
    path: 'dashboard',
    children: [
      {
        name: '分析页',
        path: 'analysis',
        icon: 'setting',
        component: Analysis
      }
    ]
  }, {
    name: '错误',
    path: 'error',
    icon: 'setting',
    children: [
      {
        name: '404',
        path: '404',
        component: Exception404,
        icon: 'setting'
      }, {
        name: '500',
        path: '500',
        component: Exception500,
        icon: 'setting'
      }
    ]
  }, userAdapter(JSON.parse(JSON.stringify(user[0])))
];

export default [
  {
    component: BasicLayout,
    name: '首页',
    children: menus,
    path: ''
  },
  {
    component: UserLayout,
    name: '账户',
    children: user
  }
]
