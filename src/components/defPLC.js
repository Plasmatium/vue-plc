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
let blockMaker

const INPUT = class {
  constructor (dptr) {
    this.state = Boolean(dptr.state) || false
    this.lastState = dptr.lastState || dptr.state
  }
  toString () {
    return Boolean(this.state)
  }
  lineIn (newState) {
    if (Boolean(newState) === this.state) return
    this.lastState = this.state
    this.state = Boolean(newState)
  }
  pe () {
    if (!this.lastState && this.state) return true
    else return false
  }
  ne () {
    if (this.lastState && !this.state) return true
    else return false
  }
}
const RELAY = INPUT

const HOLDER = class {
  constructor (dptr) {
    // running here, dptr = {type: "HOLDER"}
    // EN, RST, Q should init here, dptr should {type: "HOLDER", data: {...}}
    // dataInit(dptr, this)
    this
  }
  rollup () {
    let {EN, RST, Q} = this
    Q.lineIn((RST ^ 1) * Q + EN)
  }
}

blockMaker = {
  INPUT,
  RELAY,
  HOLDER
}

const dataInit = (data, target = {}) => {
  for (let blockName in data) {
    debugger
    let M = blockMaker[data[blockName].type]
    target[blockName] = new M(data[blockName])
  }
  return target
}

export {
  dataInit
}
