import axios from 'axios';
// 登录相关接口
// 登陆验证
export const login = (params) => axios.post(`${axios.AUTH_BASE_API}/oauth/token`, params, {
  transformRequest: [function (data) {
    let params = '';
    for (const key in data) {
      params += `${key}=${data[key]}&`;
    }
    return params.substr(0, params.length - 1);
  }],
}).then((res) => res);
// 获取Token
export const getToken = (usreId, code) => axios.get(`${axios.AUTH_BASE_API}/checkOauth/${usreId}/${code}`).then((res) => res);
// 获取用户信息
export const getUserInfo = (params) => axios.get(`${axios.MANAGE_BASE_API}/sysSystemType/find?id=${params}`).then((res) => res);
// 根据用户id获取密码修改提示
export const getPassWordInfoPoint = (params) => axios.get(`${axios.MANAGE_BASE_API}/passWordInfoPoint/getPoint?userId=${params}`).then((res) => res);
// 获取用户功能模块
export const getUserApplys = (params) => axios.get(`${axios.MANAGE_BASE_API}/sysUsers/userApplys?id=${params}`).then((res) => res);
// 获取菜单
export const sysUsersfindUserRes = (params) => axios.post(`${axios.MANAGE_BASE_API}/sysUsers/findUserResTree`, params).then((res) => res);
// 修改密码
export const sysUsersupdateUserPassword = (params) => axios.post(`${axios.MANAGE_BASE_API}/sysUsers/updateUserPassword`, params).then((res) => res);
// 获取菜单(后台)
export const getMenus = (params) => axios.post(`${axios.MANAGE_BASE_API}/sysUsers/findUserResTree`, params).then((res) => res);
