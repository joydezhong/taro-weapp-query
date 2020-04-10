import Taro, { Component } from '@tarojs/taro'
import { AtMessage } from 'taro-ui'
import { View, Text, Input, Icon, Image } from '@tarojs/components'
import './index.scss'
import { zidian_api, zidian_mine } from '../../../config/api'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '成语词典'
  }

  constructor () {
    super(...arguments)
    this.state = {
      value: '',
      option: ''
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
      this.getData()
    }else{
      Taro.atMessage({ type: 'error', message: '请正确输入汉字！' })
    }
  }

  getData(word){
    let url  = zidian_api + '/chengyu/query'
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
      console.log(error,'error')
    })
  }

  render () {
    const bg = 'https://s1.ax1x.com/2020/04/10/G7Auct.jpg'

    return (
      <View className='search-idiom-box'>
        <AtMessage />
        <Image className='background' src={bg} />
        <Text className='title'></Text>
        <Icon className='search-icon' size='18' type='search' />
        <Input
          name='value'
          title=''
          type='text'
          placeholder='请输入您要查询的成语...'
          value={this.state.value}
          onChange={(e)=>this.handleChange(e)}
          className='search-input'
          placeholderClass='placeholder'
        />
        <View className='at-row at-row__justify--around select-box'>

        </View>
      </View>
    )
  }
}
