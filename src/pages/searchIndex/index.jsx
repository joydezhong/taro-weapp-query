import Taro, { Component } from '@tarojs/taro'
import { View} from '@tarojs/components'
import { AtIndexes  } from 'taro-ui'
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

  componentWillMount () {
    //获取路由参数
    let params = this.$router.params && this.$router.params.option
    console.log(params,'route params')
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
    let url  = zidian_api;
    if(this.state.routerParam === 'pinyin')
      url += '/xhzd/pinyin'
    else if(this.state.routerParam === 'bushou')
      url += '/xhzd/bushou'
    console.log(url)
    Taro.request({
      url: url,
      data: { key: zidian_mine }
    }).then((res)=>{
      this.formatting(res.data.result) //格式化
    }).catch((error)=>{
      console.log(error,'error')
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

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
      <View className='search-index-box'>
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
