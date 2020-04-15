import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtCard, AtMessage, AtPagination, AtList, AtListItem } from 'taro-ui'
import './tangPoemResult.scss'
import { jisu_api_, jisu_mine_ } from '../../../config/api'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '唐诗欣赏'
  }

  constructor () {
    super(...arguments)
    this.state = {
      details: {},
      detailLists: [],
      searchWord: '',
      detailid: null
    }
  }

  componentWillMount () {
    //获取路由参数 可能是detailid或者searchWord
    let searchWord = this.$router.params.searchWord
    let detailid = this.$router.params.detailid
    console.log(this.$router.params)
    this.setState({
      searchWord: searchWord,
      detailid: detailid
    })
  }

  componentDidMount () {
    // 如果是id则获取详情 如果是searchWord则获取列表
    const { searchWord, detailid } = this.state
    if (detailid)
      this.getDetails(detailid)
    else if(searchWord){
      this.getLists(searchWord)
    }
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }


  getDetails(id) {
    let url = jisu_api_ + '/tangshi/detail'
    Taro.request({
      url: url,
      data: {appkey: jisu_mine_, detailid: id}
    }).then((res) => {
      console.log(res, 'res')
      if(res.data.status === 0){
        this.setState({ details: res.data.result })}
      else
        Taro.atMessage({ type: 'error', message: res.errMsg })
    }).catch((error) => {
      Taro.atMessage({type: 'error', message: error})
      console.log(error, 'error')
    })
  }

  render () {
    const { details } = this.state
    const icon = 'https://s1.ax1x.com/2020/04/15/JiGhm8.jpg'
    return (
      <View className='search-result-box'>
        <View className='content-box'>
          <AtCard
            note={details.type}
            title='内容'
            thumb={icon}
          >
            <View className='postContent'>
              <View><Text className='title'>{details.title}</Text></View>
              <View><Text className='author'>{details.author}</Text></View>
              <View><Text className='content'>{details.content}</Text></View>
            </View>
          </AtCard>
        </View>
        <View className='content-box'>
          <AtCard
            title='注解'
            thumb={icon}
          >
            <View className='postExplanation'>
              <View><Text className='title'>{details.explanation}</Text></View>
            </View>
          </AtCard>
        </View>
        <View className='content-box'>
          <AtCard
            title='赏析'
            thumb={icon}
          >
            <View className='postExplanation'>
              <View><Text className='title'>{details.appreciation}</Text></View>
            </View>
          </AtCard>
        </View>
      </View>
    )
  }
}
