<template>
  <div class="timesheet">
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
      <div class="month_list" :style="{ width: (width - 180) + 'px' }">
        <div class="month" v-for="month in data.months" :key="month">
          <div class="month_head">{{month}}</div>
          <div class="week_list" style="height: calc(100% - 21px);">
            <div class="week"></div>
            <div class="week"></div>
            <div class="week"></div>
            <div class="week"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="data">
      <div class="data_head"></div>
      <div class="task" v-for="(task, index) in data.tasks" :key="index">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          months: [],
          peroids: [],
          modules: [],
          tasks: [],
        }
      }
    },
    width: {
      type: Number,
      default: 760
    }
  },
  data () {
    return {}
  },
  methods: {
    peroidName (id) {
      return this.data.peroids.find(x => {
        return x.id === id
      }).name
    },
    moduleName (id) {
      return this.data.modules.find(x => {
        return x.id === id
      }).name
    },
  },
  computed: {
    monthNum () {
      return this.data.months.length
    },
    monthWith () {
      return this.monthNum === 0 ? 0 : (this.width - 180) / this.monthNum
    },
    dayWidth () {
      return this.monthWith / 30
    }
  }
}
</script>

<style lang="less" scoped>
  .timesheet{
    position: relative;
    background-color: #333;
    min-height: 160px;
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
      }
    }
  }
</style>
