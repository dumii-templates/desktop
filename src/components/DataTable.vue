<template>
  <div class="datatable" :class="{'whole-page': wholePage}">
    <div class="table">
      <div class="table-head">
        <slot></slot>
        <template v-if="pageUp && tableData.total>tableData.per_page">
          <div></div>
          <Page size="small" :total="tableData.total" :page-size="tableData.per_page" :current="tableData.current_page" @on-change="changePage"></Page>
        </template>
      </div>
      <Table class="table-body" border size="small" :loading="loading" :data="tableData.data" :columns="columns" @on-selection-change="select" @on-row-click="rowClick"></Table>
    </div>
    <div v-if="!pageUp && tableData.total>tableData.per_page" class="bottom">
      <Page :total="tableData.total" :page-size="tableData.per_page" :current="tableData.current_page" @on-change="changePage"></Page>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    wholePage: {
      type: Boolean,
      default: false
    },
    pageUp: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tableData: {},
      loading: false,
      selectedData: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData (page = 1) {
      this.loading = true
      this.$http.get(this.url.replace('{page}', page), result => {
        if (result.status === 'ok') {
          this.tableData = result.data
          this.loading = false
        } else {
          this.$Message.error(result.message)
        }
      })
    },
    changePage (page) {
      this.getData(page)
    },
    select (selection) {
      this.selectedData = selection
    },
    getSelectedData () {
      return this.selectedData
    },
    refresh () {
      this.getData(this.tableData.current_page)
    },
    rowClick (item, index) {
      this.$emit('on-row-click', item, index)
    }
  },
  watch: {
    url () {
      this.getData()
    }
  }
}
</script>

<style lang="less" scoped>
  .datatable{
    .table{
      .table-head{
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        background-color: #fcfcfc;
        display: flex;
        justify-content: space-between;
        border: 1px solid #dddee1;
        border-bottom: none;
      }
    }
    .bottom {
      height: 50px;
      line-height: 50px;
      background-color: #fff;
      text-align: center;
      border: 1px solid #dddee1;
      border-top: none;
    }
  }
  .datatable.whole-page{
    .table{
      .table-head{
        border: none;
      }
      .table-body{
        border-left: none;
      }
    }
    .bottom{
      border: none;
      border-top: 1px solid #dddee1;
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      margin-bottom: 0.8px;
    }
  }
</style>
