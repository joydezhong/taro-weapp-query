import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtSearchBar, AtMessage, AtAccordion, AtList, AtListItem } from 'taro-ui'
import './index.scss'
import { zidian_api, zidian_mine } from '../../../config/api'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '搜索结果'
  }

  constructor () {
    super(...arguments)
    this.state = {
      value: '',
      actionName: '搜索',
      routerOption: null,
      details: {},
      open: false
    }
  }

  componentWillMount () {
    //获取路由参数
    let params = this.$router.params.option
    let word = this.$router.params.word
    console.log(this.$router.params)
    this.setState({
      routerOption: params,
      searchWord: word,
      actionName: '搜索' })
  }

  componentDidMount () {
    const {searchWord} = this.state
    if (searchWord)
      this.getDetails(searchWord)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onChange (value) {
    this.setState({
      searchWord: value.target.value
    })
  }
  onActionClick () {
    console.log('开始搜索')
  }
  getDetails(word){
    let url  = zidian_api + '/xhzd/query'
    Taro.request({
      url: url,
      data: { key: zidian_mine, word: word }
    }).then((res)=>{
      if(res.statusCode === 200)
        this.setState({ details: res.data.result })
      else
        Taro.atMessage({ type: 'error', message: res.errMsg })
    }).catch((error)=>{
      Taro.atMessage({ type: 'error', message: error })
      console.log(error,'error')
    })
  }
  handleClick (value) {
    this.setState({
      open: value
    })
  }

  render () {
    const { details } = this.state
    return (
      <View className='search-result-box'>
        <AtMessage />
        <View className='top-tool'>
          <AtSearchBar
            showActionButton
            value={this.state.searchWord}
            actionName={this.state.actionName}
            onChange={(e)=>{this.onChange(e)}}
            onActionClick={(e)=>{this.onActionClick(e)}}
          />
        </View>
        <View className='details-box'>
          <View className='base-details at-row at-row__justify--center'>
            <View className='at-col at-col-4'>
              <View className='detail-font'>{details.zi}</View>
            </View>
            <View className='at-col at-col-8'>
              <View className='details-p-box'>
                <View className='detail-p'>
                  <Text className='detail-p-title'>拼音: </Text><Text className='detail-p-content'>{details.py}</Text>
                  <Text className='detail-p-title'>五笔: </Text><Text className='detail-p-content'>{details.wubi}</Text>
                </View>
                <View className='detail-p'>
                  <Text className='detail-p-title'>部首: </Text><Text className='detail-p-content'>{details.bushou}</Text>
                  <Text className='detail-p-title'>笔画: </Text><Text className='detail-p-content'>{details.bihua}</Text>
                </View>
                <View className='detail-p'>
                  <Text className='detail-p-title'>读音: </Text><Text className='detail-p-content'>{details.pinyin}</Text>
                  {/*<Text className='detail-p-title'>笔顺: </Text><Text className='detail-p-content'>{}</Text>*/}
                </View>
              </View>
            </View>
          </View>
          <AtAccordion
            open={this.state.open}
            onClick={this.handleClick.bind(this)}
            title='简解'
            icon={{ value: 'tag' }}
          >
            <AtList hasBorder={false}>
              <AtListItem
                title='标题文字'
              />
              <AtListItem
                title='标题文字'
                note='描述信息'
              />
              <AtListItem
                title='标题文字'
                note='描述信息'
                extraText='详细信息'
              />
            </AtList>
          </AtAccordion>
          {/*<View className='simple-details'>*/}

          {/*</View>*/}
          {/*<View className='full-details'>*/}

          {/*</View>*/}
        </View>
      </View>
    )
  }
}
