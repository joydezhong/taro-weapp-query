import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtCard } from 'taro-ui'
import './details.scss'

export default class Index extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      titleText: '',
      option: '',
      open: false
    }
  }

  config = {
    navigationBarTitleText: '帮助中心'
  }

  // wx转发
  onShareAppMessage (res) {
    return {
      title: '学生辞典大全，学生的学习、查询小助手',
      path: `pages/mine/details?option=${this.state.option}`
    }
  }

  componentWillMount () {
    let option = this.$router.params.option
    let titleText = ''
    console.log(option, 'params')
    if(option === 'collect'){
      titleText = '我的收藏'
    }else if(option === 'help'){
      titleText = '帮助详情'
    }else if(option === 'service'){
      titleText = '在线客服'
    }else if(option === 'feedback'){
      titleText = '意见反馈'
    }else if(option === 'about'){
      titleText = '关于'
    }
    this.setState({
      option: option,
      titleText: titleText
    })
    Taro.setNavigationBarTitle({
      title: titleText
    }).then(r => {
      console.log(r)
    })
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleClick (value) {
    this.setState({
      open: value
    })
  }

  render () {
    const { option } = this.state
    return (
      <View className='detail-box'>
        {
          option === 'collect' && (
            <View className='collect-box'>
              <AtCard
                title='我的收藏'
                className='at-card-box'
              >
                <View>空空如也，快去收藏吧！</View>
              </AtCard>
            </View>
          )
        }
        {
          option === 'help' && (
            <View className='help-box'>
              <AtCard
                title='新华字典'
                className='at-card-box'
              >
                新华字典，用于查询汉字的拼音、部首、笔画、笔顺、词组、词组释义等，用户可以通过界面输入框直接搜索，多个关键字的情况下默认选取第一个汉字，也可以选择“拼音”、“部首”进入到拼音或者部首索引页面，通过拼音或者部首来查询汉字，然后在文字列表页面选择对应的文字查询相应的结果。
              </AtCard>
              <AtCard
                title='成语词典'
                className='at-card-box'
              >
                成语词典，用于查询成语的拼读、释义、出自、语法、引证举例、近反义词等，用户可以通过界面输入成语精准的搜索到需要的结果。
              </AtCard>
              <AtCard
                title='汉语词典'
                className='at-card-box'
              >
                汉语词典，用于查询汉语词组的拼读、解释、出自、举例、近反义词、对应英文等，用户可以通过界面输入词语精准的搜索到需要的结果。
              </AtCard>
              <AtCard
                title='唐诗宋词元曲'
                className='at-card-box'
              >
                诗词曲菜单，用于查询并欣赏唐诗宋词和元曲，这里有你熟悉的李白、杜甫，也有你熟悉的浪淘沙、清平乐，用户可以通过界面输入诗句或诗人精准的搜索到需要的结果，也可以在搜索框下面选择自己喜欢的诗词，进而可以查阅内容、注解和赏析，领略作者的万千思绪。
              </AtCard>
            </View>
          )
        }
        {
          option === 'feedback' && (
            <View className='feedback-box'>
              <AtCard
                title='意见反馈'
                className='at-card-box'
              >
                <View>暂且无！</View>
              </AtCard>
            </View>
          )
        }
        {
          option === 'about' && (
            <View className='about-box'>
              <AtCard
                title='关于'
                className='at-card-box'
              >
                <View>1、本小程序是一个学习查询工具，方便用户查询字、词、古诗等，对任何使用者不收取任何费用。</View>
                <View>2、本小程序完全出于个人兴趣爱好，由本人在业余时间开发维护和迭代，所有资源全部收集于互联网，分享目的仅供大家学习与参考，如有侵权，请联系客服或者邮箱joydezhong@qq.com及时删除！</View>
                <View>3、本小程序不保证其资源完整性和精确性，体验后请自行检测，在使用过程中出现的任何问题均与本软件无关，请自行处理！</View>
              </AtCard>
              <AtCard
                title='版本'
                className='at-card-box'
              >
                <View className='version'>V1.0.0</View>
                <View>上线汉字、成语、词语、唐诗宋词元曲、歇后语查询</View>
              </AtCard>
            </View>
          )
        }
      </View>
    )
  }
}
