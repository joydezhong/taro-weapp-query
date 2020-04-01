import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Icon, Image } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import './index.scss'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '搜索查询'
  }

  constructor () {
    super(...arguments)
    this.state = {
      value: '',
      actionName: '搜索',

    }
  }

  componentWillMount () {
    //获取路由参数
    console.log(this.$router.params)
    let params = this.$router.params && this.$router.params.option
    if(params === 'pinyin')
      this.setState({ actionName: '拼音搜索' })
    else if(params === 'bushou')
      this.setState({ actionName: '部首搜索' })
    else if(params === 'hanzi')
      this.setState({ actionName: '汉字搜索' })
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onChange (value) {
    this.setState({
      value: value.target.value
    })
  }
  onActionClick () {
    console.log('开始搜索')
  }

  render () {
    return (
      <View className='search-result-box'>
        <View className='top-tool'>
          <AtSearchBar
            showActionButton
            value={this.state.value}
            actionName={this.state.actionName}
            onChange={(e)=>{this.onChange(e)}}
            onActionClick={(e)=>{this.onActionClick(e)}}
          />
        </View>
      </View>
    )
  }
}
