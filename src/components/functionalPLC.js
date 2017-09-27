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
    if (Boolean(newState) && this.timerID === null) {
      this.timerID = setTimeout(() => {
        this.timerID = null // status changed
        this.dataPointer.state = true // status changed
      }, this.dataPointer.timeout || 0)
    } else if (Boolean(newState) === false) {
      if (typeof this.timerID === 'number') {
        clearTimeout(this.timerID)
        this.timerID = null // status changed
      }
      this.dataPointer.state = false  // status changed
    }
  }
}

const AdvTimer = class extends Timer {
  constructor (dataPointer) {
    super(dataPointer)
    this.timeBox = []
  }
}

const maker = {
  Relay,
  Timer,
  AdvTimer
}

export default maker
