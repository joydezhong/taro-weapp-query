import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'
import './home.scss'
// import { get as getGlobalData, set as setGlobalData } from '../../global_data'

export default class Index extends Component {
  constructor () {
    super(...arguments)
    this.state= {
      isAuth: false
    }
  }

  componentWillMount () {
    // Taro.getStorage({
    //   key: 'userInfo',
    //   success: function (res) {
    //     if(res.data) {
    //       Taro.navigateTo({
    //         url: '/pages/index/index'
    //       })
    //     }
    //   }
    // })

    this.handleOpenPage()

    // wx.cloud.callFunction({
    //   name: 'getKey',
    //   complete: res => {
    //     console.log('callFunction test result: ', res)
    //   }
    // })

  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
    this.handleOpenPage()
  }

  handleOpenPage(){
    let value = Taro.getStorageSync('userInfo')
    if (value) {
      Taro.navigateTo({
        url: '/pages/index/index'
      })
      this.setState({
        isAuth: true
      })
    }else{
      this.setState({
        isAuth: false
      })
    }
  }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '登录体验'
  }

  // wx转发
  onShareAppMessage (res) {
    return {
      title: '学生辞典大全，学生的学习、查询小助手',
      path: '/page/home/home'
    }
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
      <View>
        {
          this.state.isAuth ? (
            <AtActivityIndicator mode='center' content='加载中...'></AtActivityIndicator>
          ) : (
            <View className='home-box'>
              <Button
                className='auth-button'
                openType='getUserInfo'
                onGetUserInfo={this.getUserInfo.bind(this)}>权限</Button>
            </View>
        )
        }
      </View>
    )
  }
}
