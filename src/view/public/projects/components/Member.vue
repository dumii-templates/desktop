<template>
  <div class="member">
    <div class="top" v-if="edit">
      <Select
        v-model="userId"
        filterable
        remote
        :remote-method="searchUser"
        :loading="loading"
        placeholder="搜索成员">
        <Option v-for="(option, index) in options" :value="option.id" :key="index">{{option.name}}</Option>
      </Select>
      <Button type="primary" @click="addMember" style="margin-left: 10px">添加成员</Button>
    </div>
    <!-- <DataTable ref="dataTable" pageUp url="/api/rbac/roles/users?page={page}&pagesize=5" :columns="usersColumns"></DataTable>
    <div class="middle">
      <Button type="primary"  icon="arrow-down-a">添加成员</Button>
    </div> -->
    <DataTable ref="dataTable" :url="`/api/projects/members?project_id=${this.projectId}&page={page}&pagesize=10`" :columns="columns" style="margin-top: 10px"></DataTable>
    <!-- <Table size="small" border :data="members" :columns="columns"></Table> -->
  </div>
</template>

<script>
import DataTable from '@/components/DataTable'
export default {
  components: { DataTable },
  props: {
    projectId: {
      type: String,
      required: true
    },
    edit: {
      type: Boolean,
      default: false,
    }
  },
  data () {
    return {
      usersColumns: [
        {
          type: 'selection',
          width: 60
        },
        {
          key: 'avatar',
          title: '头像',
          width: 80,
          render: (h, params) => {
            return h('div', [
              h('Avatar', {
                props: {
                  src: params.row.avatar,
                  icon: 'person'
                }
              })
            ])
          }
        },
        {
          key: 'name',
          title: '姓名'
        },
      ],
      selectMember: [],
      userId: '',
      options: [],
      loading: false,
      members: [],
      columns: [
        {
          key: 'id',
          title: 'ID',
          width: 60
        },
        {
          key: 'avatar',
          title: '头像',
          width: 80,
          render: (h, params) => {
            return h('div', [
              h('Avatar', {
                props: {
                  src: params.row.head_img,
                  icon: 'person'
                }
              })
            ])
          }
        },
        {
          key: 'name',
          title: '姓名'
        },
        {
          key: 'position',
          title: '成员类型',
          render: (h, params) => {
            switch (params.row.position) {
              case '普通成员':
                return h('div', [
                  h('span', '普通成员')
                ])
              case '项目经理':
                return h('div', [
                  h('span', {
                    style: {
                      color: 'red',
                      verticalAlign: 'middle'
                    }
                  }, '项目经理'),
                  h('Icon', {
                    props: {
                      type: 'android-person'
                    },
                    style: {
                      color: 'red',
                      marginLeft: '8px',
                      fontSize: '16px',
                      verticalAlign: 'middle'
                    }
                  })
                ])
              case '客户经理':
                return h('div', [
                  h('span', {
                    style: {
                      color: '#19be6b',
                      verticalAlign: 'middle'
                    }
                  }, '客户经理'),
                  h('Icon', {
                    props: {
                      type: 'android-contact'
                    },
                    style: {
                      color: '#19be6b',
                      marginLeft: '8px',
                      fontSize: '16px',
                      verticalAlign: 'middle'
                    }
                  })
                ])
            }
          }
        }
      ],
    }
  },
  created () {
    if (this.edit) {
      this.columns.push({
        key: 'actions',
        title: '操作',
        render: (h, params) => {
          return h('div', [
            h('Dropdown', {
              props: {
                trigger: 'click'
              },
              on: {
                'on-click': (name) => {
                  this.setPosition(name, params.row.id)
                }
              }
            }, [
              h('DropdownMenu', {
                slot: 'list'
              }, [
                h('DropdownItem', {
                  props: {
                    name: '项目经理'
                  }
                }, '项目经理'),
                h('DropdownItem', {
                  props: {
                    name: '客户经理'
                  }
                }, '客户经理')
              ]),
              h('Button', {
                props: {
                  size: 'small',
                  type: 'success'
                },
                style: {
                  marginRight: '8px'
                }
              }, '设置职位'),
            ]),
            h('Poptip', {
              props: {
                confirm: true,
                title: '确定要移除此员工吗?',
                transfer: true
              },
              on: {
                'on-ok': () => {
                  this.deleteMember(params.row.id)
                }
              }
            }, [
              h('Button', {
                props: {
                  size: 'small',
                  type: 'primary'
                },
                style: {
                  marginRight: '8px'
                },
              }, '取消'),
            ])
          ])
        }
      })
    }
  },
  methods: {
    searchUser (query) {
      if (query !== '') {
        this.loading = true
        this.$http.get(
          `/api/rbac/roles/users?search=${query}`,
          result => {
            if (result.status === 'ok') {
              this.options = result.data.data
              this.loading = false
            } else {
              this.$Message.error(result.message)
            }
          }
        )
      } else {
        this.options = []
      }
    },
    // getMember () {
    //   this.$http.get(`/api/projects/members?project_id=${this.projectId}`, result => {
    //     if (result.status === 'ok') {
    //       this.member = result.data
    //     } else {
    //       this.$Message.error(result.message)
    //     }
    //   })
    // },
    addMember () {
      this.$http.post(
        `/api/projects/members`,
        {
          project_id: this.projectId,
          user_id: this.userId
        },
        result => {
          if (result.status === 'ok') {
            this.$Message.success(result.message)
            this.$refs.dataTable.refresh()
          } else {
            // this.$Modal.error({
            //   title: '警告',
            //   content: result.message
            // })
            this.$Message.error(result.message)
          }
        }
      )
    },
    deleteMember (id) {
      this.$http.delete(
        `/api/projects/members/${id}`,
        result => {
          if (result.status === 'ok') {
            this.$Message.success(result.message)
            this.$refs.dataTable.refresh()
          } else {
            this.$Message.error(result.message)
          }
        }
      )
    },
    setPosition (name, id) {
      this.$http.post(
        `/api/projects/members/${id}`,
        {
          position: name
        },
        result => {
          if (result.status === 'ok') {
            this.$Message.success(result.message)
            this.$refs.dataTable.refresh()
          } else {
            this.$Message.error(result.message)
          }
        }
      )
    }
  }
}
</script>

<style lang="less" scoped>
  .member{
    .top{
      display: flex;
      justify-content: space-between;
    }
    .middle{
      // display: flex;
      // justify-content: space-between;
      margin-top: 10px;
      text-align: center;
    }
  }
</style>
