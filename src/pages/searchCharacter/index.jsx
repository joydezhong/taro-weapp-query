import Taro, { Component } from '@tarojs/taro'
import { AtMessage } from 'taro-ui'
import { View, Text, Input, Icon, Image } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      value: '',
      // option: '',
      lazy: true
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '新华字典',
    navigationBarBackgroundColor: "#5099ff",
    navigationBarTextStyle: "white"
  }

  // wx转发
  onShareAppMessage () {
    return {
      title: '新华字典，勤查字典是一种人生态度！',
      path: 'pages/searchCharacter/index'
    }
  }

  handleChange (value) {
    // 在改变后启动查询,跳转至结果页
    this.setState({
      value: value.target.value
    })
    let reg = /^[\u4E00-\u9FA5]{1}$/
    if(reg.test(value.target.value)){
      Taro.navigateTo({
        url: `/pages/searchResult/index?word=${value.target.value}` //直接enter只传入汉字
      })
    }else{
      Taro.atMessage({ type: 'error', message: '请正确输入汉字！' })
    }
    // return value
  }

  handleSearchItem(value){
    // 拼音部首跳转至索引页 汉字跳转结果页
    if(value === 'hanzi')
      Taro.navigateTo({
        url: `/pages/searchResult/index?option=${value}`
      })
    else
      Taro.navigateTo({
        url: `/pages/searchIndex/index?option=${value}`
      })
    // this.setState({option: value})
  }

  render () {
    // const bg = 'https://s1.ax1x.com/2020/04/18/JnygGF.jpg'
    // const bg = '../../assets/images/md01.jpg'
    return (
      <View className='search-character-box'>
        <AtMessage />
        <Image className='background' lazyLoad={this.state.lazy} src='../../assets/images/md01.jpg' />
        <Text className='title'></Text>
        <Icon className='search-icon' size='18' type='search' />
        <Input
          name='value'
          title=''
          type='text'
          placeholder='请输入您要查询的汉字...'
          maxLength='1'
          value={this.state.value}
          onChange={(e)=>this.handleChange(e)}
          className='search-input'
          placeholderClass='placeholder'
        />
        <View className='at-row at-row__justify--around select-box'>
          <View className='at-col at-col-2' onClick={()=>this.handleSearchItem('pinyin')}>
            <View className='select-item'>
              <Text>拼</Text>
            </View>
            <Text className='sub-title'>拼音</Text>
          </View>
          <View className='at-col at-col-2' onClick={()=>this.handleSearchItem('bushou')}>
            <View className='select-item'>
              <Text>部</Text>
            </View>
            <Text className='sub-title'>部首</Text>
          </View>
          <View className='at-col at-col-2' onClick={()=>this.handleSearchItem('hanzi')}>
            <View className='select-item'>
              <Text>字</Text>
            </View>
            <Text className='sub-title'>汉字</Text>
          </View>
        </View>
      </View>
    )
  }
}
