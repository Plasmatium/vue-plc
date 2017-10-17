<script>
export default {
  functional: true,
  props: {
    data: Object
  },
  render (h, context) {
    context.props.data.energize()
    // global.count = global.count || 1
    // if (global.count === 1) { console.time('logic time') }
    // if (global.count === 1000) {
    //   console.timeEnd('logic time')
    //   global.count = 1
    //   return
    // }
    // context.props.data.q0.lineIn(context.props.data.q0 ^ 1)
    // context.props.data.Q.lineIn(context.props.data.q0 + 0)
    // global.count += 1
  }
}
</script>
