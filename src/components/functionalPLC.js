// INPUT, RELAY, TIMER, RESET, SET, PULSE
//

const RELAY = (data) => {
  let rslt = {state: data.state}
  rslt.toString = () => rslt.state
  rslt.lineIn = (newState) => { data.state = newState }
}

const maker = {
  RELAY
}

export default maker
