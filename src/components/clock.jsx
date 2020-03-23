import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

export default class Clock extends Component {
  constructor (props) {
    super(props)
    this.state = {
      date: new Date()
    }
  }

  componentDidMount() {
    this.timerID = setInterval(
        () => this.tick(),
        1000
      )
  }

  componentWillUnmount() {
      clearInterval(this.timerID)
  }

  tick () {
    this.setState({
      date: new Date()
    });
  }

  render () {
    return (
      <View>
        <Text>Hello, world!</Text>
        <Text>现在的时间是 {this.state.date.toLocaleTimeString()}</Text>
      </View>
    )
  }
}
