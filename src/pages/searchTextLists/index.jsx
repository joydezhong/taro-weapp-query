import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtListItem, AtPagination  } from 'taro-ui'
import './index.scss'
import {zidian_api, zidian_mine} from "../../../config/api"

export default class Index extends Component {
  config = {
    navigationBarTitleText: '选择文字'
  }

  constructor () {
    super(...arguments)
    this.state = {
      current: 1,
      pageSize: 20,
      pageTotal: null,
      routerOption: null,
      routerName: null,
      dataArray: []
    }
  }

  componentWillMount () {
    //获取路由参数
    let params = this.$router.params.option
    let name = this.$router.params.name
    this.setState({ routerOption: params, routerName: name })
  }

  componentDidMount () {
    const { routerOption, routerName, current, pageSize } = this.state
    let url  = zidian_api
    if(routerOption === 'pinyin')
      url += '/xhzd/querypy'
    else if(routerOption === 'bushou')
      url += '/xhzd/querybs'
    Taro.request({
      url: url,
      data: { word:  routerName, page: current, pagesize: pageSize, key: zidian_mine }
    }).then((res)=>{
      this.setState({ dataArray: res.data.result.list || [] })
    }).catch((error)=>{
      console.log(error,'error')
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handlePage (value) {
    this.setState({current: value.current})
  }

  render () {
    const { current, pageSize, pageTotal, dataArray } = this.state
    return (
      <View className='search-lists-box'>
        <Text className='panel__title'>选择文字</Text>
        {/*<View className='panel__content'>*/}
        <View className='at-row at-row--wrap'>
          {
            dataArray.map((item, index)=>{
              return <View className='at-col at-col-3 word-block' key={index}><View>{item.zi}</View><View>{item.pinyin}</View></View>
            })
          }
        </View>
          <AtPagination
            total={pageTotal}
            pageSize={pageSize}
            current={current}
            onPageChange={(e)=>this.handlePage(e)}
            className='page'
          >
          </AtPagination>
        {/*</View>*/}
      </View>
    )
  }
}
