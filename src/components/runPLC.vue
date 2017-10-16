<script>
global.g = 0

export default {
  functional: true,
  props: {
    data: Object
  },
  render (h, context) {
    // below for data
    // console.time('start logic rendering')
    // let data = context.props.data
    // data.energize()
    // data.rollup()
    // data.Q.lineIn(data.h0.Q.state)
    // console.timeEnd('start logic rendering')

    // below for data2
    let data = context.props.data
    console.log(global.g)
    // 改变data.i0，无法触发render()
    if (global.g >= 20) {
      console.timeEnd('test')
      global.g = 0
      return
    } else {
      console.time('test')
    }
    data.energize()
    data.q0.lineIn(data.q0 ^ 1)
    data.Q.lineIn(data.q0 + data.i0)
    global.g += 1
  }
}
</script>
