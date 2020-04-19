import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { AtAvatar, AtList, AtListItem } from 'taro-ui'
import './index.scss'
// import { get as getGlobalData } from '../../global_data'

export default class Index extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      userInfo: {}
    }
  }

  config = {
    navigationBarTitleText: '帮助中心'
  }

  // wx转发
  onShareAppMessage (res) {
    return {
      title: '学生辞典大全，学生的学习、查询小助手',
      path: 'pages/mine/index'
    }
  }

  componentWillMount () {
    // let userInfo = getGlobalData('userInfo')
    this.beforeUserinfo()
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  beforeUserinfo(){
    let that = this
    Taro.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setState({
          userInfo: res.data
        })
      }
    })
  }

  getUserInfo(params){
    if(params.detail && params.detail.userInfo){
      Taro.setStorage({
        key: "userInfo",
        data: params.detail.userInfo
      })
      this.setState({
        userInfo: params.detail.userInfo
      })
    }
  }


  handleClick(){
    console.log(0)
  }

  render () {
    const { userInfo } = this.state

    return (
      <View className='help-box'>
        <View className='photo-box'>
          {
            userInfo.nickName ? (<View>
              <AtAvatar className='avatar' circle image={userInfo.avatarUrl}></AtAvatar>
              <Text className='nick'>{userInfo.nickName}</Text>
            </View>) : (<View>
                <Button
                  className='auth-button'
                  openType='getUserInfo'
                  onGetUserInfo={this.getUserInfo.bind(this)}>
                  <AtAvatar className='avatar' circle image=''></AtAvatar>
                  <Text className='nick gray'>点击显示微信头像</Text>
              </Button>
            </View>)
          }
        </View>
        <View className='tool-box'>
          <AtList>
            <AtListItem
              title='我的收藏'
              note='收藏的成语词语诗词曲...'
              arrow='right'
              iconInfo={{ size: 25, color: '#ff4995', value: 'bookmark', }}
              onClick={this.handleClick} />
            <AtListItem
              title='帮助详情'
              note='各类小工具的使用帮助...'
              arrow='right'
              iconInfo={{ size: 25, color: '#78A4FA', value: 'help', }}
              onClick={this.handleClick} />
            <AtListItem
              title='在线客服'
              arrow='right'
              iconInfo={{ size: 25, color: '#8c8c8c', value: 'message', }}
              onClick={this.handleClick} />
            <AtListItem
              title='评分反馈'
              note='您的建议就是我们最大的动力...'
              iconInfo={{ size: 25, color: '#faad14', value: 'star', }}
              arrow='right'
              onClick={this.handleClick} />
            <AtListItem
              title='交流学习'
              arrow='right'
              iconInfo={{ size: 25, color: '#13c2c2', value: 'sketch', }}
              onClick={this.handleClick} />
            <AtListItem
              title='关于'
              arrow='right'
              iconInfo={{ size: 25, color: '#8c8c8c', value: 'tag', }}
              onClick={this.handleClick} />
          </AtList>
        </View>
      </View>
    )
  }
}
