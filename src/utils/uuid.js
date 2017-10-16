// function for create uuid pool, and create uuid for certain pool

const Uid = class {
  constructor () {
    this.currID = 0
  }
  newData (data = {}) {
    this.currID += 1
    this[this.currID] = data
    return this.currID
  }
}

export {
  Uid
}
