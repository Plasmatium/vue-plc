<script>
export default {
  functional: true,
  props: {
    name: String,
    lineIn: Function,
    lineOut: Boolean
  },
  render (h, context) {
    return context.props
  }
}
</script>
