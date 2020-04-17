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
      openJian: true,
      openXiang: false,
      isDisplayDetails: false
    }
  }

  componentWillMount () {
    //获取路由参数
    let params = this.$router.params.option
    let word = this.$router.params.word
    this.setState({
      routerOption: params,
      searchWord: word,
      actionName: '搜索'
    })
  }

  componentDidMount () {
    const {searchWord} = this.state
    if (searchWord)
      this.getDetails(searchWord)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onActionClick () {
    const { searchWord } = this.state
    this.getDetails(searchWord)
  }
  onChange (value) {
    this.setState({
      searchWord: value
    })
  }
  getDetails(word){
    let url  = zidian_api + '/xhzd/query'
    Taro.request({
      url: url,
      data: { key: zidian_mine, word: word }
    }).then((res)=>{
      if(res.statusCode === 200){
        this.setState({ details: res.data.result, isDisplayDetails: true })}
      else
        Taro.atMessage({ type: 'error', message: res.errMsg })
    }).catch((error)=>{
      Taro.atMessage({ type: 'error', message: error })
    })
  }
  handleClickJian (value) {
    this.setState({
      openJian: value
    })
  }
  handleClickXiang (value) {
    this.setState({
      openXiang: value
    })
  }
  handleClear () {
    this.setState({ searchWord: '' })
  }

  render () {
    const { details, searchWord, actionName, isDisplayDetails } = this.state
    return (
      <View className='search-result-box'>
        <AtMessage />
        <View className='top-tool'>
          <AtSearchBar
            showActionButton
            value={searchWord}
            actionName={actionName}
            placeholder='请输入要查询的汉字...'
            onChange={this.onChange.bind(this)}
            onActionClick={this.onActionClick.bind(this)}
            onClear={this.handleClear.bind(this)}
          />
        </View>
        {
          isDisplayDetails && (<View className='details-box'>
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
            open={this.state.openJian}
            onClick={this.handleClickJian.bind(this)}
            title='简解'
            icon={{ value: 'tag' }}
          >
            <AtList hasBorder={false} className='jie-box'>
              {
                details.jijie.map((item, index)=>{
                  return (
                    <View className='list-text' key={index}>
                      <Text>{index+1}. {item}</Text>
                    </View>
                  )
                })
              }
            </AtList>
          </AtAccordion>
          <AtAccordion
            open={this.state.openXiang}
            onClick={this.handleClickXiang.bind(this)}
            title='详解'
            icon={{ value: 'tag' }}
          >
            <AtList hasBorder={false} className='jie-box'>
              {
                details.xiangjie.map((item, index)=>{
                  return (
                    <View className='list-text' key={index}>
                      <Text>{index+1}. {item}</Text>
                    </View>
                  )
                })
              }
            </AtList>
          </AtAccordion>
          {/*<View className='simple-details'>*/}

          {/*</View>*/}
          {/*<View className='full-details'>*/}

          {/*</View>*/}
        </View>)
        }
      </View>
    )
  }
}
