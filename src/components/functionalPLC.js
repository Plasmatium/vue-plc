// INPUT, RELAY, TIMER, RESET, SET, PULSE
//

const RELAY = (data) => {
  let rslt = {state: data.state}
  rslt.toString = () => rslt.state
  rslt.lineIn = (newState) => {
    console.log(data.state, newState)
    data.state = !!newState
  }
  return rslt
}

const maker = {
  RELAY
}

export default maker
