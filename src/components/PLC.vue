<script>
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

    // OUTPUT初始值必须是undefined作为标记，初次使用进行reactive化，
    // 后面直接Object.assign，避免reactive死循环。
    // 此方式存在缺陷，因为只能在output里面放简单值，不能放Object类型。
    let output = logicParam.transfunc(transfuncArgs)
    if (logicParam.OUTPUT === undefined) {
      logicParam.OUTPUT = output
    } else {
      Object.assign(logicParam.OUTPUT, output)
    }
  }
}
</script>
