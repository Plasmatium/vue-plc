<script>
import {mapState} from 'vuex'

export default {
  // functional: true,
  props: {
    name: String,
    param: Number
  },
  computed: {
    ...mapState(['timer'])
  },
  render (h, context) {
    console.log('timer invoked in RELAY:', this.timer)
  }
}
</script>
