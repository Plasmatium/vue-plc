<script>
export default {
  functional: true,
  props: {
    name: String,
    data: Object,
    lineIn: Function,
    lineOut: Number
  },
  render (h, context) {
    return context.props
  }
}
</script>
