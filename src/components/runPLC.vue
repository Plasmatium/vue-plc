<script>
export default {
  functional: true,
  props: {
    data: Object
  },
  render (h, context) {
    debugger
    context.props.data.h0.rollup()
  }
}
</script>
