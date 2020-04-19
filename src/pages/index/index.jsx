import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon, AtGrid } from 'taro-ui'
import './index.scss'

export default class Index extends Component {

  componentWillMount () {
    this.handleAuthJump()
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '学生辞典大全',
    navigationBarBackgroundColor: "#026aed",
    navigationBarTextStyle: "white"
    //#026aed
  }

  // wx转发
  onShareAppMessage (res) {
    return {
      title: '学生辞典大全，学生的学习查询小助手',
      path: '/page/index/index'
    }
  }

  handleAuthJump(){
    let value = Taro.getStorageSync('userInfo')
    if (!value) {
      Taro.navigateTo({
        url: '/pages/home/home'
      })
    }
  }

  handleClick = (item, index) => {
    if(item.value === '新华字典'){
      Taro.navigateTo({
        url: '/pages/searchCharacter/index'
      })
    }else if(item.value === '成语词典'){
      Taro.navigateTo({
        url: '/pages/searchIdiom/index'
      })
    }else if(item.value === '汉语词典'){
      Taro.navigateTo({
        url: '/pages/searchBreAfterWord/index'
      })
    }else if(item.value === '诗词曲'){
      Taro.navigateTo({
        url: '/pages/searchPoem/index'
      })
    }else if(item.value === '歇后语'){
      Taro.navigateTo({
        url: '/pages/searchSaying/index'
      })
    }else if(item.value === '帮助中心'){
      Taro.navigateTo({
        url: '/pages/mine/index'
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
        value: '汉语词典'
      },
      {
        image: 'https://s1.ax1x.com/2020/04/02/GY2ZfP.png',
        value: '诗词曲'
      },
      {
        image: 'https://s1.ax1x.com/2020/04/12/GqX1QU.png',
        value: '歇后语'
      },
      {
        image: 'https://s1.ax1x.com/2020/04/02/GY2nl8.png',
        value: '帮助中心'
      }]

    const bg = 'https://s1.ax1x.com/2020/04/02/GtkAMt.jpg'

    return (
      <View className='indexBox'>
        <Image className='background' lazyLoad={true} src={bg} />
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
