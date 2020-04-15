import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon, AtNoticebar } from 'taro-ui'
import './index.scss'

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '诗词曲'
  }

  handleClick(){

  }


  render () {

    const bg = 'https://s1.ax1x.com/2020/04/14/JpUXqO.jpg'
    const item1 = 'https://s1.ax1x.com/2020/04/14/JpyMrR.jpg'
    const item2 = 'https://s1.ax1x.com/2020/04/14/JpynxJ.jpg'
    const item3 = 'https://s1.ax1x.com/2020/04/14/JpyKM9.jpg'

    return (
      <View className='indexBox'>
        <Image className='background' src={bg} />
        {/*<View className='at-row'>*/}
        {/*  <View className='at-col at-col-5'>*/}
        {/*    <AtIcon className='cap' prefixClass='fa' value='graduation-cap' size='40' color='#000'/>*/}
        {/*  </View>*/}
        {/*  <View className='at-col at-col-7'>*/}
        {/*    <Text className='title'></Text>*/}
        {/*  </View>*/}
        {/*</View>*/}
        <View className='notic'>
          <AtNoticebar icon='volume-plus' close={true}>
            点击下方分类选项，进入具体的诗词类别！
          </AtNoticebar>
        </View>
        <View className='chooseBox'>
          <View className='itemBox'>
            <Text className='panel-title'>唐诗</Text>
            <View className='itemImgBox'>
              <Image className='itemImg' src={item1} />
            </View>
          </View>
          <View className='itemBox'>
            <Text className='panel-title'>宋词</Text>
            <View className='itemImgBox'>
              <Image className='itemImg' src={item2} />
            </View>
          </View>
          <View className='itemBox'>
            <Text className='panel-title'>元曲</Text>
            <View className='itemImgBox'>
              <Image className='itemImg' src={item3} />
            </View>
          </View>
        </View>
      </View>
    )
  }
}
