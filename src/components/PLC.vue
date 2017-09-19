<script>
import RELAY from './RELAY'
RELAY

/*
 * line means line voltage
 */

const makeRELAY = (h, line = false) => {
  let _state = line
  let vnode = <RELAY state={_state}></RELAY>

  vnode.toString = () => !!_state
  vnode.lineIn = (newLine) => {
    if (!!_state === !!newLine) { return }
    _state = newLine
  }
  vnode.lineTo = (targetNode) => {
    targetNode.lineIn(_state)
  }

  return vnode
}

export default {
  functional: true,
  props: {
    input: Array,
    output: Object
  },
  render (h, context) {
    let [in0, in1] = context.props.input
    // TODO makeRelay需要放在props里面，申明放在vue里面
    let i0 = makeRELAY(h, in0)
    let i1 = makeRELAY(h, in1)
    let q0 = makeRELAY(h)
    debugger
    q0.lineIn(!(i0 + 0) * q0 + i1)
    context.props.output.q = q0.toString()
  }
}
</script>
