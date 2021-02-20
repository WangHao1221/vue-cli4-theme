import Storage from '@/plugins/storage';

export const findNodeUpperByClasses = (ele, classes) => { // 判断元素是否包含某个class名
  const { parentNode } = ele;
  if (parentNode) {
    const { classList } = parentNode;
    if (classList && classes.every((className) => classList.contains(className))) {
      return parentNode;
    }
    return findNodeUpperByClasses(parentNode, classes);
  }
};

/**
 * @param {*} obj1 对象
 * @param {*} obj2 对象
 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
 */
export const objEqual = (obj1, obj2) => {
  const keysArr1 = Object.keys(obj1);
  const keysArr2 = Object.keys(obj2);
  if (keysArr1.length !== keysArr2.length) return false;
  if (keysArr1.length === 0 && keysArr2.length === 0) return true;
  /* eslint-disable-next-line */
    else return !keysArr1.some(key => obj1[key] != obj2[key])
};

/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
export const routeEqual = (route1, route2) => {
  const params1 = route1.params || {};
  const params2 = route2.params || {};
  const query1 = route1.query || {};
  const query2 = route2.query || {};
  return (route1.name === route2.name) && objEqual(params1, params2) && objEqual(query1, query2);
};

/**
 * @description 本地存储和获取标签导航列表
 */
export const setTagNavListInLocalstorage = (list) => {
  Storage.set('tagNaveList', JSON.stringify(list));
};
