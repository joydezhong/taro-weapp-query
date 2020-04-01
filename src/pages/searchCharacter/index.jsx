import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Icon, Image } from '@tarojs/components'
import './index.scss'
// import bg from '../../assets/images/bnner.jpg'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '字符'
  }

  constructor () {
    super(...arguments)
    this.state = {
      value: ''
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleChange (value) {
    this.setState({
      value: value.target.value
    })
    return value
  }

  handleSearchItem(value){
    console.log(value)
    Taro.navigateTo({
      url: `/pages/searchResult/index?option=${value}`
    })
  }

  render () {

    const bg = 'https://s1.ax1x.com/2020/04/01/G3qnHO.jpg'

    return (
      <View className='search-character-box'>
        <Image className='background' src={bg} />
        <Text className='title'>Hello character!</Text>
        <Icon className='search-icon' size='18' type='search' />
        <Input
          name='value'
          title=''
          type='text'
          placeholder='请输入您要查询的汉字...'
          value={this.state.value}
          onChange={(e)=>{this.handleChange(e)}}
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
