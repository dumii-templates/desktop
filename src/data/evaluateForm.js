export default [
  {
    type: 'editor',
    key: '项目过程记录',
    value: ''
  },
  {
    type: 'title',
    title: '项目完工情况'
  },
  {
    type: 'line',
    items: [
      {
        key: '上线时间', component: 'time', value: ''
      },
      {
        key: '完工时间', component: 'time', value: ''
      }]
  },
  {
    type: 'line',
    items: [
      {
        key: '客户经理（50分）', component: 'number', value: 0
      },
      {
        key: '技术总监（25分）', component: 'number', value: 0
      }
    ]
  },
  {
    type: 'line',
    items: [
      {
        key: '综合评价（25分）', component: 'number', value: 0
      },
      {
        key: '项目最终评分', component: 'number', value: 0
      }
    ]
  },
  {
    type: 'title',
    title: '项目积分情况'
  },
  {
    type: 'line',
    items: [
      {
        key: '立项项目积分', component: 'number', value: 0
      },
      {
        key: '最终项目积分', component: 'number', value: 0
      }
    ]
  }
]
