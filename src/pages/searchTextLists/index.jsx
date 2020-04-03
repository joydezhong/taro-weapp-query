import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtPagination  } from 'taro-ui'
import { connect } from '@tarojs/redux'
import './index.scss'
import {zidian_api, zidian_mine} from "../../../config/api"

import { update } from '../../store/actions/index'
// import dictionary from "../../store/reducers/dictionary"
import { dictionary } from "../../store/reducers/dictionary"

@connect(({ dictionary }) => ({
  dictionary
}))

export default class Index extends Component {
  config = {
    navigationBarTitleText: '选择文字'
  }

  constructor (props) {
    super(props)
    this.state = {
      // current: 1,
      pageSize: 50,
      pageTotal: null, //总条数
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
    this.getData()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  getData(){
    const { current } = this.props
    const { routerName } = this.state  //下次再获取数据 先从缓存中取 此时pageTotal是默认的null
    Taro.getStorage({
      key: `${routerName}+${current}`,
      success: (res)=>{
        console.log('有缓存',res.data, current)
        this.setState({
          dataArray: res.data|| []
        })
      },
      fail: (res)=>{
        this.loadServerData()
      }
    })
  }

  loadServerData(){
    const { current } = this.props
    const { routerOption, routerName, pageSize } = this.state
    let url  = zidian_api
    if(routerOption === 'pinyin')
      url += '/xhzd/querypy'
    else if(routerOption === 'bushou')
      url += '/xhzd/querybs'
    Taro.request({  // 每个拼音和部首所属下的字
      url: url,
      data: { word:  routerName, page: current, pagesize: pageSize, key: zidian_mine }
    }).then((res)=>{
      let data = res.data.result || {}
      this.processData(data)
    }).catch((error)=>{
      console.log(error,'error')
    })
  }

  processData(data){
    const { current } = this.props
    const { routerName } = this.state
    let dataArray = data.list || []
    this.setState({
      dataArray: dataArray,
      current: data.page,
      pageTotal: data.totalcount,
    })
    Taro.setStorage({
      key: `${routerName}+${current}`,  // 以 拼音或部首+页码为key缓存
      data: dataArray
    })
  }

  handlePage (value) {
    console.log('翻页',value)
    this.setState({
      current: value.current
    },()=>{
      this.getData()
    })
  }

  render () {
    const { current } = this.props
    const { pageSize, pageTotal, dataArray, routerName } = this.state
    return (
      <View className='search-lists-box'>
        <Text className='panel__title'>选择文字 {routerName}</Text>
          <View className='at-row at-row--wrap'>
            {
              dataArray.map((item, index)=>{
                return (
                  <View className='at-col at-col-3 word-block' key={index}>
                    <View className='word-block-insert'>
                      <View>{item.zi}</View>
                      <View className='word-block-pinyin'>{item.pinyin}</View>
                    </View>
                  </View>
                )
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
      </View>
    )
  }
}
