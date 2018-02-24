<template>
  <Layout active="projects">
    <div class="card">
      <TimesheetPage @on-save="Save"></TimesheetPage>
    </div>
  </Layout>
</template>

<script>
import Layout from '@/view/layout/Layout'
import TimesheetPage from '@/components/timesheetPage'
export default {
  components: { Layout, TimesheetPage },
  methods: {
    Save (data) {
      console.log(JSON.stringify(data))
    }
  }
}
</script>

<style lang="less" scoped>
  .card{
    padding: 20px;
    margin: 0 auto;
    width: 1240px;
    background-color: #fff;
  }
</style>
