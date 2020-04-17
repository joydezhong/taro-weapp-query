import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
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

  componentWillMount () {
    // let userInfo = getGlobalData('userInfo')
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

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleClick(){
    console.log(0)
  }

  render () {
    const { userInfo } = this.state

    return (
      <View className='help-box'>
        <View className='photo-box'>
          <AtAvatar className='avatar' circle image={userInfo.avatarUrl}></AtAvatar>
          <Text className='nick'>{userInfo.nickName}</Text>
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
