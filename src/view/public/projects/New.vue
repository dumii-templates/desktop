<template>
  <div class="contain">
    <div class="steps">
      <!-- <Button class="btn" type="primary" @click="Save">保存</Button> -->
      <Steps :current="currentStep">
        <Step title="基本信息"></Step>
        <Step title="项目成员"></Step>
        <Step title="项目模板"></Step>
        <Step title="时间计划"></Step>
      </Steps>
    </div>
    <div class="main-card">
      <div class="base-card" v-if="currentStep === 0">
        <Base ref="baseModule"></Base>
        <div class="bottom">
          <Button class="btn" type="primary" @click="confirmBase">下一步</Button>
        </div>
      </div>
      <div class="membere-card" v-if="currentStep === 1">
        <Member edit :projectId="project_id"></Member>
        <div class="bottom">
          <Button class="btn" type="primary" @click="confirmMember">下一步</Button>
        </div>
      </div>
      <div class="forms" v-if="currentStep === 2">
        <div class="top">
          <p>添加模板：</p>
          <CheckboxGroup v-model="selectedForms" size="large" @on-change="changeForms">
            <Checkbox v-for="form in templates" :key="form.id" :label="form.id" >{{form.name}}</Checkbox>
          </CheckboxGroup>
        </div>
        <div class="form" v-for="(form, findex) in forms" :key="findex">
          <div class="form-name" :style="{ borderBottom: form.open ? 'none' : '1px solid #aaa' }">
            <div class="open">
              <Button size="small" v-if="form.open" icon="minus-round" @click="form.open = !form.open"></Button>
              <Button size="small" v-else icon="plus-round" @click="form.open = !form.open"></Button>
            </div>
            {{form.name}}
          </div>
          <div class="form-body" v-if="form.open">
            <div class="row" v-for="(row,index) in form.rows" :key="index">
              <div class="title" v-if="row.type === 'title'">
                {{row.title}}
              </div>
              <div class="line" v-if="row.type === 'line'">
                <div class="col" v-for="(col, cindex) in row.items" :key="cindex">
                  <div class="key">
                    {{col.key}}
                  </div>
                  <div class="value">
                    <Input class="input" v-if="col.component === 'input'" v-model="col.value" placeholder="请输入"/>
                    <DatePicker class="input" v-if="col.component === 'time'" v-model="col.value" type="date" placeholder="请选择日期"></DatePicker>
                    <DatePicker class="input" v-if="col.component === 'timearea'" v-model="col.value" type="daterange" placement="bottom-end" placeholder="请选择日期"></DatePicker>
                    <InputNumber class="input" v-if="col.component === 'number'" v-model="col.value"></InputNumber>
                  </div>
                </div>
              </div>
              <div class="textarea" v-if="row.type === 'textarea'">
                <div class="head">
                  {{row.key}}
                </div>
                <div class="body">
                  <Input type="textarea" v-model="row.value" :rows="4" placeholder="请输入" />
                </div>
              </div>
              <div class="editor" v-if="row.type === 'editor'">
                <div class="head">
                  {{row.key}}
                </div>
                <div class="body">
                  <Editor v-model="row.value"></Editor>
                </div>
              </div>
              <div class="table" v-if="row.type === 'table'">
                <div class="table_body">
                  <div class="column" v-for="(column, cindex) in row.columns" :key="cindex">
                    <div class="tr">
                      {{column.name}}
                    </div>
                    <div v-for="(item,iindex) in row.data" :key="iindex" class="tr">
                      <Input v-model="item[cindex]" placeholder="请输入"/>
                    </div>
                  </div>
                </div>
                <div class="table_foot" @click="addItem(row.data, row.columns.length)">
                  <Icon type="plus-round"></Icon>
                  添加
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <Button type="primary" @click="confirmForms">下一步</Button>
        </div>
      </div>
      <div class="timesheet">
        <TimesheetPage v-if="currentStep === 3" @on-save="Save"></TimesheetPage>
      </div>
    </div>
  </div>
</template>

<script>
import Base from './components/Base'
import Member from './components/Member'
import formData from '@/data/formData'
// import timesheetData from '@/data/timesheetData'
import Editor from '@/components/Editor'
import TimesheetPage from '@/components/timesheetPage'
export default {
  components: { Base, Member, Editor, TimesheetPage },
  data () {
    return {
      currentStep: 1,
      base: {},
      members: {
        proMan: '',
        cusMan: '',
        proCus: '',
        proMem: '',
      },
      project_id: '5a7d3f4432751d50412e5d9a',
      templates: formData,
      selectedForms: [],
      forms: [],
      // timesheet: {
      //   open: true,
      //   data: timesheetData
      // }
    }
  },
  mounted () {
    // this.forms = this.templates.map(item => {
    //   return {
    //     id: item.id
    //   }
    // })
  },
  methods: {
    confirmBase () {
      this.$refs.baseModule.validate(valid => {
        if (valid) {
          this.base = this.$refs.baseModule.getBase()
          this.$http.post('/api/projects', this.base, result => {
            if (result.status === 'ok') {
              this.$Message.success(result.message)
              this.project_id = result.data
              this.currentStep = 1
            }
          })
        }
      })
    },
    confirmMember () {
      this.currentStep = 2
    },
    changeForms () {
      this.forms = JSON.parse(JSON.stringify(this.templates.filter(item => {
        return this.selectedForms.indexOf(item.id) !== -1
      }).map(item => {
        return Object.assign(item, {
          open: false
        })
      })))
    },
    addItem (data, length) {
      let item = []
      for (let i = 0; i < length; i++) {
        item.push('')
      }
      data.push(item)
    },
    confirmForms () {
      this.currentStep = 3
    },
    Save (data) {
      console.log(JSON.stringify({
        base: this.base,
        member: this.member,
        forms: this.forms,
        timesheet: data
      }))
    },

  }
}
</script>

<style lang="less" scoped>
  @borderColor: #aaa;
  .contain{
    .steps{
      height: 70px;
      background-color: #fff;
      line-height: 70px;
      padding: 20px 0 0 60px;
      border-bottom: 1px solid #dddee1;
    }
    .main-card{
      margin: 0 auto 10px;
      background-color: #fff;
      padding: 40px;
      .bottom{
        margin-top: 60px;
        text-align: center;
        .btn{
          margin-left: 40px;
        }
      }
      .base-card{
      }
      .member-card{
      }
      .forms{
        padding: 30px 0;
        .top{
          padding: 0 30px;
          p{
            font-size: 14px;
            margin-bottom: 10px;
          }
        }
        .form{
          margin: 10px auto 0;
          padding: 0 20px;
          .form-name{
            height: 50px;
            line-height: 50px;
            border: 1px solid @borderColor;
            border-bottom: none;
            text-align: center;
            font-size: 20px;
            position: relative;
            .open{
              position: absolute;
              right: 20px;
            }
          }
          .form-body{
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
                    min-width: 120px;
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
                .table_body{
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
                .table_foot{
                  height: 40px;
                  line-height: 40px;
                  text-align: center;
                  border-top: 1px solid @borderColor;
                }
                .table_foot:hover{
                  color: red;
                  cursor: pointer;
                }
              }
            }
            .row:last-child{
              border-bottom: 1px solid @borderColor;
            }
          }
        }
        .bottom{
          margin-top: 20px;
          text-align: center;
        }
      }
      .timesheet{
        padding: 20px 0;
      }
    }
    .timesheet_card{
      width: 800px;
      background-color: #fff;
      margin: 0 auto 10px;
      padding: 20px;
      .timesheet_head{
        height: 50px;
        line-height: 50px;
        background-color: #333;
        color: #fff;
        text-align: center;
        font-size: 20px;
        position: relative;
        .open{
          position: absolute;
          right: 20px;
        }
      }
    }
  }
</style>
<style>
  .ivu-steps-main{
    line-height: 26px!important
  }
</style>
