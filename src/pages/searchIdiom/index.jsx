import Taro, { Component } from '@tarojs/taro'
import { AtMessage, AtCard } from 'taro-ui'
import { View, Text, Input, Icon, Image } from '@tarojs/components'
import './index.scss'
import { zidian_api, chengyu_mine } from '../../../config/api'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '成语词典',
    navigationBarBackgroundColor: "#5099ff",
    navigationBarTextStyle: "white"
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

  // wx转发
  onShareAppMessage (res) {
    return {
      title: '成语词典，勤查字典是一种人生态度！',
      path: 'pages/searchIdiom/index'
    }
  }

  handleChange (value) {
    // 在改变后启动查询,跳转至结果页
    this.setState({
      value: value.target.value
    })
    let reg = /^[\u4E00-\u9FA5]+$/
    if(reg.test(value.target.value)){
      // 开启查询
      this.getData(value.target.value)
    }else{
      Taro.atMessage({ type: 'error', message: '请正确输入汉字！' })
    }
  }

  getData(word){
    let url  = zidian_api + '/chengyu/query'
    Taro.request({
      url: url,
      data: { key: chengyu_mine, word: word }
    }).then((res)=>{
      if(res.statusCode === 200){
        this.setState({ details: res.data.result })}
      else
        Taro.atMessage({ type: 'error', message: res.errMsg })
    }).catch((error)=>{
      Taro.atMessage({ type: 'error', message: error })
    })
  }

  render () {
    const { details, value } = this.state
    // const bg = 'https://s1.ax1x.com/2020/04/18/JnycPU.jpg'
    // const bg = '../../assets/images/md02.jpg'
    return (
      <View className='search-idiom-box'>
        <AtMessage />
        <View className='search-box'>
          <Image className='background' lazyLoad={true} src='../../assets/images/md02.jpg' />
          <Text className='title'></Text>
          <Icon className='search-icon' size='18' type='search' />
          <Input
            name='value'
            title=''
            type='text'
            placeholder='请输入您要查询的成语...'
            value={value}
            onChange={(e)=>this.handleChange(e)}
            className='search-input'
            placeholderClass='placeholder'
          />
        </View>
        {
          details.head && (<View className='details-box'>
          <AtCard
            extra={details.pinyin}
            title={value}
            thumb='https://s1.ax1x.com/2020/04/11/G7xw40.png'
          >
            <View className='at-row p-text'>
              <View className='at-col at-col-3'>
                <Text className='p-h'>成语词头:</Text>
              </View>
              <View className='at-col at-col-9'>
                <Text className='p-des'>{details.head||''}</Text>
              </View>
            </View>
            <View className='at-row p-text'>
              <View className='at-col at-col-3'>
                <Text className='p-h'>首字部首:</Text>
              </View>
              <View className='at-col at-col-9'>
                <Text className='p-des'>{details.bushou||''}</Text>
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
                <Text className='p-h'>语法:</Text>
              </View>
              <View className='at-col at-col-9 at-col--wrap'>
                <Text className='p-des'>{details.yufa||''}</Text>
              </View>
            </View>
            <View className='at-row p-text'>
              <View className='at-col at-col-3'>
                <Text className='p-h'>成语解释:</Text>
              </View>
              <View className='at-col at-col-9 at-col--wrap'>
                <Text className='p-des'>{details.chengyujs||''}</Text>
              </View>
            </View>
            <View className='at-row p-text'>
              <View className='at-col at-col-3 '>
                <Text className='p-h'>成语出处:</Text>
              </View>
              <View className='at-col at-col-9 at-col--wrap'>
                <Text className='p-des'>{details.from_||''}</Text>
              </View>
            </View>
            <View className='at-row p-text'>
              <View className='at-col at-col-3'>
                <Text className='p-h'>引证解释:</Text>
              </View>
              <View className='at-col at-col-9 at-col--wrap'>
                <Text className='p-des'>{details.yinzhengjs||''}</Text>
              </View>
            </View>
            <View className='at-row p-text'>
              <View className='at-col at-col-3'>
                <Text className='p-h'>举例:</Text>
              </View>
              <View className='at-col at-col-9 at-col--wrap'>
                <Text className='p-des'>{details.example||''}</Text>
              </View>
            </View>
            <View className='at-row p-text'>
              <View className='at-col at-col-3'>
                <Text className='p-h'>同义词:</Text>
              </View>
              <View className='at-col at-col-9'>
                <Text className='p-des'>
                  {
                    details.tongyi && details.tongyi.map((item,index)=>{
                      return ( <Text style='margin-right:8px;' key={index}>{item}</Text> )
                    })
                  }
                </Text>
              </View>
            </View>
            <View className='at-row p-text'>
              <View className='at-col at-col-3'>
                <Text className='p-h'>反义词:</Text>
              </View>
              <View className='at-col at-col-9'>
                <Text className='p-des'>
                  {
                    details.fanyi && details.fanyi.map((item,index)=>{
                      return ( <Text style='margin-right:8px;' key={index}>{item}<br /></Text> )
                    })
                  }
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
