import Taro, { Component } from '@tarojs/taro'
import { View, Text, RichText } from '@tarojs/components'
import { AtCard } from 'taro-ui'
import './tangPoemResult.scss'
import { jisu_api_, jisu_mine_ } from '../../../config/api'
import { get as getGlobalData } from '../../global_data'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '诗词曲欣赏'
  }

  constructor () {
    super(...arguments)
    this.state = {
      details: {},
      detailLists: [],
      option: '',
      detailid: null
    }
  }

  componentWillMount () {
    //获取路由参数 detailid和option
    let option = this.$router.params.option
    let detailid = this.$router.params.detailid
    this.setState({
      option: option,
      detailid: detailid
    })
  }

  componentDidMount () {
    this.getDetails()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }


  getDetails() {
    const { option ,detailid } = this.state
    let url = ''
    if(this.state.option === 'tang'){
      url = jisu_api_ + '/tangshi/detail'
    }else if(this.state.option === 'song'){
      url = jisu_api_ + '/songci/detail'
    }else if(this.state.option === 'yuan'){
      url = jisu_api_ + '/yuanqu/detail'
    }
    // let url = jisu_api_ + '/tangshi/detail'
    if(detailid){ // 做detailid判断
      Taro.request({
        url: url,
        data: {appkey: jisu_mine_, detailid: detailid}
      }).then((res) => {
        if(res.data.status === 0){
          this.setState({ details: res.data.result })}
        else
          Taro.atMessage({ type: 'error', message: res.errMsg })
      }).catch((error) => {
        Taro.atMessage({type: 'error', message: error})
      })
    }else{
      // 读取全局数据
      let details = getGlobalData('searchData')
      this.setState({
        details: details
      })
    }

  }

  render () {
    const { details, option } = this.state
    let icon = '', dynasty = ''
    if(option === 'tang'){
      icon = 'https://s1.ax1x.com/2020/04/15/JiGhm8.jpg'
      dynasty = '唐'
    }else if(option === 'song'){
      icon = 'https://s1.ax1x.com/2020/04/15/JiG40S.jpg'
      dynasty = '宋'
    }else if(option === 'yuan'){
      icon = 'https://s1.ax1x.com/2020/04/15/JiG5Tg.jpg'
      dynasty = '元'
    }

    return (
      <View className='search-result-box'>
        <View className='content-box content-box-f'>
          <AtCard
            note={details.type}
            title='内容'
            thumb={icon}
          >
            <View className={dynasty==='唐'?'postContent':'postContent postContentLeft'}>
              <View><Text className='title'>{details.title}</Text></View>
              <View><Text className='author'>{details.author}</Text></View>
              <View>
                <RichText className='content' nodes={details.content}></RichText>
              </View>
            </View>
          </AtCard>
        </View>
        { details.explanation && (<View className='content-box'>
          <AtCard
            title='注解'
            thumb={icon}
          >
            <View className='postExplanation'>
              <View><RichText className='explanation' nodes={details.explanation}></RichText></View>
            </View>
          </AtCard>
        </View>)}
        { details.translation && (<View className='content-box'>
          <AtCard
            title='译文'
            thumb={icon}
          >
            <View className='postTranslation'>
              <View><RichText className='translation' nodes={details.translation}></RichText></View>
            </View>
          </AtCard>
        </View>)}
        { details.appreciation && (<View className='content-box'>
          <AtCard
            title='赏析'
            thumb={icon}
          >
            <View className='postAppreciation'>
              <View><RichText className='appreciation' nodes={details.appreciation}></RichText></View>
            </View>
          </AtCard>
        </View>)}
      </View>
    )
  }
}
