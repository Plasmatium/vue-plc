<script>
import store from '../store'
window.store = store

export default {
  functional: true,
  props: {
    name: String,
    param: Object
  },
  render (h, context) {
    console.log('count invoked in RELAY:', store.state.count)
  }
}
</script>
