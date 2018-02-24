<template>
  <Select v-model="selected" @on-change="change">
    <Option v-for="(option, index) in options" :key="index" :value="option.id">{{option.name}}</Option>
  </Select>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default () {
        return []
      }
    },
    value: {
      type: [String, Number],
    },
  },
  data () {
    return {
      selected: ''
    }
  },
  methods: {
    change (val) {
      this.$emit('on-change', val)
    }
  },
  mounted () {
    this.selected = this.value
  },
  watch: {
    value (val) {
      this.selected = val
    }
  }
}
</script>
