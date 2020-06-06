import Taro, { Component } from '@tarojs/taro'
import { AtMessage, AtCard } from 'taro-ui'
import { View, Text, Input, RichText, Icon, Image } from '@tarojs/components'
import './index.scss'
import { jisu_api_, jisu_mine_ } from '../../../config/api'
import banner from '../../assets/images/md03.jpg'
import thumb from '../../assets/images/G7xKAI.png'
//  https://s1.ax1x.com/2020/04/11/G7xKAI.png
import Loading from '../../components/loading'

export default class Index extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      value: '',
      lazy: true,
      details: {},
      isLoading: false
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '汉语词典',
    navigationBarBackgroundColor: "#5099ff",
    navigationBarTextStyle: "white"
  }

  // wx转发
  onShareAppMessage () {
    return {
      title: '汉语词典，勤查字典是一种人生态度！',
      path: 'pages/searchBreAfterWord/index'
    }
  }

  handleChange (value) {
    // 在改变后启动查询,跳转至结果页
    this.setState({
      value: value.target.value,
    })
    let reg = /^[\u4E00-\u9FA5]{2,}$/
    if(reg.test(value.target.value)){
      // 开启查询
      this.setState({isLoading: true})
      this.getData(value.target.value)
    }else{
      this.setState({details: {}})
      Taro.atMessage({ type: 'error', message: '请正确输入词语！' })
    }
  }

  getData(word){
    let url  = jisu_api_ + '/cidian/word'
    Taro.request({
      url: url,
      data: { appkey: jisu_mine_, word: word }
    }).then((res)=>{
      console.log(res, 'res')
      if(res.statusCode === 200){
        this.setState({ details: res.data.result, isLoading: false })}
      else
        Taro.atMessage({ type: 'error', message: res.data.msg })
    }).catch((error)=>{
      Taro.atMessage({ type: 'error', message: error })
    })
  }

  // decodeText(params){
  //   return str.replace(/<[^>]+>/g,"")
  // }

  render () {
    const { details, value, lazy, isLoading } = this.state
    // const bg = 'https://s1.ax1x.com/2020/04/18/Jnyy5T.jpg'
    // const bg = '../../assets/images/md03.jpg'
    return (
      <View className='search-breafter-box'>
        <AtMessage />
        <View className='search-box'>
          <Image className='background' lazyLoad={lazy} src={banner} />
          <Text className='title'></Text>
          <Icon className='search-icon' size='18' type='search' />
          <Input
            name='value'
            title=''
            type='text'
            placeholder='请输入您要查询的词语...'
            value={value}
            onChange={(e)=>this.handleChange(e)}
            className='search-input'
            placeholderClass='placeholder'
          />
        </View>
        {
          details.name && (<View className='details-box'>
            <AtCard
              extra={details.pinyin}
              title={value}
              thumb={thumb}
            >
              <View className='at-row p-text'>
                <View className='at-col at-col-3'>
                  <Text className='p-h'>词语:</Text>
                </View>
                <View className='at-col at-col-9'>
                  <Text className='p-des'>{details.name||''}</Text>
                </View>
              </View>
              <View className='at-row p-text'>
                <View className='at-col at-col-3'>
                  <Text className='p-h'>拼音:</Text>
                </View>
                <View className='at-col at-col-9 at-col--wrap'>
                  <Text className='p-des'>{details.pinyin||''}</Text>
                </View>
              </View>
              <View className='at-row p-text'>
                <View className='at-col at-col-3'>
                  <Text className='p-h'>内容:</Text>
                </View>
                <View className='at-col at-col-9 at-col--wrap'>
                  <RichText className='p-des' nodes={details.content}></RichText>
                </View>
              </View>
              <View className='at-row p-text'>
                <View className='at-col at-col-3 '>
                  <Text className='p-h'>出处:</Text>
                </View>
                <View className='at-col at-col-9 at-col--wrap'>
                  <RichText className='p-des' nodes={details.comefrom}></RichText>
                </View>
              </View>
              <View className='at-row p-text'>
                <View className='at-col at-col-3'>
                  <Text className='p-h'>举例:</Text>
                </View>
                <View className='at-col at-col-9 at-col--wrap'>
                  <RichText className='p-des' nodes={details.example}></RichText>
                </View>
              </View>
              <View className='at-row p-text'>
                <View className='at-col at-col-3'>
                  <Text className='p-h'>近义词:</Text>
                </View>
                <View className='at-col at-col-9 at-col--wrap'>
                  <Text className='p-des'>
                    {details.jin||''}
                  </Text>
                </View>
              </View>
              <View className='at-row p-text'>
                <View className='at-col at-col-3'>
                  <Text className='p-h'>反义词:</Text>
                </View>
                <View className='at-col at-col-9 at-col--wrap'>
                  <Text className='p-des'>
                    {details.fan||''}
                  </Text>
                </View>
              </View>
            </AtCard>
          </View>)
        }
        <Loading isLoading={isLoading} />
      </View>
    )
  }
}
