<script>
import RELAY from './RELAY.vue'

function test () {
  return <RELAY></RELAY>
}

export default {
  functional: true,
  props: {
    transfer: Object,
    in: Array,
    out: Object
  },
  render (h, context) {
    console.log(context)
    let relay1 = test()
    return relay1
  },
  component: {
    RELAY
  }
}
</script>