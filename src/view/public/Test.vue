<template>
  <div class="ad">sdfdfsafas</div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  mounted () {
    this.$http.get('/api/projects/members/labels', result => {
      // console.log(result)
    })
  }
}
</script>

<style lang="less" scoped>

</style>
