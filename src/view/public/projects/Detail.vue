<template>
  <div class="contain">
    <Tabs type="card">
      <TabPane label="基础信息">
        <div class="base">
          <div class="item big">
            <span>项目编号:</span>
            <span>{{base.proNum}}</span>
          </div>
          <div class="item big">
            <span>项目名称:</span>
            <span>{{base.proName}}</span>
          </div>
          <div class="small">
            <div class="item">
              <span>项目经理:</span>
              <span>{{base.proMan}}</span>
            </div>
            <div class="item">
              <span>客户经理:</span>
              <span>{{base.cusMan}}</span>
            </div>
            <div class="item">
              <span>项目客户:</span>
              <span>{{base.proCus}}</span>
            </div>
            <div class="item">
              <span>项目成员:</span>
              <span>{{base.proMem}}</span>
            </div>
          </div>
        </div>
      </TabPane>
      <TabPane v-for="(form, index) in forms" :key="index" :label="form.name">
        <div class="form">
          <!-- <div class="form-name">
            {{form.name}}
          </div> -->
          <div class="form-body">
            <div class="row" v-for="(row,index) in form.form" :key="index">
              <div class="title" v-if="row.type === 'title'">
                {{row.title}}
              </div>
              <div class="line" v-if="row.type === 'line'">
                <div class="col" v-for="(col, cindex) in row.items" :key="cindex">
                  <div class="key">
                    {{col.key}}
                  </div>
                  <div class="value">
                    <span v-if="col.component === 'time'">{{$moment().format('YYYY-MM-DD')}}</span>
                    <span v-else>{{col.value}}</span>
                  </div>
                </div>
              </div>
              <div class="textarea" v-if="row.type === 'textarea'">
                <div class="head">
                  {{row.key}}
                </div>
                <div class="body">
                  {{row.value}}
                </div>
              </div>
              <div class="editor" v-if="row.type === 'editor'">
                <div class="head">
                  {{row.key}}
                </div>
                <div class="body">
                  <div v-html="row.value"></div>
                </div>
              </div>
              <div class="table" v-if="row.type === 'table'">
                <div class="column" v-for="(column, cindex) in row.columns" :key="cindex">
                  <div class="tr">
                    {{column.name}}
                  </div>
                  <div v-for="(item,iindex) in row.data" :key="iindex" class="tr">
                    {{item[cindex]}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TabPane>
      <TabPane label="时间计划甘特图">
        <Timesheet :width="998" :data="timesheet.data"></Timesheet>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import Editor from '@/components/Editor'
import projectData from '@/data/projectData'
import Timesheet from '@/components/timesheet'
export default {
  components: { Editor, Timesheet },
  data () {
    return Object.assign(projectData, {})
  },
}
</script>

<style lang="less" scoped>
  @borderColor: #aaa;
  .contain{
    padding: 20px;
    // background-color: #fff;
    width: 1080px;
    margin: 0 auto 100px;
    .base{
      padding: 100px 180px 30px;
      .small{
        padding: 20px 20px 0;
      }
      .item{
        text-align: center;
        margin-bottom: 20px;
        span{
          font-size: 16px;
          min-width: 100px;
          margin-top: 5px;
          margin-right: 10px;
        }
      }
      .item.big{
        span{
          font-weight: bold;
          font-size: 18px;
        }
      }
    }
    .form{
      // .form-name{
      //   height: 50px;
      //   line-height: 50px;
      //   border: 1px solid @borderColor;
      //   border-bottom: none;
      //   text-align: center;
      //   font-size: 20px;
      //   position: relative;
      // }
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
              font-size: 14px;
              height: 40px;
              line-height: 38px;
              padding: 0 10px;
              border-bottom: 1px solid @borderColor;
            }
            .body{
              padding: 10px;
              height: 100px;
            }
          }
          .editor{
            .head{
              font-size: 14px;
              height: 40px;
              line-height: 38px;
              padding: 0 10px;
              border-bottom: 1px solid @borderColor;
            }
            .body{
              padding: 10px;
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
  }
</style>
<style>
  .contain > .ivu-tabs-card > .ivu-tabs-content > .ivu-tabs-tabpane{
    background-color: #fff;
    border: 1px solid #dddee1;
    border-top: none;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    padding: 20px;
    height: 620px;
    overflow-y: auto;
  }
  .contain > .ivu-tabs-card > .ivu-tabs-bar{
    margin-bottom: 0;
  }
</style>
