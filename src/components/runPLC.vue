<script>
export default {
  functional: true,
  props: {
    data: Object
  },
  render (h, context) {
    console.time('start logic rendering')
    let data = context.props.data
    data.energize()
    data.rollup()
    data.Q.lineIn(data.h0.Q.state)
    console.timeEnd('start logic rendering')
  }
}
</script>
