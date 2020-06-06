import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtPagination,AtToast } from 'taro-ui'
// import { connect  } from '@tarojs/redux'
// import { updateTextLists } from '../../store/actions'
import './index.scss'
import {zidian_api, zidian_mine} from "../../../config/api"
import Loading from '../../components/loading'

export default class Index extends Component {

  constructor (props) {
    super(props)
    this.state = {
      current: 1, // 换为props
      pageSize: 50,
      pageTotal: null, //总条数
      routerOption: null,
      routerName: null,
      dataArray: [], // 换为props
      isLoading: true,
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

  config = {
    navigationBarTitleText: '选择文字'
  }

  // wx转发
  onShareAppMessage () {
    return {
      title: '新华字典，勤查字典是一种人生态度！',
      path: `pages/searchTextLists/index?option=${this.state.routerOption}&name=${this.state.routerName}`
    }
  }

  getData(){
    const { routerName, current } = this.state  //下次再获取数据 先从缓存中取 此时pageTotal是默认的null
    Taro.getStorage({
      key: `${routerName}+${current}`,
      success: (res)=>{
        this.setState({
          dataArray: res.data|| [],
          isLoading: false
        })
      },
      fail: ()=>{
        this.loadServerData()
      }
    })
  }

  loadServerData(){
    // const { current } = this.props
    const { routerOption, routerName, pageSize, current } = this.state
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
    // const { current } = this.props
    const { routerName, current } = this.state
    let dataArray = data.list || []
    this.setState({
      dataArray: dataArray,
      current: data.page,
      pageTotal: data.totalcount,
      isLoading: false
    })
    // this.props.updateTextLists({current:data.page,dataArray: dataArray,pageTotal: data.totalcount})
    Taro.setStorage({
      key: `${routerName}+${current}`,  // 以 拼音或部首+页码为key缓存
      data: dataArray
    })
  }

  handlePage (value) {
    // this.props.updateTextLists({current: value})
    // this.getData()
    this.setState({
      current: value.current
    },()=>{
      this.getData()
    })
  }

  selectFont (value) {
    Taro.navigateTo({
      url: `/pages/searchResult/index?word=${value}`
    })
  }

  render () {
    // const { current, pageTotal } = this.props
    const { pageSize, dataArray, routerName,  current, pageTotal, isLoading } = this.state
    return (
      <View className='search-lists-box'>
        <Text className='panel__title'>选择文字 {routerName}</Text>
          <View className='at-row at-row--wrap'>
            {
              dataArray.map((item, index)=>{
                return (
                  <View className='at-col at-col-3 word-block' key={index} onClick={()=>{this.selectFont(item.zi)}}>
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
          <Loading isLoading={isLoading} />
      </View>
    )
  }
}

// export default connect (({ textLists }) => ({
//   current: textLists.current,
//   pageTotal: textLists.pageTotal,
//   dataArray: textLists.dataArray
// }), (dispatch) => ({
//   updateTextLists (data) {
//     dispatch(updateTextLists(data))
//   }
// }))(Index)
