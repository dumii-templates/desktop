<template>
  <div class="config">
    <DataTable wholePage ref="dataTable" url="/api/configs?page={page}" :columns="columns">
      <div class="left">
        <Input size="small" />
      </div>
      <div class="right">
        <Button size="small" type="primary" icon="plus-round">新建配置</Button>
      </div>
    </DataTable>
    <Modal
      v-model="showForm"
      title="修改配置"
      @on-ok="saveForm"
      @on-cancel="formDataReset">
      <Form :model="formData"
        ref="saveForm"
        label-position="right"
        :label-width="80">
        <FormItem label="名字" prop="name">
          <Input v-model="formData.name" />
        </FormItem>
        <FormItem label="键(Key)" prop="key">
          <Input v-model="formData.key" />
        </FormItem>
        <FormItem label="值(Value)" prop="value">
          <Input type="textarea" v-model="formData.value" :autosize="{minRows: 2,maxRows: 5}" />
        </FormItem>
        <FormItem label="备注" prop="comment">
          <Input type="textarea" v-model="formData.comment" :autosize="{minRows: 2,maxRows: 5}" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import DataTable from '@/components/DataTable'
export default {
  components: { DataTable },
  data () {
    return {
      currentId: null,
      columns: [
        {
          key: 'name',
          title: 'NAME'
        },
        {
          key: 'key',
          title: 'KEY'
        },
        {
          key: 'value',
          title: 'VALUE'
        },
        {
          key: 'actions',
          title: 'ACTIONS',
          render: (h, params) => {
            return h('div', [
              h('Tooltip', {
                props: {
                  content: '编辑',
                  placement: 'top',
                  delay: 500,
                  transfer: true
                },
              }, [
                h('Button', {
                  props: {
                    shape: 'circle',
                    icon: 'edit'
                  },
                  style: {
                  },
                  on: {
                    click: () => {
                      this.toEdit(params.row._id)
                    }
                  }
                }),
              ]),
            ])
          }
        }
      ],
      showForm: false,
      formData: {
        key: '',
        name: '',
        value: '',
        comment: ''
      },
    }
  },
  methods: {
    toEdit (id) {
      this.currentId = id
      this.getData(() => {
        this.showForm = true
      })
    },
    getData (callback) {
      this.$http.get(
        `/api/configs/${this.currentId}`,
        result => {
          if (result.status === 'ok') {
            this.formData.key = result.data.key
            this.formData.name = result.data.name
            this.formData.value = result.data.value
            this.formData.comment = result.data.comment
            callback()
          } else {
            this.$Message.error(result.message)
          }
        }
      )
    },
    formDataReset () {
      this.$refs['saveForm'].resetFields()
      this.currentId = null
    },
    saveForm () {
      this.$http.post(
        `/api/configs` + `${this.currentId ? '/' + this.currentId : ''}`,
        this.formData,
        result => {
          if (result.status === 'ok') {
            this.$Message.success(result.message)
            this.$refs.dataTable.getData(1)
          } else {
            this.$Message.error(result.message)
          }
          this.formDataReset()
        }
      )
    },
  }
}
</script>

<style lang="less" scoped>
  .config{
    height: 100%;
  }
</style>
