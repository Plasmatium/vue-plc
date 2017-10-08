<script>
import maker from './functionalPLC'
import RELAY from './RELAY'

export default {
  functional: true,
  props: {
    logicParam: Object
  },
  render (h, context) {
    console.time('logicRenderTime')
    console.log('plc rendering whole')
    let logicParam = context.props.logicParam
    let {input, blocks} = logicParam
    let transfuncArgs = {...input, ...blocks}
    console.log(<RELAY></RELAY>)
    logicParam.transfunc(transfuncArgs)
    console.timeEnd('logicRenderTime')
  },
  components: {
    RELAY
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
