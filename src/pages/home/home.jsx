import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './home.scss'
// import { get as getGlobalData, set as setGlobalData } from '../../global_data'

export default class Index extends Component {
  constructor () {
    super(...arguments)
  }

  componentWillMount () {
    Taro.getStorage({
      key: 'userInfo',
      success: function (res) {
        if(res.data) {
          Taro.navigateTo({
            url: '/pages/index/index'
          })
        }
      }
    })

    // wx.cloud.callFunction({
    //   name: 'getKey',
    //   complete: res => {
    //     console.log('callFunction test result: ', res)
    //   }
    // })

  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '学生辞典大全'
  }

  getUserInfo(params){
    if(params.detail && params.detail.userInfo){
      Taro.setStorage({
        key: "userInfo",
        data: params.detail.userInfo
      })
      Taro.navigateTo({
        url: '/pages/index/index'
      })
    }
  }

  render () {
    // const bg = 'https://s1.ax1x.com/2020/04/03/GdELL9.md.jpg'

    return (
      <View className='home-box'>
        <Button className='auth-button' openType='getUserInfo' onGetUserInfo={this.getUserInfo.bind(this)}>权限</Button>
      </View>
    )
  }
}
