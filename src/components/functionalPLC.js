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
    if (!newState) {
      this.shutup()
      return
    }
    this.rollup()
  }
  shutup () {
    clearTimeout(this.timerID)
    this.timerID = null
    this.dataPointer.state = false
  }
  rollup () {
    // prevent repeating trigger when timer is running
    // at this point, newState is true and this.state is false
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
    dataPointer.loop = Boolean(dataPointer.loop)
    dataPointer.pulseSeries = dataPointer.pulseSeries || [0]
  }
  rollup () {
    // prevent multiple trigger when timer is running
    if (this.timerID !== null) { return }
    this.tictak()
  }
  tictak () {
    clearTimeout(this.timerID)
    this.timerID = setTimeout(
      () => {
        this.totalElapse += this.dataPointer.pulseSeries[this.stage]
        this.stage += 1
        // stage and loop control
        if (this.stage === this.dataPointer.pulseSeries.length) {
          this.dataPointer.state = true
          this.timerID = null
          // loop control
          if (this.dataPointer.loop) {
            this.reloadAndGo()
          }
        } else {
          this.tictak()
        }
      },
      this.dataPointer.pulseSeries[this.stage])
  }
  reloadAndGo () {
    // make this function into nextTick(event loop)
    setTimeout(() => {
      this.stage = 0
      this.dataPointer.state = false
      this.rollup()
    }, 0)
  }
  shutup () {
    super.shutup()
    this.totalElapse = 0
    this.stage = 0
  }
}

const Counter = class extends Relay {
  constructor (dataPointer) {
    super(dataPointer)
    this.dataPointer.start = this.dataPointer.start || 0
    this.dataPointer.target = this.datPOinter.target || 0
    this.dataPointer.step = this.dataPointer.step || 1
    this.enable = false
    this.count = this.dataPointer.start
    this.triggerState = false
  }
  lineIn (newState) {
    if (Boolean(newState) === this.toString()) { return }
    this.enable = Boolean(newState)
    if (!this.enable) { this.reset() }
  }
  triggerIn (newTriggerState) {
    if (!this.enable) { return }
    if (Boolean(newTriggerState) === this.triggerState) { return }
    if (!newTriggerState) {
      // neg-eadge, don't trigger
      this.triggerState = false
      return
    }
    // pos-edge, trigger
    this.triggerState = true
    this.count += this.dataPointer.step
    // too complex, like a nightmare, should be reconstruct
  }
  resetIn () {}
  reset () {
    this.num = this.dataPointer.start
  }
}

const maker = {
  Relay,
  Timer,
  AdvTimer,
  Counter
}

export default maker
