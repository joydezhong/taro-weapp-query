import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import Wecome from '../../components/wecome'
import Clock from '../../components/clock'

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '测试页'
  }

  render () {
    const numbers = [...Array(100).keys()]
    const numberLists = numbers.map((i)=>{
      return <Text style={{display: 'block'}} key={ String(i) }>这是第{ i + 1 }个数字</Text>
    })

    return (
      <View className='index'>
        <Text>Hello test!</Text>
        <Wecome name='fde' />
        <Clock />
        { numberLists }
      </View>
    )
  }
}
