import axios from 'axios';
import Storage from '@/plugins/storage';
import store from '@/store';
import { Message } from 'view-design';

axios.AUTH_BASE_API = '/sso/auth';

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

const toLogin = () => {
  window.location.href = process.env.VUE_APP_LOGION_URL;
};

// 请求超时时间
// axios.defaults.timeout = 10000;

// 设置全局的请求次数，请求的间隙
axios.defaults.retry = 3;
axios.defaults.retryDelay = 1000;
// http request 拦截器
axios.interceptors.request.use(
  (config) => {
    const token = Storage.get('token');
    if (!token && config.url.indexOf('/owath.token') === -1) {
      toLogin();
      Promise.reject('token不存在');
      setTimeout(() => {
        store.dispatch('SetLoading', 0);
      }, 300);
    }
    store.dispatch('SetLoading', true);
    if (token) config.headers.Authorization = token;
    config.headers['Cache-Control'] = 'no-cache';
    config.headers.Pragma = 'no-cache';
    return config;
  },
  (err) => {
    console.log(err);
    setTimeout(() => {
      store.dispatch('SetLoading', 0);
    }, 300);
    return Promise.reject(err);
  },
);

// http response 拦截器
axios.interceptors.response.use((response) => {
  store.dispatch('SetLoading', false);
  // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
  // 否则的话抛出错误
  if (response.status === 200) {
    if (response.data.code === 401 || response.data.code === 501) {
      tipError(response.data.message || response.data.msg);
      toLogin();
    } else {
      return Promise.resolve(response.data);
    }
  } else {
    return Promise.reject(response);
  }
}, (err) => {
  store.dispatch('SetLoading', false);
  if (err && err.response) {
    // err.message = err.response.status+' '+err.response.data.message
    switch (err.response.status) {
      case 400:
        err.message = err.response.data.error_description || '请求错误(400)';
        break;
      case 401:
        err.message = err.response.data.error_description;
        Storage.removeAll();
        toLogin();
        break;
      case 403:
        err.message = '拒绝访问(403)';
        break;
      case 404:
        err.message = '请求出错(404)';
        break;
      case 408:
        err.message = '请求超时(408)';
        break;
      case 500:
        err.message = '服务器错误(500)';
        break;
      case 501:
        err.message = '服务未实现(501)';
        break;
      case 502:
        err.message = '网络错误(502)';
        break;
      case 503:
        err.message = '服务不可用(503)';
        break;
      case 504:
        err.message = '网络超时(504)';
        break;
      case 505:
        err.message = 'HTTP版本不受支持(505)';
        break;
      default:
        err.message = `连接出错(${err.response.status})!`;
    }
  } else if (!window.navigator.onLine) {
    err.message = '断网了，请检查您的网络连接';
  }
  Message.error(err.message);
  return Promise.reject(err);
});
