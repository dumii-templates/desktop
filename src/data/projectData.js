export default {
  'base': {
    'proNum': '201701',
    'proName': '仪器共享一期',
    'proMan': '周张帆',
    'cusMan': '罗成虎',
    'proCus': '优科服',
    'proMem': '王洋、王叶东'
  },
  'forms': [
    {
      'name': '项目管控表',
      'form': [
        { 'title': '项目基本情况', 'type': 'title' },
        { 'items': [{ 'key': '项目名称', 'component': 'input', 'value': '仪器共享一期' }, { 'key': '项目编号', 'component': 'input', 'value': '201701' }], 'type': 'line' },
        { 'items': [{ 'key': '客户经理', 'component': 'input', 'value': '罗成虎' }, { 'key': '项目客户', 'component': 'input', 'value': '优科服' }], 'type': 'line' },
        { 'items': [{ 'key': '开工日期', 'component': 'time', 'value': '2017-08-31T16:00:00.000Z' }, { 'key': '上线日期', 'component': 'time', 'value': '2018-01-19T16:00:00.000Z' }], 'type': 'line' },
        { 'key': '项目主要内容', 'type': 'textarea', 'value': '仪器共享、仪器金融、仪器研发、仪器首发、报告溯源、课程培训' },
        { 'title': '项目积分管控', 'type': 'title' },
        { 'items': [{ 'key': '项目类型', 'component': 'input', 'value': '重要新建' }, { 'key': '项目积分', 'component': 'number', 'value': 200 }], 'type': 'line' },
        { 'items': [{ 'key': '指派项目组', 'component': 'input', 'value': '周张帆' }, { 'key': '上线日期', 'component': 'time', 'value': '2018-01-19T16:00:00.000Z' }], 'type': 'line' },
        { 'key': '项目备注', 'type': 'textarea', 'value': '2017.10.30前客户支付第二笔项目款' }
      ],
      'open': false
    },
    {
      'name': '项目组成员表',
      'form': [
        { 'type': 'title', 'title': '项目组成员' },
        {
          'type': 'table',
          'columns': [{ 'name': '成员姓名' }, { 'name': '项目角色' }, { 'name': '分配计划' }, { 'name': '备注' }],
          'data': [
            ['周张帆', '项目经理', '65%', '原40%+蒋焰25%'],
            ['罗成虎', '客户经理', '5%', ''],
            ['王洋', '辅助开发', '15%', ''],
            ['王叶东', '后端开发', '15%', '蒋焰15%']
          ]
        }
      ],
      'open': false
    },
    {
      'name': '项目评价表',
      'form': [
        { 'type': 'editor', 'key': '项目过程记录', 'value': '<p>2017.08.21 签订项目合同</p><p>2017.10.09 设计验收会议</p><p>2017.10.17 第一次需求会议</p><p>2017.10.31 第二次需求会议</p><p>2017.12.07 第一次验收会议</p><p>2017.12.20 第二次验收会议</p><p>2018.01.05 上线测试</p><p>2018.01.20 开发完工，进入维护期</p>' },
        { 'type': 'title', 'title': '项目完工情况' },
        { 'type': 'line', 'items': [{ 'key': '上线时间', 'component': 'time', 'value': '2018-01-19T16:00:00.000Z' }, { 'key': '完工时间', 'component': 'time', 'value': '2018-01-20T16:00:00.000Z' }] },
        { 'type': 'line', 'items': [{ 'key': '客户经理（50分）', 'component': 'number', 'value': 50 }, { 'key': '技术总监（25分）', 'component': 'number', 'value': 25 }] },
        { 'type': 'line', 'items': [{ 'key': '综合评价（25分）', 'component': 'number', 'value': 25 }, { 'key': '项目最终评分', 'component': 'number', 'value': 0 }] },
        { 'type': 'title', 'title': '项目积分情况' },
        { 'type': 'line', 'items': [{ 'key': '立项项目积分', 'component': 'number', 'value': 200 }, { 'key': '最终项目积分', 'component': 'number', 'value': 200 }] }
      ],
      'open': false
    },
    {
      'name': '项目费用表',
      'form': [
        { 'type': 'title', 'title': '项目费用' },
        { 'type': 'table', 'columns': [{ 'name': '费用名称' }, { 'name': '费用金额' }, { 'name': '备注' }, { 'name': '上报人' }, { 'name': '上报时间' }], 'data': [['', '', '', '', '']] }
      ],
      'open': false
    }
  ],
  'timesheet': {
    'open': false,
    'data': {
      'months': ['2018-01', '2018-02', '2018-03'],
      'peroids': [{ 'id': 1, 'name': '设计' }, { 'id': 2, 'name': '开发' }, { 'id': 3, 'name': '测试' }, { 'id': 4, 'name': '部署' }],
      'modules': [{ 'id': 1, 'peroid': 1, 'name': '第一模块' }],
      'tasks': [{ 'color': '#F9E31C', 'date': ['2018-01-26T16:00:00.000Z', '2018-02-17T16:00:00.000Z'], 'days': 22, 'end': '2018/02/18', 'id': 1, 'module': 1, 'name': '示例任务', 'offsetDays': 0, 'peroid': 1, 'start': '2018/01/27' }, { 'color': '#2D8CF0', 'date': ['2018-01-26T16:00:00.000Z', '2018-02-17T16:00:00.000Z'], 'days': 22, 'end': '2018/02/18', 'id': 2, 'module': 1, 'name': '示例任务', 'offsetDays': 10, 'peroid': 1, 'start': '2018/01/27' }, { 'color': '#EA1A1A', 'date': ['2018-01-26T16:00:00.000Z', '2018-02-17T16:00:00.000Z'], 'days': 22, 'end': '2018/02/18', 'id': 3, 'module': 1, 'name': '示例任务', 'offsetDays': 20, 'peroid': 1, 'start': '2018/01/27' }, { 'color': '#19C919', 'date': ['2018-01-26T16:00:00.000Z', '2018-02-17T16:00:00.000Z'], 'days': 22, 'end': '2018/02/18', 'id': 4, 'module': 1, 'name': '示例任务', 'offsetDays': 30, 'peroid': 1, 'start': '2018/01/27' }]
    }
  }
}
