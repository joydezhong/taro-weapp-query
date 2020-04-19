import Taro, { Component } from '@tarojs/taro'
import { View} from '@tarojs/components'
import {AtIndexes, AtMessage} from 'taro-ui'
import './index.scss'
import { zidian_api, zidian_mine } from '../../../config/api'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '搜索查询'
  }

  constructor () {
    super(...arguments)
    this.state = {
      titleText: '',
      routerParam: null,
      allPinYin: []
    }
  }

  // wx转发
  onShareAppMessage (res) {
    return {
      title: '新华字典，勤查字典是一种人生态度！',
      path: `pages/searchIndex/index?option=${this.state.routerParam}`
    }
  }

  componentWillMount () {
    //获取路由参数
    let params = this.$router.params && this.$router.params.option
    let titleText
    if(params === 'pinyin')
      titleText = '字母拼音索引'
    else if(params === 'bushou')
      titleText = '笔画部首索引'

    this.setState({
      routerParam: params,
      titleText: titleText
    })
  }

  componentDidMount () {
    const { routerParam } = this.state
    Taro.getStorage({
      key: routerParam,
      success: (res)=>{
        console.log('缓')
        this.formatting(res.data)
      },
      fail: (res)=>{
        this.loadServerData()
      }
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  loadServerData(){
    const { routerParam } = this.state
    let url  = zidian_api;
    if(routerParam === 'pinyin')
      url += '/xhzd/pinyin'
    else if(routerParam === 'bushou')
      url += '/xhzd/bushou'

    Taro.request({
      url: url,
      data: { key: zidian_mine }
    }).then((res)=>{
      this.formatting(res.data.result)  //格式化
      Taro.setStorage({                 //缓存拼音部首数据
        key: routerParam,
        data: res.data.result
      })
    }).catch((error)=>{
      Taro.atMessage({ type: 'error', message: error })
    })
  }

  onClick (item) {
    const { routerParam } = this.state
    Taro.navigateTo({
      url: `/pages/searchTextLists/index?option=${routerParam}&name=${item.name}`
    })
  }

  formatting(res){
    let dataArray = []
    let initCharacter = ''
    res.forEach((e,i)=>{
      let itemObject = {}
      itemObject.title = e.pinyin_key || e.bihua
      itemObject.key = e.pinyin_key || e.bihua
      itemObject.items = res.filter(item => (item.pinyin_key||item.bihua) === (e.pinyin_key||e.bihua))
      itemObject.items.map((item,index,array)=>{
        item.name = item.pinyin||item.bushou
      })
      if(initCharacter != (e.pinyin_key||e.bihua)){
        dataArray.push(itemObject)
        initCharacter = e.pinyin_key||e.bihua
      }
    })
    this.setState({ allPinYin: dataArray })
  }

  render () {
    const { allPinYin, titleText } = this.state
    return (
      <View className='search-index-box' style='height:100vh'>
        <AtMessage />
        <AtIndexes
          list={allPinYin}
          topKey='↑'
          onClick={this.onClick.bind(this)}
        >
          <View className='cus-text'>{titleText}</View>
        </AtIndexes>
      </View>
    )
  }
}
