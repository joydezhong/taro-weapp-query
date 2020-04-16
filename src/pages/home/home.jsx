import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './home.scss'

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '学生辞典大全'
  }

  bindgetphonenumber(params){
    console.log(params)
  }

  render () {
    const bg = 'https://s1.ax1x.com/2020/04/03/GdELL9.md.jpg'

    return (
      <View className='home-box'>
        <Button className='auth-button' openType='getUserInfo' onGetUserInfoEventDetail={(res)=>this.bindgetphonenumber(res)}>权限</Button>
      </View>
    )
  }
}
