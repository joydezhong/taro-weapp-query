import Taro, { Component } from '@tarojs/taro'
import { AtMessage, AtCard } from 'taro-ui'
import { View, Text, Input, Icon, Image } from '@tarojs/components'
import './index.scss'
import { jisu_api_, jisu_mine_ } from '../../../config/api'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '汉语词典'
  }

  constructor () {
    super(...arguments)
    this.state = {
      value: '',
      details: {}
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleChange (value) {
    // 在改变后启动查询,跳转至结果页
    console.log(value.target.value,'在改变后启动查询,跳转至结果页')
    this.setState({
      value: value.target.value
    })
    let reg = /^[\u4E00-\u9FA5]+$/
    if(reg.test(value.target.value)){
      // 开启查询
      console.log(value.target.value, 'v')
      this.getData(value.target.value)
    }else{
      Taro.atMessage({ type: 'error', message: '请正确输入词语！' })
    }
  }

  getData(word){
    let url  = jisu_api_ + '/cidian/word'
    Taro.request({
      url: url,
      data: { appkey: jisu_mine_, word: word }
    }).then((res)=>{
      if(res.statusCode === 200){
        console.log(res.data.result)
        this.setState({ details: res.data.result })}
      else
        Taro.atMessage({ type: 'error', message: res.errMsg })
    }).catch((error)=>{
      Taro.atMessage({ type: 'error', message: error })
      console.log(error,'error')
    })
  }

  decodeText(params){
    return str.replace(/<[^>]+>/g,"")
  }

  render () {
    const { details, value } = this.state
    const bg = 'https://s1.ax1x.com/2020/04/10/G7uWJU.jpg'
    return (
      <View className='search-breafter-box'>
        <AtMessage />
        <View className='search-box'>
          <Image className='background' src={bg} />
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
              thumb='https://s1.ax1x.com/2020/04/11/G7xKAI.png'
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
                  <Text className='p-des'>
                  {(()=>{
                    return details.content && details.content.replace(/<[^>]+>/g,"") || ''
                  })()}
                  </Text>
                </View>
              </View>
              <View className='at-row p-text'>
                <View className='at-col at-col-3 '>
                  <Text className='p-h'>出处:</Text>
                </View>
                <View className='at-col at-col-9 at-col--wrap'>
                  <Text className='p-des'>
                  {(()=>{
                    return details.comefrom && details.comefrom.replace(/<[^>]+>/g,"") || ''
                  })()}
                  </Text>
                </View>
              </View>
              <View className='at-row p-text'>
                <View className='at-col at-col-3'>
                  <Text className='p-h'>举例:</Text>
                </View>
                <View className='at-col at-col-9 at-col--wrap'>
                  <Text className='p-des'>
                  {(()=>{
                    return details.example && details.example.replace(/<[^>]+>/g,"") || ''
                  })()}
                  </Text>
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
      </View>
    )
  }
}
