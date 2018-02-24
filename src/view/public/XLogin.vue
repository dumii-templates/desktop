<template>
  <div class="ad"></div>
</template>

<script>
export default {
  mounted () {
    let next = this.$route.query.next || '/'
    this.$browser.redirect('/api/sso/login?next=' + encodeURIComponent(`${window.location.pathname}#${next}`))
  }
}
</script>
