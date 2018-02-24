<template>
  <Form ref="base" class="base" :model="base" :rules="rules" :label-width="130" label-position="right">
    <FormItem label="项目名称：" prop="project_name">
      <Input v-model="base.project_name" size="large"/>
    </FormItem>
    <FormItem label="项目编号：" prop="project_code">
      <Input v-model="base.project_code" size="large"/>
    </FormItem>
    <FormItem label="项目客户：" prop="customer_id">
      <Input v-model="base.customer_id" size="large"/>
    </FormItem>
    <FormItem label="开工日期（预计）：" prop="start_date">
      <Input v-model="base.start_date" size="large"/>
    </FormItem>
    <FormItem label="上线日期（预计）：" prop="online_date">
      <Input v-model="base.online_date" size="large"/>
    </FormItem>
    <FormItem label="项目概述：" prop="overview">
      <Input type="textarea" :rows="3" v-model="base.overview" size="large"/>
    </FormItem>
  </Form>
</template>

<script>
export default {
  data () {
    return {
      base: {
        project_name: '',
        project_code: '',
        customer_id: '',
        start_date: '',
        online_date: '',
        overview: '',
      },
      rules: {
        project_name: [
          { required: true, message: '请输入项目名称', triggle: 'blur' }
        ],
        project_code: [
          { required: true, message: '请输入项目编号', triggle: 'blur' }
        ],
        customer_id: [
          { required: true, message: '请输入项目客户', triggle: 'blur' }
        ],
        start_date: [
          { required: true, message: '请输入开工日期（预计）', triggle: 'blur' }
        ],
        online_date: [
          { required: true, message: '请输入上线日期（预计）', triggle: 'blur' }
        ],
        overview: [
          { required: true, message: '请输入项目概述', triggle: 'blur' }
        ],
      }
    }
  },
  methods: {
    validate (cb) {
      this.$refs.base.validate(valid => {
        cb(valid)
      })
    },
    getBase () {
      return this.base
    }
  }
}
</script>

<style lang="less" scoped>
  .base{
    width: 400px;
    margin: 40px 0 0 25%;
  }
</style>
