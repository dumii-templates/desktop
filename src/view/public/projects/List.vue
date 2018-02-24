<template>
  <div class="container">
    <DataTable wholePage ref="dataTable" url="/api/projects?page={page}" :columns="columns" @on-row-click="rowClick">
      <div class="left">
        <!-- <Select v-model="label" @on-change="labelChange" placeholder="请选择项目" size="small" style="width: 120px;">
          <Option value="all">所有项目</Option>
          <Option v-for="label in labels" :key="label" :value="label">{{label}}</Option>
        </Select> -->
      </div>
    </DataTable>
  </div>
</template>

<script>
import DataTable from '@/components/DataTable'
export default {
  components: { DataTable },
  data () {
    return {
      label: 'all',
      labels: ['优科服', '金利', '绵阳铁塔'],
      projects: [],
      columns: [
        {
          key: 'project_code',
          title: '项目编号',
        },
        {
          key: 'project_name',
          title: '项目名称',
        },
        {
          key: 'customer_name',
          title: '项目客户'
        },
        {
          key: 'project_manager',
          title: '项目经理'
        },
        {
          key: 'sales_account_manager',
          title: '客户经理'
        },
        {
          key: 'overview',
          title: '项目概述'
        },
        // {
        //   key: 'members',
        //   title: '项目成员',
        //   render: (h, params) => {
        //     return params.row.members.join('、')
        //   }
        // }
      ]
    }
  },
  methods: {
    // getProjects () {
    //   if (this.label === 'all') {
    //     this.projects = this.projectsData
    //   } else {
    //     this.projects = this.projectsData.filter(x => {
    //       return x.label === this.label
    //     })
    //   }
    // },
    // labelChange () {
    //   this.getProjects()
    // },
    // ClickRow (item) {
    //   this.$router.push('/project/0000001')
    // }
    rowClick (item, index) {
      console.log(item)
      console.log(index)
    }
  },
  mounted () {
    // this.getProjects()
  }
}
</script>

<style lang="less" scoped>
  .container{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    .list{
      .list-head{
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        background-color: #fcfcfc;
        // border-bottom: 1px solid #ddd;
        // border: none;
        display: flex;
        justify-content: space-between;
      }
      .project{
        height: 80px;
        border: 1px solid #ddd;
        border-bottom: none;
        background-color: #fff;
        padding: 10px 20px;
        .name{
          font-size: 20px;
          font-weight: bold;
        }
        .name:hover{
          cursor: pointer;
        }
        .info{
          color: #888;
        }
      }
      .project:last-child{
        border-bottom: 1px solid #ddd;
      }
    }
    .bottom {
      height: 50px;
      line-height: 50px;
      background-color: #fff;
      border-top: 1px solid #dddee1;
      text-align: center;
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      margin-bottom: 0.8px;
    }
  }
</style>
