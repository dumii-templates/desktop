<template>
  <div class="users">
    <DataTable wholePage ref="dataTable" url="/api/rbac/roles/users?page={page}" :columns="columns"></DataTable>
  </div>
</template>

<script>
import DataTable from '@/components/DataTable'
export default {
  components: { DataTable },
  data () {
    return {
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
        {
          key: 'username',
          title: '用户名'
        },
        {
          key: 'mobile',
          title: '手机号'
        },
      ]
    }
  },
  methods: {
  }
}
</script>
