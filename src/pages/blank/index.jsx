import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

export default class Index extends Component {
  constructor () {
    super(...arguments)
  }

  componentWillMount () {
  //   try {
  //     let value = Taro.getStorageSync('userInfo')
  //     console.log(value,'v')
  //     if (value) {
  //       Taro.navigateTo({
  //         url: '/pages/index/index'
  //       })
  //     }else{
  //       Taro.navigateTo({
  //         url: '/pages/home/home'
  //       })
  //     }
  //   } catch (e) {
  //     console.log(e,'e')
  //     // Do something when catch error
  //   }
  //
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: ''
  }

  render () {
    return (
      <View className='blank-box'></View>
    )
  }
}
