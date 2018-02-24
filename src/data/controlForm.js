export default [
  {
    title: '项目基本情况',
    type: 'title'
  },
  {
    items: [
      { key: '项目名称', component: 'input', value: '' },
      { key: '项目编号', component: 'input', value: '' }
    ],
    type: 'line'
  },
  {
    items: [
      { key: '客户经理', component: 'input', value: '' },
      { key: '项目客户', component: 'input', value: '' }
    ],
    type: 'line'
  },
  {
    items: [
      { key: '开工日期', component: 'time', value: '' },
      { key: '上线日期', component: 'time', value: '' }
    ],
    type: 'line'
  },
  {
    key: '项目主要内容',
    type: 'textarea',
    value: ''
  },
  {
    title: '项目积分管控',
    type: 'title'
  },
  {
    items: [
      { key: '项目类型', component: 'input', value: '' },
      { key: '项目积分', component: 'number', value: 0 }
    ],
    type: 'line'
  },
  {
    items: [
      { key: '指派项目组', component: 'input', value: '' },
      { key: '上线日期', component: 'time', value: '' }
    ],
    type: 'line'
  },
  {
    key: '项目备注',
    type: 'textarea',
    value: ''
  }
]
