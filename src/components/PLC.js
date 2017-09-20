import RELAY from './RELAY'
import INPUT from './INPUT'

let logicComponents = {RELAY, INPUT}

const make = {
  makeRELAY: (h, {state, name}) => {
    debugger
    let _state = state
    let vnode = <RELAY state={_state} name={name}></RELAY>
    vnode.toString = () => state
    vnode.lineIn = (input) => {
      debugger
      if (!!input === !!_state) { return }
      _state = input
    }
    return vnode
  },
  makeINPUT: (h, {lineIn, name}) => {
    let vnode = <INPUT name={name}></INPUT>
    vnode.toString = () => vnode.lineOut
    vnode.lineIn = (input) => {
      if (!!input === !!vnode.lineOut) { return }
      vnode.lineOut = input
    }
    return vnode
  }
}

const makeVNODE = (h, block) => {
  // block is like {type: 'RELAY', state: false}
  const key = `make${block.type}`
  return make[key](h, block)
}

const makeLogicBlock = (h, param) => {
  debugger
  let blocks = param.blocks
  let vnodes = blocks.map(() => makeVNODE)
  // for (let key in blocks) {
  //   blocks[key].name = key
  //   blocks[key] = makeVNODE(h, blocks[key])
  // }

  return () => param.transfunc(vnodes)
}

export {
  makeLogicBlock,
  logicComponents
}
