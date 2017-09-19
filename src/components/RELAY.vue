<script>
export default {
  functional: true,
  props: {
    state: Boolean
  },
  render (h, context) {
    console.log('relay trigger')
  }
}
</script>