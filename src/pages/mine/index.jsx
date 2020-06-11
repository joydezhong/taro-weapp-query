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

  componentWillMount () {
    // let userInfo = getGlobalData('userInfo')
    this.beforeUserinfo()
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '帮助中心'
  }

  // wx转发
  onShareAppMessage () {
    return {
      title: '学生辞典大全，学生的学习、查询小助手',
      path: 'pages/mine/index'
    }
  }

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

  handleClick(params){
    Taro.navigateTo({
      url: `/pages/mine/details?option=${params}`
    })
  }

  handleContact (e) {
    console.log(e.detail.path)
    console.log(e.detail.query)
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
                  onGetUserInfo={this.getUserInfo.bind(this)}
                >
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
              onClick={()=>{this.handleClick('collect')}} 
            />
            <AtListItem
              title='帮助详情'
              note='各类小工具的使用帮助...'
              arrow='right'
              iconInfo={{ size: 25, color: '#78A4FA', value: 'help', }}
              onClick={()=>{this.handleClick('help')}} 
            />
            <View className='contact-view'>
              <AtListItem
                title='在线客服'
                arrow='right'
                iconInfo={{ size: 25, color: '#8c8c8c', value: 'message', }}
                className='contract-item'
              />
              {
                userInfo.nickName ? (<Button
                  className='contact-button'
                  openType='contact'
                  onContact={this.handleContact.bind(this)}
                >
                  客服
                </Button>) : (
                <Button
                  className='contact-button'
                  openType='getUserInfo'
                  onGetUserInfo={this.getUserInfo.bind(this)}
                >
                  登录体验
                </Button>)
              }
            </View>
            <View className='feedback-view'>
              <AtListItem
                title='意见反馈'
                note='您的建议就是我们最大的动力...'
                iconInfo={{ size: 25, color: '#faad14', value: 'star', }}
                arrow='right'
              />
              <Button
                className='feedback-button'
                openType='feedback'
              >
                反馈
              </Button>
            </View>
            {/*<AtListItem*/}
            {/*  title='交流学习'*/}
            {/*  arrow='right'*/}
            {/*  iconInfo={{ size: 25, color: '#13c2c2', value: 'sketch', }}*/}
            {/*  onClick={this.handleClick} />*/}
            <AtListItem
              title='关于'
              arrow='right'
              iconInfo={{ size: 25, color: '#8c8c8c', value: 'tag', }}
              onClick={()=>{this.handleClick('about')}} 
            />
          </AtList>
        </View>
      </View>
    )
  }
}
