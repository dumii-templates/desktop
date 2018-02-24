<template>
  <div class="contain">
    <div class="card">
      <Button class="btn" type="success" @click="Preview">{{preview ? '取消' : ''}}预览</Button>
      <Button class="btn" type="info" @click="SaveAs">另存为</Button>
      <Button class="btn" type="primary" @click="Save">保存</Button>
    </div>
    <div class="components" v-if="!preview">
      <div v-for="(item, index) in components" :key="index" class="item" draggable="true" @dragstart="e => DragItem(e, item.type)" @dragend="e => DragEnd(e)">{{item.name}}</div>
    </div>
    <div v-if="!preview" class="form" @drop="e => DropForm(e)" @dragover="e => { e.preventDefault()}">
      <div class="row" v-for="(row,index) in form" :key="index" @dragover="e => DragoverRow(e, index)">
        <div class="title" v-if="row.type === 'title'">
          <Input v-model="row.title"  placeholder="标题"/>
        </div>
        <div class="line" v-if="row.type === 'line'" @drop="e => DropLine(e, index)">
          <div class="col" v-for="(col, cindex) in row.items" :key="cindex">
            <div class="key">
              <Input v-model="col.key" style="width: 100px" placeholder="单项名称" />
            </div>
            <div class="value">
            </div>
          </div>
        </div>
        <div class="textarea" v-if="row.type === 'textarea' || row.type === 'editor'">
          <div class="head">
            <Input v-model="row.key" placeholder="文本名称" />
          </div>
          <div class="body"></div>
        </div>
        <div class="table" v-if="row.type === 'table'" @drop="e => DropTable(e, index)" @dragover="e => { e.preventDefault()}">
          <div class="column" v-for="(column, cindex) in row.columns" :key="cindex">
            <div class="tr">
              <Input v-model="column.name" placeholder="请输入列名"/>
            </div>
            <div class="tr"></div>
            <div class="tr"></div>
          </div>
        </div>
        <div class="addrow" v-if="row.type === 'addrow'"></div>
        <div class="actions">
          <Button shape="circle" class="btn" size="small" icon="arrow-up-c" type="primary" v-if="index !== 0" @click="UpRow(index)"></Button>
          <Button shape="circle" class="btn" size="small" icon="arrow-down-c" type="primary" v-if="index !== form.length - 1" @click="DownRow(index)"></Button>
          <Poptip confirm title="您确定要删除此组件吗?" transfer @on-ok="DeleteRow(index)">
            <Button shape="circle" class="btn" size="small" icon="close-round" type="primary"></Button>
          </Poptip>
        </div>
      </div>
      <div class="form_bottom" @dragover="e => DragoverBottom(e)"></div>
    </div>
    <div v-if="preview" class="preview">
      <div class="row" v-for="(row,index) in form" :key="index">
        <div class="title" v-if="row.type === 'title'">
          {{row.title}}
        </div>
        <div class="line" v-if="row.type === 'line'">
          <div class="col" v-for="(col, cindex) in row.items" :key="cindex">
            <div class="key">
              {{col.key}}
            </div>
            <div class="value">
              <Input v-if="col.component === 'input'" class="input" placeholder="请输入"/>
              <DatePicker v-if="col.component === 'time'" class="input" type="date" placeholder="请选择日期"></DatePicker>
              <DatePicker v-if="col.component === 'timearea'" class="input" type="daterange" placement="bottom-end" placeholder="请选择日期"></DatePicker>
              <InputNumber v-if="col.component === 'number'" class="input"></InputNumber>
            </div>
          </div>
        </div>
        <div class="textarea" v-if="row.type === 'textarea'">
          <div class="head">
            {{row.key}}
          </div>
          <div class="body">
            <Input type="textarea" :rows="4" placeholder="请输入" />
          </div>
        </div>
        <div class="editor" v-if="row.type === 'editor'">
          <div class="head">
            {{row.key}}
          </div>
          <div class="body">
            <Editor></Editor>
          </div>
        </div>
        <div class="table" v-if="row.type === 'table'">
          <div class="column" v-for="(column, cindex) in row.columns" :key="cindex">
            <div class="tr">
              {{column.name}}
            </div>
            <div class="tr">
              <Input placeholder="请输入"/>
            </div>
            <div class="tr">
              <Input placeholder="请输入"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import controlForm from '@/data/controlForm'
import memberForm from '@/data/memberForm'
import evaluateForm from '@/data/evaluateForm'
import Editor from '@/components/Editor'
export default {
  components: { Editor },
  data () {
    return {
      preview: false,
      draging: false,
      dragType: null,
      components: [
        { name: '标题', type: 'title' },
        { name: '单行文本', type: 'input' },
        { name: '时间', type: 'time' },
        { name: '时间段', type: 'timearea' },
        { name: '数字', type: 'number' },
        { name: '多行文本', type: 'textarea' },
        { name: '富文本', type: 'editor' },
        { name: '表格', type: 'table' },
        // { name: '签字栏', type: 'sign' },
      ],
      form: []
    }
  },
  mounted () {
    if (this.$route.name === 'template-edit') {
      switch (this.$route.params.id) {
        case '01':
          this.form = controlForm
          break
        case '02':
          this.form = memberForm
          break
        case '03':
          this.form = evaluateForm
          break
      }
    }
  },
  methods: {
    DragItem (e, type) {
      this.draging = true
      this.dragType = type
    },
    DragEnd (e) {
      let addrowIndex = this.form.findIndex(x => {
        return x.type === 'addrow'
      })
      if (addrowIndex !== -1) {
        this.form.splice(addrowIndex, 1)
      }
    },
    DropForm (e) {
      if (this.draging) {
        let newRow = {}
        switch (this.dragType) {
          case 'input': case 'time': case 'timearea':
            newRow = {
              type: 'line',
              items: [
                { key: '', component: this.dragType, value: '' },
              ]
            }
            break
          case 'number':
            newRow = {
              type: 'line',
              items: [
                { key: '', component: this.dragType, value: 0 },
              ]
            }
            break
          case 'textarea':
            newRow = {
              type: 'textarea',
              key: '',
              value: ''
            }
            break
          case 'title':
            newRow = {
              type: 'title',
              title: ''
            }
            break
          case 'editor':
            newRow = {
              type: 'editor',
              key: '',
              value: ''
            }
            break
          case 'table':
            newRow = {
              type: 'table',
              columns: [
                { name: '' }
              ],
              data: [
                ['']
              ]
            }
            break
          // case 'sign':
          //   newRow = {
          //     type: 'sign',
          //     name: ''
          //   }
          //   break
        }
        let addrowIndex = this.form.findIndex(x => {
          return x.type === 'addrow'
        })
        this.form.splice(addrowIndex === -1 ? this.form.length : addrowIndex, 1, newRow)
        this.draging = false
      }
    },
    DropLine (e, index) {
      if (this.draging) {
        let newRow = null
        if (this.dragType === 'input' || this.dragType === 'time' || this.dragType === 'timearea' || this.dragType === 'number') {
          if (this.form[index].items.length < 2) {
            this.form[index].items.push({ key: '', component: this.dragType, value: this.dragType === 'number' ? 0 : '' })
            e.stopPropagation()
          } else {
            newRow = {
              type: 'line',
              items: [
                { key: '', component: this.dragType, value: this.dragType === 'number' ? 0 : '' },
              ]
            }
          }
        } else {
          switch (this.dragType) {
            case 'textarea':
              newRow = {
                type: 'textarea',
                key: '',
                value: ''
              }
              break
            case 'title':
              newRow = {
                type: 'title',
                title: ''
              }
              break
            case 'editor':
              newRow = {
                type: 'editor',
                key: '',
                value: ''
              }
              break
            case 'table':
              newRow = {
                type: 'table',
                columns: [
                  { name: '' }
                ],
                data: [
                  ['']
                ]
              }
              break
          }
        }
        let addrowIndex = this.form.findIndex(x => {
          return x.type === 'addrow'
        })
        if (addrowIndex !== -1) {
          this.form.splice(addrowIndex, 1)
          if (newRow) {
            this.form.splice(addrowIndex, 0, newRow)
          }
        }
        this.draging = false
      }
    },
    DropTable (e, index) {
      if (this.draging) {
        if (this.dragType === 'table') {
          if (this.form[index].columns.length < 6) {
            this.form[index].columns.push({ name: '' })
            this.form[index].data[0].push('')
          } else {
            this.$Message.error('表格列数数不能超过6项')
          }
          e.stopPropagation()
        }
        this.draging = false
      }
    },
    DragoverRow (e, index) {
      let addrowIndex = this.form.findIndex(x => {
        return x.type === 'addrow'
      })
      if (addrowIndex === -1) {
        this.form.splice(index, 0, {
          type: 'addrow'
        })
      } else if (addrowIndex !== index && addrowIndex !== (index - 1)) {
        this.form.splice(addrowIndex, 1)
      }
      // e.stopPropagation()
    },
    DragoverBottom (e) {
      let addrowIndex = this.form.findIndex(x => {
        return x.type === 'addrow'
      })
      if (addrowIndex === -1) {
        this.form.push({
          type: 'addrow'
        })
      } else if (addrowIndex !== this.form.length - 1) {
        this.form.splice(addrowIndex, 1)
      }
    },
    UpRow (index) {
      this.form.splice(index - 1, 0, this.form.splice(index, 1)[0])
    },
    DownRow (index) {
      this.form.splice(index + 1, 0, this.form.splice(index, 1)[0])
    },
    DeleteRow (index) {
      this.form.splice(index, 1)
    },
    Preview () {
      this.preview = !this.preview
    },
    SaveAs () {},
    Save () {
      // this.$Modal.
      console.log(JSON.stringify(this.form))
    }
  }
}
</script>

<style lang="less" scoped>
  @borderColor: #666;
  .contain{
    width: 1080px;
    margin: 0 auto;
    .card{
      height: 60px;
      margin-right: 140px;
      background-color: #fff;
      line-height: 60px;
      padding: 10px 20px;
      display: flex;
      justify-content: flex-end;
      .btn{
        height: 32px;
        margin-top: 4px;
        margin-left: 10px;
      }
    }
    .components{
      position: fixed;
      top: 150px;
      width: 120px;
      .item{
        height: 40px;
        border-top: 2px solid red;
        background-color: #fff;
        line-height: 40px;
        color: #888;
        text-align: center;
        font-size: 16px;
      }
      .item:hover{
        cursor: move;
      }
      .item:active{
        border: 2px solid red;
      }
      .item:active + .item{
        border-top: 2px solid #fff;
      }
      // .item:last-child{
      //   border-bottom: 1px solid #aaa;
      // }
    }
    .form{
      min-height: 500px;
      background-color: #fff;
      width: 800px;
      margin: 20px auto;
      padding: 20px 20px 0;
      .row{
        border: 1px solid @borderColor;
        border-bottom: none;
        position: relative;
        .title{
          height: 40px;
          line-height: 38px;
          padding: 0 10px;
        }
        .line{
          display: flex;
          height: 40px;
          line-height: 38px;
          .col{
            width: 100%;
            display: flex;
            .key{
              padding: 0 10px;
              border-right: 1px solid @borderColor;
            }
            .value{
              // width: 80%;
              padding: 0 10px;
            }
          }
          .col:not(:last-child){
            border-right: 1px solid @borderColor;
          }
        }
        .textarea{
          .head{
            height: 40px;
            line-height: 38px;
            padding: 0 10px;
            border-bottom: 1px solid @borderColor;
          }
          .body{
            height: 100px;
          }
        }
        .table{
          display: flex;
          .column{
            width: 100%;
            border-right: 1px solid @borderColor;
            .tr{
              height: 40px;
              line-height: 38px;
              border-bottom: 1px solid @borderColor;
            }
            .tr:last-child{
              border-bottom: none;
            }
          }
          .column:last-child{
            border-right: none;
          }
        }
        .addrow{
          height: 10px;
          background-color: red;
        }
        .actions{
          transition: opacity 500ms;
          opacity: 0;
          position: absolute;
          top: 0;
          right: -100px;
          height: 40px;
          width: 90px;
          line-height: 40px;
          .btn{
            // line-height: 24px;
            padding-top: 1px;
            padding-left: 1px;
            text-align: center;
          }
          // border: 1px solid #dddee1;
          // background-color: #fff;
          // border-radius: 4px;
        }
      }
      .row:hover{
        .actions{
          opacity: 1;
        }
      }
      .row:last-child{
        border-bottom: 1px solid @borderColor;
      }
      .form_bottom:not(:first-child){
        border-top: 1px solid @borderColor;
      }
      .form_bottom{
        height: 40px;
      }
    }
    .preview{
      min-height: 500px;
      background-color: #fff;
      width: 800px;
      margin: 20px auto;
      padding: 20px 20px 40px;
      .row{
        border: 1px solid @borderColor;
        border-bottom: none;
        .title{
          font-size: 14px;
          height: 40px;
          line-height: 40px;
          padding: 0 10px;
        }
        .line{
          display: flex;
          height: 40px;
          line-height: 38px;
          .col{
            width: 100%;
            display: flex;
            .key{
              text-align: center;
              min-width: 100px;
              padding: 0 10px;
              border-right: 1px solid @borderColor;
            }
            .value{
              // width: 80%;
              padding: 0 10px;
              width: 100%;
              .input{
                width: 100%;
              }
            }
          }
          .col:not(:last-child){
            border-right: 1px solid @borderColor;
          }
        }
        .textarea{
          .head{
            height: 40px;
            line-height: 38px;
            padding: 0 10px;
            border-bottom: 1px solid @borderColor;
          }
          .body{
            height: 100px;
          }
        }
        .editor{
          .head{
            height: 40px;
            line-height: 38px;
            padding: 0 10px;
            border-bottom: 1px solid @borderColor;
          }
        }
        .table{
          display: flex;
          .column{
            width: 100%;
            border-right: 1px solid @borderColor;
            .tr{
              text-align: center;
              height: 40px;
              line-height: 38px;
              border-bottom: 1px solid @borderColor;
            }
            .tr:last-child{
              border-bottom: none;
            }
          }
          .column:last-child{
            border-right: none;
          }
        }
      }
      .row:last-child{
        border-bottom: 1px solid @borderColor;
      }
    }
  }
</style>
