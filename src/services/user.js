import request from '../utils/request';

export async function query () {
  return request('/api/users');
}

export async function queryCurrentUser () {
  console.log('services=====>>>>>>');
  return request('/api/currentUser');
}
