import request from '../utils/request';

export function login(username: string, password: string) {
  return request({
    url: '/Login/login',
    method: 'post',
    data: {
      username,
      password,
    },
  });
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'get',
  });
}
