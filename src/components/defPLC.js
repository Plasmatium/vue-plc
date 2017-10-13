`
data = initData({
  type: 'RELAY',
  state: false, // optional
  lastState: false // optional
})
- - - - - - - - - in Holder - - - - - - - -
interface is:
  {
    EN: {type: 'INPUT'},
    RST: {type: 'INPUT'},
    Q: {type: 'RELAY'}
  }
  
data generated like:
  {
    EN: false
    RST: false
    Q: {
      state: false,
      lastState: false,
      lineIn: [[Function]],
      toString: [[Function]]
    }
  }
`
import objectPath from 'object-path'

let blockMaker

const INPUT = class {
  constructor (dptr) {
    this.state = false
  }
  toString () {
    return Boolean(this.state)
  }
  lineIn (newState) {
    if (Boolean(newState) === this.state) return
    this.state = Boolean(newState)
  }
}
// TODO: pe & ne should be a closure
const RELAY = class extends INPUT {}

const BaseBlock = class {
  constructor (dptr) {
    Object.entries(dptr.params).forEach(([blockName, blockDptr]) => {
      let M = blockMaker[blockDptr.type]
      this[blockName] = new M(blockDptr)
    })
    this.Q = new RELAY()
  }
  toString () {
    return Boolean(this.Q)
  }
  rollup () {
    for (let blockName in this) {
      this[blockName].rollup && this[blockName].rollup()
    }
  }
}

const BLOCK = class extends BaseBlock {
  constructor (block) {
    super(block)
    if (!block.interface) return
    this.interface = block.interface
    Object.entries(block.interface).forEach(([ioKey, info]) => {
      this[ioKey] = info.val
    })
  }
  energize () {
    Object.entries(this.interface).forEach(([ioKey, info]) => {
      objectPath.get(this, info.path).lineIn(this[ioKey])
    })
  }
}

const HOLDER = class extends BaseBlock {
  static dptr = {
    params: {
      EN: {type: 'INPUT'},
      RST: {type: 'INPUT'},
      Q: {type: 'RELAY'}
    }
  }
  constructor (dptr) {
    super(HOLDER.dptr)
  }
  rollup () {
    let {EN, RST, Q} = this
    Q.lineIn((RST ^ 1) * Q + EN)
  }
}

// const initData = (dptr) => {
//   Object.entries(dptr.params).forEach(([blockName, blockDptr]) => {
//     debugger
//     let M = blockMaker[blockDptr.type]
//     this[blockName] = new M(blockDptr)
//   })
// }

blockMaker = {
  INPUT,
  RELAY,
  BLOCK,
  HOLDER
}

export {
  // initData,
  BLOCK,
  blockMaker
}
