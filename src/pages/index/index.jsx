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
    if(item.value === '领取中心'){
      Taro.navigateTo({
        url: '/pages/searchCharacter/index'
      })

    }else if(item.value === '找折扣'){
      Taro.navigateTo({
        url: '/pages/searchIdiom/index'
      })
    }
  }

  render () {
    const gridData = [{
        image: 'https://s1.ax1x.com/2020/04/01/G8SEnA.png',
        value: '领取中心'
      },
      {
        image: 'https://s1.ax1x.com/2020/04/01/G8SV0I.png',
        value: '找折扣'
      },
      {
        image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
        value: '领会员'
      },
      {
        image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
        value: '新品首发'
      },
      {
        image: 'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
        value: '领京豆'
      },
      {
        image: 'https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png',
        value: '手机馆'
      }]

    const bg = 'https://s1.ax1x.com/2020/04/02/GYYRaQ.jpg'

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
