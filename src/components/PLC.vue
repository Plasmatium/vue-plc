<script>
import maker from './functionalPLC'

export default {
  functional: true,
  props: {
    logicParam: Object
  },
  render (h, context) {
    console.time('logicRenderTime')
    let logicParam = context.props.logicParam
    let {input, blocks} = logicParam
    let transfuncArgs = {...input, ...blocks}
    logicParam.transfunc(transfuncArgs)
    console.timeEnd('logicRenderTime')
  },

  // other function
  initLogicParam (param) {
    let blocks = {}
    param.blocksParam.forEach(blockParam => {
      let BlockMaker = maker[blockParam.type]
      let block = new BlockMaker(blockParam)
      blocks[blockParam.name] = block
    })
    param.blocks = blocks
    return param
  }
}
</script>
