export const menuList = () =>{
  return [//侧边栏菜单列表
    {
      id: '1',
      name: '模板管理',
      parentCode: '-1',
      icon: '',
      code: '1',
      path: 'template',
      depth: 0,
      haveChild: 1,
      resChile: [
        {
          id: '1-1',
          parentCode: '1',
          name: '模板管理',
          icon: '',
          path: 'templateManage',
        }
      ]
    },
    {
      id: '2',
      name: '文档管理',
      parentCode: '-1',
      icon: '',
      code: '2',
      path: 'doc',
      depth: 0,
      haveChild: 1,
      resChile: [
        {
          id: '2-1',
          parentCode: '2',
          name: '文档管理',
          icon: '',
          path: 'docManage',
        }
      ]
    }
  ]
}
