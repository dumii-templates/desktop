import controlForm from '@/data/controlForm'
import memberForm from '@/data/memberForm'
import evaluateForm from '@/data/evaluateForm'
import feeForm from '@/data/feeForm'

export default [
  {
    id: 1,
    name: '项目管控表',
    info: '这是备注这是备注这是备注这是备注这是备注这是备注这是备注',
    rows: controlForm
  },
  {
    id: 2,
    name: '项目组成员表',
    info: '这是备注这是备注这是备注这是备注这是备注这是备注这是备注',
    rows: memberForm
  },
  {
    id: 3,
    name: '项目评价表',
    info: '这是备注这是备注这是备注这是备注这是备注这是备注这是备注',
    rows: evaluateForm
  },
  {
    id: 4,
    name: '项目费用表',
    info: '这是备注这是备注这是备注这是备注这是备注这是备注这是备注',
    rows: feeForm
  },
]
