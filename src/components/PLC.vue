<script>
import maker from './functionalPLC'

export default {
  functional: true,
  props: {
    logicParam: Object
  },
  render (h, context) {
    debugger
    let logicParam = context.props.logicParam
    let transfuncArgs = {...logicParam.input}

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

    transfuncArgs
    return
  }
}
</script>
