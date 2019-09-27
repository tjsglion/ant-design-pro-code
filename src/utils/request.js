import fetch from 'dva/fetch';

function checkStatus (res) {
  // 状态[200, 300): 成功
  if (res.status >= 200 && res.status < 300) {
    return res;
  }
  // 请求失败
  const error = new Error(res.statusText);
  error.response = res;
  throw error;
}

/**
 * @description 统一处理请求
 * @param {string} url 请求url
 * @param {object} options 请求参数
 * @returns {object}  返回 Promise对象
 */
export default function request (url, options) {
  // 默认配置参数
  const defaultOptions = {
    credentials: 'include'
  };
  const newOptions = {...defaultOptions, ...options};
  if (['POST', 'PUT'].includes(newOptions.method)) {
    // 配置请求头
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers
    };
    // 请求body, 转换成Json形式字符串
    newOptions.body = JSON.stringify(newOptions.body);
  }
  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => response.json())
    .catch(err => ({ err }));
}
