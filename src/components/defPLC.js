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
import {Uid} from '../utils/uuid'

let edgeUid = new Uid()

let blockMaker

const INPUT = class {
  constructor (dptr) {
    this.state = false
    this.euid = edgeUid.newData({lastState: this.state})
  }
  toString () {
    return Boolean(this.state)
  }
  lineIn (newState) {
    edgeUid[this.euid].lastState = this.state
    if (Boolean(newState) === this.state) return
    this.state = Boolean(newState)
  }

  // edge calc will just do once for certain, next time lineIn() will
  // rewrite lastState, make it equal to this.state
  // positive edge
  pe () {
    if (edgeUid[this.euid].lastState === false && this.state === true) {
      return true
    } else {
      return false
    }
  }
  // negtive edge
  ne () {
    if (edgeUid[this.euid].lastState === true && this.state === false) {
      return true
    } else {
      return false
    }
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
      this[ioKey] = info.val || false
    })
  }
  energize () {
    Object.entries(this.interface).forEach(([ioKey, info]) => {
      if (!info.path) return
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
