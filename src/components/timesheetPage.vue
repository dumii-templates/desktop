<template>
  <div class="timesheet_page">
    <div class="timesheet_head">
      <div>
        <DatePicker type="month" v-model="timesheet.startTime" @on-change="changeStart" placeholder="开始月份" style="width: 200px"></DatePicker>
        <DatePicker type="month" v-model="timesheet.endTime" @on-change="changeEnd" placeholder="结束月份" style="width: 200px"></DatePicker>
        <Button type="primary" @click="confirmMonth">显示月份</Button>
      </div>
      <div>
        <Button type="primary" @click="showPanel = !showPanel">{{showPanel ? '隐藏' : '显示'}}编辑界面</Button>
        <Button type="primary" @click="Save">完成</Button>
      </div>
    </div>
    <div class="timesheet" @drop="e => DropBody(e)" @dragover="e => { e.preventDefault()}">
      <div class="scale">
        <div class="module">
          <div class="module_list">
            <div class="module_head">阶段</div>
          </div>
          <div class="module_list">
            <div class="module_head">模块</div>
          </div>
          <div class="module_list">
            <div class="module_head">任务</div>
          </div>
        </div>
        <div class="month_list">
          <div class="month" v-for="month in months" :key="month">
            <div class="month_head">{{month}}</div>
            <div class="week_list" style="height: calc(100% - 21px);">
              <div class="week"></div>
              <div class="week"></div>
              <div class="week"></div>
              <div class="week"></div>
            </div>
          </div>
        </div>
        <div class="actions">
          <div class="actions_head">操作</div>
        </div>
      </div>
      <div class="data">
        <div class="data_head" @drop="e => DropHead(e)" @dragover="e => { e.preventDefault()}"></div>
        <div class="task" draggable="true" @dragstart="e => DragStart(e, index)" @dragover="e => DragOver(e, index)" @drop="e => Drop(e)" v-for="(task, index) in tasks" :key="index">
          <div class="head">
            <div class="peroid_name">{{peroidName(task.peroid)}}</div>
            <div class="module_name">{{moduleName(task.module)}}</div>
            <div class="task_name">{{task.name}}</div>
          </div>
          <div class="body">
            <div
              class="strip"
              :style="{
                backgroundColor: task.color,
                width: (task.days * dayWidth).toFixed(2) + 'px',
                marginLeft: (task.offsetDays * dayWidth).toFixed(2) + 'px'
              }">
            </div>
            <div class="info">
              <div class="date">{{task.start}}-{{task.end}}</div>
              <!-- <div class="name">任务名称</div> -->
            </div>
          </div>
          <div v-if="showPanel" class="actions">
            <div class="btn" @click="showEditTask(task.id)">
              <Icon :size="5" type="edit"></Icon>
            </div>
            <Poptip confirm title="您确定要删除这项任务吗?" transfer @on-ok="deleteTask(index)">
              <div class="btn">
                <Icon :size="5" type="close-round"></Icon>
              </div>
            </Poptip>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showPanel" class="panel">
      <div class="panel_item">
        <canEditTable refs="peroidsTable" class="table" size="small" v-model="peroids" :deleteFunc="(index) => {deletePeroid(index)}" :columnsList="peroidsColumns" @on-delete="deletePeroid"></canEditTable>
        <div class="table_foot" @click="addPeroid">添加阶段</div>
      </div>
      <div class="panel_item">
        <canEditTable refs="modulesTable" class="table" size="small" v-model="modules" :deleteFunc="(index) => {deleteModule(index)}" :columnsList="modulesColumns" style="width: 452px"></canEditTable>
        <div class="table_foot" @click="addModule">添加模块</div>
      </div>
      <div class="form">
        <div class="form_head">新建任务</div>
        <Form class="form_body" :label-width="40" label-position="right">
          <FormItem class="form_item" label="任务">
            <Input v-model="addForm.name" />
          </FormItem>
          <FormItem class="form_item" label="模块">
            <Select v-model="addForm.module">
              <Option v-for="option in modulesOptions" :key="`${option.id}_${option.name}`" :value="option.id" :label="option.name"></Option>
            </Select>
          </FormItem>
          <FormItem class="form_item" label="时间">
            <DatePicker type="daterange" placement="top-end" style="width: 100%" v-model="addForm.date"></DatePicker>
          </FormItem>
          <FormItem class="form_item" label="颜色">
            <ColorPicker v-model="addForm.color" recommend />
          </FormItem>
        </Form>
        <div v-if="monthDone" class="form_foot" @click="addTask">添加任务</div>
        <div v-else class="form_foot">请先选择显示月份</div>
      </div>
    </div>
    <Modal v-model="showEdit" title="任务编辑" @on-ok="editTask">
      <Form class="edit_form" :label-width="40" label-position="right">
        <FormItem class="form_item" label="任务">
          <Input v-model="editForm.name" />
        </FormItem>
        <FormItem class="form_item" label="模块">
          <Select v-model="editForm.module">
            <Option v-for="option in modules" :key="option.id" :value="option.id">{{option.name}}</Option>
          </Select>
        </FormItem>
        <FormItem class="form_item" label="时间">
          <DatePicker type="daterange" placement="bottom-start" style="width: 100%" v-model="editForm.date"></DatePicker>
        </FormItem>
        <FormItem class="form_item" label="颜色">
          <ColorPicker v-model="editForm.color" recommend />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import canEditTable from '@/components/canEditTable'
export default {
  components: { canEditTable },
  data () {
    return {
      showPanel: true,
      timesheet: {
        startTime: '2018-01',
        endTime: '2018-03',
      },
      startTime: '2018-01',
      endTime: '2018-03',
      monthDone: true,
      monthNum: 3,
      months: ['2018-01', '2018-02', '2018-03'],
      // monthDone: false,
      // monthNum: 0,
      // months: ['请选择月份'],
      peroids: [
        { id: 1, name: '设计' },
        { id: 2, name: '开发' },
        { id: 3, name: '测试' },
        { id: 4, name: '部署' },
      ],
      peroidsColumns: [
        {
          width: 200,
          align: 'center',
          key: 'name',
          title: '阶段',
          editable: 'input'
        },
        {
          width: 200,
          align: 'center',
          key: 'handle',
          handle: ['edit', 'delete'],
          title: '操作'
        },
      ],
      modules: [{id: 1, peroid: 1, name: '第一模块'}],
      tasks: [
        {
          color: '#F9E31C',
          date: ['2018-01-26T16:00:00.000Z', '2018-02-17T16:00:00.000Z'],
          days: 22,
          end: '2018/02/18',
          id: 1,
          module: 1,
          name: '示例任务',
          offsetDays: 0,
          peroid: 1,
          start: '2018/01/27',
        },
        {
          color: '#2D8CF0',
          date: ['2018-01-26T16:00:00.000Z', '2018-02-17T16:00:00.000Z'],
          days: 22,
          end: '2018/02/18',
          id: 2,
          module: 1,
          name: '示例任务',
          offsetDays: 10,
          peroid: 1,
          start: '2018/01/27',
        },
        {
          color: '#EA1A1A',
          date: ['2018-01-26T16:00:00.000Z', '2018-02-17T16:00:00.000Z'],
          days: 22,
          end: '2018/02/18',
          id: 3,
          module: 1,
          name: '示例任务',
          offsetDays: 20,
          peroid: 1,
          start: '2018/01/27',
        },
        {
          color: '#19C919',
          date: ['2018-01-26T16:00:00.000Z', '2018-02-17T16:00:00.000Z'],
          days: 22,
          end: '2018/02/18',
          id: 4,
          module: 1,
          name: '示例任务',
          offsetDays: 30,
          peroid: 1,
          start: '2018/01/27',
        },
      ],
      addForm: {
        name: '',
        module: '',
        date: [],
        color: ''
      },
      showEdit: false,
      editForm: {
        id: '',
        name: '',
        module: '',
        date: [],
        color: ''
      },
      taskOnDrag: null,
      dragIndex: 0,
      draging: false,
    }
  },
  mounted () {
  },
  computed: {
    modulesColumns () {
      return [
        {
          width: 150,
          key: 'peroid',
          title: '所属阶段',
          align: 'center',
          editable: 'select',
          options: this.peroids
        },
        {
          width: 150,
          key: 'name',
          title: '模块',
          align: 'center',
          editable: 'input'
        },
        {
          width: 150,
          key: 'handle',
          handle: ['edit', 'delete'],
          title: '操作',
          align: 'center',
        },
      ]
    },
    modulesOptions () {
      return JSON.parse(JSON.stringify(this.modules))
    },
    monthWith () {
      return this.monthNum === 0 ? 0 : 960 / this.monthNum
    },
    dayWidth () {
      return this.monthWith / 30
    }
  },
  methods: {
    changeStart (time) {
      this.startTime = time
    },
    changeEnd (time) {
      this.endTime = time
    },
    confirmMonth () {
      let start = this.startTime.split('-')
      let end = this.endTime.split('-')
      let months = []
      this.monthNum = (parseInt(end[0]) - parseInt(start[0])) * 12 + parseInt(end[1]) - parseInt(start[1]) + 1
      if (this.monthNum > 12) {
        this.timesheet.startTime = ''
        this.timesheet.endTime = ''
        this.$Modal.error({
          title: '月数过大',
          content: '选择显示的月数过多，最多显示12个月'
        })
      } else {
        for (let m = 0; m < this.monthNum; m++) {
          let year = parseInt(start[0])
          let month = parseInt(start[1]) + m
          if (month > 12) {
            month -= 12
            year += 1
          }
          months.push(year + '-' + (month < 10 ? '0' + month : month))
        }
        this.months = months
      }
      this.monthDone = true
    },
    addPeroid () {
      let id = this.peroids.length === 0 ? 1 : this.peroids[this.peroids.length - 1].id + 1
      this.peroids.push({ id: id, name: '新建阶段' })
    },
    deletePeroid (index) {
      let modules = this.modules.filter((x) => {
        return x.peroid === this.peroids[index].id
      })
      if (modules.length === 0) {
        this.peroids.splice(index, 1)
      } else {
        this.$Modal.error({
          title: '删除失败',
          content: '该阶段下还有模块未删除！'
        })
      }
    },
    addModule () {
      let peroidId = this.peroids[0].id
      let id = this.modules.length === 0 ? 1 : this.modules[this.modules.length - 1].id + 1
      this.modules.push({ id: id, peroid: peroidId, name: '新建模块' })
    },
    deleteModule (index) {
      let tasks = this.tasks.filter((x) => {
        return x.module === this.modules[index].id
      })
      if (tasks.length === 0) {
        this.modules.splice(index, 1)
      } else {
        this.$Modal.error({
          title: '删除失败',
          content: '该模块下还有任务未删除！'
        })
      }
    },
    modalError (text) {
      setTimeout(() => {
        this.$Modal.error({ title: '操作失败', content: text })
      }, 300)
    },
    checkForm (form) {
      if (form.name === '') {
        this.modalError('任务不能为空')
        return false
      } else if (form.module === '') {
        this.modalError('模块不能为空')
        return false
      } else if (form.date === []) {
        this.modalError('时间不能为空')
        return false
      // } else if (form.end === '') {
      //   this.modalError('结束日期不能为空')
      //   return false
      } else if (form.color === '') {
        this.modalError('颜色不能为空')
        return false
      } else if (form.end - form.start < 0) {
        this.modalError('起止日期有误')
        return false
      } else {
        return true
      }
    },
    createTask (form) {
      let start = form.date[0]
      let end = form.date[1]
      let days = ((end).getTime() - (start).getTime()) / 86400000
      let offsetMonths = ((start).getFullYear() - parseInt(this.startTime.split('-')[0])) * 12 + (start).getMonth() - parseInt(this.startTime.split('-')[1]) + 1
      let offsetDays = offsetMonths * 30 + (start).getDate() - 1
      let task = JSON.parse(JSON.stringify(form))
      let peroidId = this.modules.find(x => {
        return x.id === task.module
      }).peroid
      task.start = this.$moment(start).format('YYYY/MM/DD')
      task.end = this.$moment(end).format('YYYY/MM/DD')
      task.days = days
      task.offsetDays = offsetDays
      task.peroid = peroidId
      return task
    },
    addTask () {
      if (this.checkForm(this.addForm)) {
        let id = this.tasks.length === 0 ? 1 : this.tasks[this.tasks.length - 1].id + 1
        let newTask = this.createTask(this.addForm)
        newTask.id = id
        this.tasks.push(newTask)
        this.addForm = {
          name: '',
          module: '',
          date: [],
          color: ''
        }
      }
    },
    showEditTask (id) {
      let task = this.tasks.find(x => {
        return x.id === id
      })
      this.editForm.id = id
      this.editForm.name = task.name
      this.editForm.module = task.module
      this.editForm.date = task.date
      this.editForm.color = task.color
      this.showEdit = true
    },
    editTask () {
      if (this.checkForm(this.editForm)) {
        let modifyTask = this.createTask(this.editForm)
        let index = this.tasks.findIndex(x => {
          return x.id === modifyTask.id
        })
        this.tasks.splice(index, 1, modifyTask)
        this.editForm = {
          id: '',
          name: '',
          module: '',
          date: [],
          color: ''
        }
      } else {
        setTimeout(() => {
          this.showEdit = true
        }, 300)
      }
    },
    deleteTask (index) {
      this.tasks.splice(index, 1)
    },
    peroidName (id) {
      return this.peroids.find(x => {
        return x.id === id
      }).name
    },
    moduleName (id) {
      return this.modules.find(x => {
        return x.id === id
      }).name
    },
    DropHead (e) {
      if (this.draging) {
        this.dragIndex = 0
        this.tasks.splice(this.dragIndex, 0, this.taskOnDrag)
        this.draging = false
      }
    },
    Drop (e) {
      if (this.draging) {
        this.tasks.splice(this.dragIndex, 0, this.taskOnDrag)
        this.draging = false
      }
    },
    DropBody (e) {
      if (this.draging) {
        this.dragIndex = this.tasks.length
        this.tasks.splice(this.dragIndex, 0, this.taskOnDrag)
        this.draging = false
      }
    },
    DragStart (e, index) {
      this.draging = true
      this.dragIndex = index
      this.taskOnDrag = this.tasks.splice(index, 1)[0]
    },
    DragOver (e, index) {
      this.dragIndex = index
      e.preventDefault()
    },
    Save () {
      let data = {
        months: this.months,
        peroids: this.peroids,
        modules: this.modules,
        tasks: this.tasks
      }
      this.$emit('on-save', JSON.parse(JSON.stringify(data)))
    },
  }
}
</script>

<style lang="less" scoped>
  .timesheet_page{
    margin: 10px auto;
    width: 1200px;
    .timesheet_head{
      display: flex;
      justify-content: space-between;
    }
    .timesheet{
      margin: 20px 0;
      position: relative;
      background-color: #333;
      min-height: 300px;
      .scale{
        height: 100%;
        position: absolute;
        display: flex;
        pointer-events: none;
        .module{
          width: 180px;
          height: 100%;
          display: flex;
          .module_list{
            width: 60px;
            border-right: 1px dashed rgba(250,250,250,0.2);
            .module_head{
              height: 20px;
              line-height: 20px;
              color: #fff;
              text-align: center;
              border-bottom: 1px solid rgba(250,250,250,0.2);
            }
          }
          .module_list:last-child{
            border-right: none;
          }
        }
        .month_list{
          height: 100%;
          width: 960px;
          display: flex;
          border-left: 1px solid rgba(250,250,250,0.2);
          border-right: 1px solid rgba(250,250,250,0.2);
          .month{
            width: 100%;
            height: inherit;
            border-left: 1px dashed rgba(250,250,250,0.2);
            .month_head{
              height: 20px;
              line-height: 20px;
              color: #fff;
              text-align: center;
              border-bottom: 1px solid rgba(250,250,250,0.2);
            }
            .week_list{
              display: flex;
              .week{
                height: 100%;
                width: 25%;
                border-right: 1px dashed rgba(250,250,250,0.2);
              }
              .week:last-child{
                border-right: none;
              }
            }
          }
          .month:first-child{
            border-left: none;
          }
        }
        .actions{
          width: 60px;
          height: 100%;
          .actions_head{
            height: 20px;
            line-height: 20px;
            color: #fff;
            text-align: center;
            border-bottom: 1px solid rgba(250,250,250,0.2);
          }
        }
      }
      .data{
        .data_head{
          height: 20px;
        }
        .task{
          height: 20px;
          line-height: 20px;
          display: flex;
          position: relative;
          .head{
            width: 180px;
            display: flex;
            color: #b5b5b5;
            text-align: center;
            .peroid_name{
              width: 60px;
              border-bottom: 1px solid rgba(250,250,250,0.2);
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .module_name{
              width: 60px;
              border-bottom: 1px solid rgba(250,250,250,0.2);
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .task_name{
              width: 60px;
              border-bottom: 1px solid rgba(250,250,250,0.2);
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .body{
            // width: 960px;
            // display: flex;
            overflow: hidden;
            .strip{
              margin-top: 6px;
              height: 7px;
              border-radius: 4px;
              margin-right: 10px;
              margin-bottom: 6px;
              display: inline-block;
              vertical-align: top;
            }
            .info{
              display: inline-block;
              vertical-align: top;
              height: 20px;
              line-height: 20px;
              color: #b5b5b5;
              .date{
                margin-right: 10px;
              }
            }
          }
          .actions{
            position: absolute;
            right: 0;
            width: 60px;
            padding: 1px 9px;
            display: flex;
            background-color: #333;
            .btn{
              color: #b5b5b5;
              height: 18px;
              width: 18px;
              border-radius: 50%;
              border: 1px solid #b5b5b5;
              text-align: center;
              line-height: 18px;
              margin-right: 5px;
              transition: color 300ms;
            }
            .btn:last-child{
              margin-right: 0;
            }
            .btn:hover{
              cursor: pointer;
              color: #e5e5e5;
            }
          }
        }
      }
    }
    .panel{
      display: flex;
      .panel_item{
        margin-right: 20px;
        .table_foot{
          border: 1px solid #dddee1;
          border-top: none;
          height: 32px;
          line-height: 32px;
          text-align: center;
          user-select: none;
        }
        .table_foot:hover{
          cursor: pointer;
          background-color: #eaf4fe;
        }
        .table_foot:active{
          background-color: transparent;
        }
      }
      .form{
        height: 250px;
        width: 400px;
        border: 1px solid #dddee1;
        .form_head{
          border-bottom: 1px solid #e9eaec;
          height: 32px;
          line-height: 32px;
          text-align: center;
          background-color: #f8f8f9;
          font-size: 12px;
          font-weight: 700;
        }
        .form_body{
          padding: 10px;
          .form_item{
            margin-bottom: 8px;
          }
        }
        .form_foot{
          border-top: 1px solid #dddee1;
          height: 32px;
          line-height: 32px;
          text-align: center;
          user-select: none;
        }
        .form_foot:hover{
          cursor: pointer;
          background-color: #eaf4fe;
        }
        .form_foot:active{
          background-color: transparent;
        }
      }
    }
    .edit_form_{
      padding: 10px;
      .form_item{
        margin-bottom: 8px;
      }
    }
  }
</style>
