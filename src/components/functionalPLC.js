// INPUT, RELAY, TIMER, RESET, SET, PULSE
//

const Relay = class {
  constructor (dataPointer) {
    this.dataPointer = dataPointer
    this.dataPointer.state = Boolean(this.dataPointer.state)
  }
  toString () {
    return Boolean(this.dataPointer.state)
  }
  lineIn (newState) {
    if (Boolean(newState) !== this.toString()) {
      this.dataPointer.state = Boolean(newState)
    }
    return this.dataPointer.state
  }
}

const Timer = class extends Relay {
  constructor (dataPointer) {
    super(dataPointer)
    this.timerID = null
  }
  lineIn (newState) {
    if (Boolean(newState) && !~~(this.dataPointer.state)) {
      this.timerID = setTimeout(() => {
        this.timerID = null
        this.dataPointer.state = true
      }, this.dataPointer.timeout || 0)
    } else if (Boolean(newState) === false) {
      if (typeof this.timerID === 'number') {
        clearTimeout(this.timerID)
      }
      super.lineIn(newState)
    }
    return this.dataPointer.state
  }
}

const maker = {
  Relay,
  Timer
}

export default maker
