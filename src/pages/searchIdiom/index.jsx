import Taro, { Component } from '@tarojs/taro'
import { AtMessage } from 'taro-ui'
import { View, Text, Input, Icon, Image } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '成语词典'
  }

  constructor () {
    super(...arguments)
    this.state = {
      value: '',
      option: ''
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Text>Hello words!</Text>
      </View>
    )
  }
}
