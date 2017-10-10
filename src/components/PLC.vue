<script>
// import store from '../store'
// window.store = store
// let n = 0

export default {
  functional: true,
  props: {
    logicParam: Object
  },
  render (h, context) {
    // console.log(n)
    // n += 1
    console.time('logicRenderTime')
    let logicParam = context.props.logicParam
    let {input, blocks} = logicParam
    let transfuncArgs = {...input, ...blocks}
    logicParam.transfunc(transfuncArgs)
    console.timeEnd('logicRenderTime')
  },
  components: {}
}
</script>
