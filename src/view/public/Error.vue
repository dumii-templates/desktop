<template>
  <div class="info">
    <img src="~@/assets/img/error.gif" style="margin-top:50px">
    <div>
      <h1>错误 {{ $route.query.code }} </h1>
      <span> {{ $route.query.message }} </span>
    </div>
    <router-link to="/">返回首页</router-link>
    <a @click="$router.back()">返回上一页</a>
  </div>
</template>

<script>

export default {
  name: 'error',
  components: { },
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
  .info {
    text-align: center;
  }

  h1 {
    font-size: 30px;
    display: inline-block;
  }

  span {
    font-size: 16px;
    margin-left: 10px;
  }
</style>
