<template>
  <div id="editor"></div>
</template>

<script>
import Editor from 'wangeditor'
export default {
  name: 'editor',
  props: {
    value: {
      type: String,
      default: '<p><br></p>'
    }
  },
  data () {
    return {
      editor: null,
      content: ''
    }
  },
  methods: {
    editorInit () {
      // this.editor = new Editor('#head', '#editor')
      this.editor = new Editor('#editor')
      this.editor.customConfig.zIndex = 80
      this.editor.customConfig.uploadImgShowBase64 = true
      this.editor.customConfig.onchange = (content) => {
        this.content = content
        this.$emit('input', this.content)
      }
      // this.editor.customConfig.uploadImgServer = '/api/file/upload'
      // this.editor.customConfig.uploadImgHooks = {
      //   success: function (xhr, editor, result) {},
      //   fail: function (xhr, editor, result) {},
      //   error: function (xhr, editor) {},
      //   customInsert: function (insertImg, result, editor) {
      //     let url = `/api/file/download/${result.data.id}`
      //     insertImg(url)
      //   }
      // }
      this.editor.create()
      this.editor.txt.html(this.content)
    },
    getContent () {
      return this.editor.txt.html()
    },
    setContent (content) {
      this.editor.txt.html(content)
    }
  },
  mounted () {
    this.content = this.value
    this.editorInit()
  },
  watch: {
    value (val) {
      this.content = val
    }
  }
}
</script>
