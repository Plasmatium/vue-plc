<script>
import Vue from 'vue'
import maker from './functionalPLC'

export default {
  functional: true,
  props: {
    logicParam: Object
  },
  render (h, context) {
    let logicParam = context.props.logicParam
    let transfuncArgs = {...logicParam.INPUT}

    let functionBlocks = logicParam.functionBlocks
    Object.keys(functionBlocks).forEach(blockType => {
      let blockMaker = maker[blockType]
      if (!blockMaker) {
        // TODO warn
        console.log('Error, no such blockType:', blockType)
        return
      }
      let rawBlocks = functionBlocks[blockType]
      Object.keys(rawBlocks).forEach(blockName => {
        if (transfuncArgs[blockName]) {
          // TODO: warn
          console.log('Duplicated blockName:', blockName)
          return
        }
        transfuncArgs[blockName] = blockMaker(rawBlocks[blockName])
      })
    })

    Vue.set(logicParam, 'OUTPUT', logicParam.transfunc(transfuncArgs))
    return
  }
}
</script>
