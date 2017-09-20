// This file is deprecated
import RELAY from './RELAY'
import INPUT from './INPUT'
import Vue from 'Vue'

let logicComponents = {RELAY, INPUT}

const make = {
  makeRELAY: (h, {data, name}) => {
    Vue.set(data, 'state', data.state || 0)
    window.data = data
    let vnode = <RELAY data={data} name={name}></RELAY>
    vnode.toString = () => vnode.data.state
    vnode.lineIn = (input) => {
      // if (!!input === !!data.state) { return }
      data.state = input
    }
    return vnode
  },
  makeINPUT: (h, {input, name}) => {
    // use INPUT to be responsive
    let vnode = <INPUT name={name}></INPUT>
    vnode.toString = () => input[name]
    return vnode
  }
}

const makeVNODE = (h, block) => {
  // block is like {type: 'RELAY', state: false}
  let maker = make[`make${block.type}`]
  if (!maker) {
    throw Error(`block type unknow: ${block.type}`)
  }
  Vue.set(block, 'data', block.data || {})
  return maker(h, block)
}

const makeLogicBlock = (h, param) => {
  let blocks = param.blocks
  let input = param.input

  let vnodes = blocks.map(block => {
    return makeVNODE(h, block)
  })

  let logicMap = {}
  Object.keys(input).map(name => {
    if (logicMap[name]) {
      throw Error(`logicMap name duplicated: ${name}`)
    }
    let maker = make['makeINPUT']
    logicMap[name] = maker(h, {input, name})
  })

  vnodes.forEach(vnode => {
    let name = vnode.name
    if (logicMap[name]) {
      throw Error(`logicMap name duplicated: ${name}`)
    }
    logicMap[name] = vnode
  })

  Vue.set(param, 'output', logicMap)
  // return () => vnodes
}

export {
  makeLogicBlock,
  logicComponents
}
