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
  }
}

const Timer = class extends Relay {
  constructor (dataPointer) {
    super(dataPointer)
    this.timerID = null
  }
  lineIn (newState) {
    if (Boolean(newState) === this.toString()) { return }
    if (newState) {
      this.rollup()
    } else {
      this.shutup()
    }
  }
  shutup () {
    clearTimeout(this.timerID)
    this.timerID = null
    this.dataPointer.state = false
  }
  rollup () {
    if (this.timerID !== null) { return }
    this.timerID = setTimeout(() => {
      this.timerID = null // status changed
      this.dataPointer.state = true // status changed
    }, this.dataPointer.timeout || 0)
  }
}

const AdvTimer = class extends Timer {
  constructor (dataPointer) {
    super(dataPointer)
    this.stage = 0
    this.totalElapse = 0
  }
  lineIn (newState) {
    if (Boolean(newState) === this.toString()) { return }
    if (Boolean(newState) === false) {}
  }
}

const maker = {
  Relay,
  Timer,
  AdvTimer
}

export default maker
