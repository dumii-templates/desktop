<template>
  <transition-group
    tag="div"
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:leave="leave">
    <slot></slot>
  </transition-group>
</template>

<script>
import Velocity from 'velocity-animate'

export default {
  props: {
    height: {
      type: Number,
      default: 80
    },
    delay: {
      type: Number,
      default: 150
    }
  },
  methods: {
    beforeEnter (el) {
      el.style.opacity = 0
      el.style.height = 0
    },
    enter (el, done) {
      var delay = el.dataset.index * this.delay
      setTimeout(() => {
        Velocity(
          el,
          { opacity: 1, height: this.height + 'px' },
          { complete: done }
        )
      }, delay)
    },
    leave (el, done) {
      var delay = el.dataset.index * this.delay
      setTimeout(() => {
        Velocity(
          el,
          { opacity: 0, height: 0 },
          { complete: done }
        )
      }, delay)
    }
  }
}
</script>
