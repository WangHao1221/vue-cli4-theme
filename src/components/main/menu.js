// eslint-disable-next-line import/prefer-default-export
export const getMenuList = () => [{
  id: '1',
  name: '模板系统管理',
  parentCode: '-1',
  icon: '',
  code: '1',
  path: 'template',
  depth: 0,
  haveChild: 1,
  resChile: [{
    id: '1-1',
    parentCode: '1',
    name: '模板管理',
    icon: '',
    path: 'templateManage',
  }, {
    id: '1-2',
    parentCode: '1',
    name: '文档管理',
    icon: '',
    path: 'docManage',
  }],
}];
