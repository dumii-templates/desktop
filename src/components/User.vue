<template>
  <div class="userModule">
    <Dropdown v-if="isLogin" trigger="click" @on-click="clickItem">
      <div class="user">
        <Avatar class="avatar" icon="person" />
        <span class="username">{{user.name}}</span>
      </div>
      <DropdownMenu slot="list">
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <div v-else class="login" @click="$router.push({ name: 'login' })">登录</div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    clickItem (name) {
      if (name === 'logout') {
        this.$auth.clearAuth()
        this.$router.push({ name: 'login' })
      }
    }
  },
  computed: {
    isLogin () {
      return this.$auth.isLogin()
    },
    user () {
      return this.$auth.getUser()
    },
  }
}
</script>

<style lang="less" scoped>
  .userModule{
    position: absolute;
    right: 20px;
    top: 0;
    height: 50px;
    .user{
      cursor: pointer;
      .avatar{
        margin-right: 10px;
      }
      .username{
        transition: color 500ms;
      }
    }
    .user:hover{
      .username{
        color: red;
      }
    }
  }
</style>
