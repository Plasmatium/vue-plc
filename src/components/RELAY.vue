<script>
export default {
  functional: true,
  props: {
    name: String,
    data: Object
  },
  render (h, context) {
    let data = context.props.data
    if (data.en === data.state) return
    // type of data.en should be Boolean, ensure it by data obj's lineIn()
    data.lastState = data.state
    data.state = data.en
  }
}
</script>