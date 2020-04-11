import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon, AtGrid } from 'taro-ui'
import './index.scss'

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '首页'
  }
  handleClick = (item, index) => {
    console.log(item, index)
    if(item.value === '新华字典'){
      Taro.navigateTo({
        url: '/pages/searchCharacter/index'
      })

    }else if(item.value === '成语词典'){
      Taro.navigateTo({
        url: '/pages/searchIdiom/index'
      })
    }else if(item.value === '近反义词'){
      Taro.navigateTo({
        url: '/pages/searchBreAfterWord/index'
      })
    }
  }

  render () {
    const gridData = [{
        image: 'https://s1.ax1x.com/2020/04/02/GY2mSf.png',
        value: '新华字典'
      },
      {
        image: 'https://s1.ax1x.com/2020/04/02/GY2lwj.png',
        value: '成语词典'
      },
      {
        image: 'https://s1.ax1x.com/2020/04/02/GY2KOg.png',
        value: '近反义词'
      },
      {
        image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
        value: '新品首发'
      },
      {
        image: 'https://s1.ax1x.com/2020/04/02/GY2ZfP.png',
        value: '古诗词典'
      },
      {
        image: 'https://s1.ax1x.com/2020/04/02/GY2nl8.png',
        value: '帮助中心'
      }]

    const bg = 'https://s1.ax1x.com/2020/04/02/GtkAMt.jpg'

    return (
      <View className='indexBox'>
        <Image className='background' src={bg} />
        <View className='at-row'>
          <View className='at-col at-col-5'>
            <AtIcon className='cap' prefixClass='fa' value='graduation-cap' size='40' color='#000'/>
          </View>
          <View className='at-col at-col-7'>
            <Text className='title'></Text>
          </View>
        </View>
        <View className='chooseBox'>
          <Text className='panel-title'>选择菜单</Text>
          <AtGrid data={gridData} onClick={this.handleClick} />
        </View>
      </View>
    )
  }
}
