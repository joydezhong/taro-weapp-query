import Taro, { Component } from '@tarojs/taro'
import { AtMessage, AtTabs, AtTabsPane } from 'taro-ui'
import { View, Text, Input, Icon, Image } from '@tarojs/components'
import './index.scss'
import { jinfan_api, jinfan_mine } from '../../../config/api'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '近反义词'
  }

  constructor () {
    super(...arguments)
    this.state = {
      value: '',
      defaultType: 1,
      details: {},
      isDisplayDetails: false
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
      Taro.atMessage({ type: 'error', message: '请正确输入汉字！' })
    }
  }

  getData(word){
    let url  = jinfan_api + '/tyfy/query'
    Taro.request({
      url: url,
      data: { key: jinfan_mine, word: word, type: this.state.defaultType }
    }).then((res)=>{
      if(res.statusCode === 200){
        console.log(res.data.result)
        this.setState({ details: res.data.result, isDisplayDetails: true })}
      else
        Taro.atMessage({ type: 'error', message: res.errMsg })
    }).catch((error)=>{
      Taro.atMessage({ type: 'error', message: error })
      console.log(error,'error')
    })
  }

  handleTabs (value) {
    console.log(value)
    this.setState({
      current: value,
      defaultType: value+1
    },()=>{
      this.getData(this.state.value)
    })
  }

  render () {
    const { details, value } = this.state
    const bg = 'https://s1.ax1x.com/2020/04/10/G7uWJU.jpg'
    const tabList = [{ title: '近义词' }, { title: '反义词' }]

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
            value={this.state.value}
            onChange={(e)=>this.handleChange(e)}
            className='search-input'
            placeholderClass='placeholder'
          />
        </View>
        {
          value && (<View className='details-box'>
            <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleTabs.bind(this)}>
              <AtTabsPane current={this.state.current} index={0}>
                <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>
                  {
                    details && details.words.map((item,index)=>{
                      return (<View key={index}>{item}</View>)
                    })
                  }
                </View>
              </AtTabsPane>
              <AtTabsPane current={this.state.current} index={1}>
                <View style='padding:50px;background-color: #FAFBFC;text-align: center;'>
                  {
                    details && details.words.map((item,index)=>{
                      return (<View key={index}>{item}</View>)
                    })
                  }
                </View>
              </AtTabsPane>
            </AtTabs>
          </View>)
        }
      </View>
    )
  }
}
