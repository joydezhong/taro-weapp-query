import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtSearchBar, AtMessage, AtPagination, AtList, AtListItem } from 'taro-ui'
import './tangPoem.scss'
import { jisu_api_, jisu_mine_ } from '../../../config/api'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '唐诗三百首'
  }

  constructor () {
    super(...arguments)
    this.state = {
      value: '',
      actionName: '搜索',
      details: {},
      authorIndexs: [],
      currentIndexs: [],
      currentPage: 1,
      pageSize: 25,
      isDisplayDetails: false
    }
  }

  componentWillMount () {
    //获取路由参数
    let params = this.$router.params.option
    let word = this.$router.params.word
    console.log(this.$router.params)
    this.setState({
      searchWord: word,
      actionName: '搜索'
    })
  }

  componentDidMount () {
    // const {searchWord} = this.state
    // if (searchWord)
    //   this.getDetails(searchWord)
    this.getLists()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onActionClick () {
    // const { searchWord } = this.state
    // this.getDetails(searchWord)
  }
  onChange (value) {
    // this.setState({
    //   searchWord: value
    // })
  }
  getLists(){
    let url  = jisu_api_ + '/tangshi/chapter'
    Taro.request({
      url: url,
      data: { appkey: jisu_mine_ }
    }).then((res)=>{
      console.log(res,'res')
      if(res.data.status === 0){
        this.setState({ authorIndexs: res.data.result })
        this.handlePageChange({ current: 1 })
      } else
        Taro.atMessage({ type: 'error', message: res.errMsg })
    }).catch((error)=>{
      Taro.atMessage({ type: 'error', message: error })
      console.log(error,'error')
    })
  }
  // getDetails(word){
  //   let url  = jisu_api_ + '/tangshi/chapter'
  //   Taro.request({
  //     url: url,
  //     data: { appkey: jisu_mine_ }
  //   }).then((res)=>{
  //     console.log(res,'res')
  //     if(res.statusCode === 200){
  //       this.setState({ details: res.data.result, isDisplayDetails: true })}
  //     else
  //       Taro.atMessage({ type: 'error', message: res.errMsg })
  //   }).catch((error)=>{
  //     Taro.atMessage({ type: 'error', message: error })
  //     console.log(error,'error')
  //   })
  // }
  handleAuthIndex(detailid){
    console.log(detailid, 'detailid')
  }
  handlePageChange(params){
    const { current } = params
    let that = this
    this.setState({ currentPage: current },()=>{
      let aimObject = that.state.authorIndexs.slice((that.state.currentPage-1)*25, that.state.pageSize * that.state.currentPage - 1)
      that.setState({ currentIndexs: aimObject, isDisplayDetails: true })
    })
  }
  handleClear () {
    this.setState({ searchWord: '' })
  }

  render () {
    const { currentIndexs, authorIndexs, searchWord, actionName, isDisplayDetails, currentPage, pageSize } = this.state
    return (
      <View className='search-result-box'>
        <AtMessage />
        <View className='top-tool'>
          <AtSearchBar
            value={searchWord}
            actionName={actionName}
            placeholder='请输入要查询的关键词/诗句/诗人'
            onChange={this.onChange.bind(this)}
            onActionClick={this.onActionClick.bind(this)}
            onClear={this.handleClear.bind(this)}
          />
        </View>
        {
          isDisplayDetails && (<View className='details-box'>
            <View className='base-details'>
              <Text className='panel-title'>唐诗列表</Text>
              <AtList>
                {
                  currentIndexs.length > 0 && currentIndexs.map((item,index)=>{
                    return (<AtListItem key={index} title={item.name} note={item.author} onClick={()=>{ this.handleAuthIndex(item.detailid) }} arrow='right' />)
                  })
                }
              </AtList>
              <AtPagination
                total={authorIndexs.length}
                pageSize={pageSize}
                current={currentPage}
                onPageChange={this.handlePageChange.bind(this)}
                className='paging'
              >
              </AtPagination>
            </View>
            {/*<View className='simple-details'>*/}

            {/*</View>*/}
            {/*<View className='full-details'>*/}

            {/*</View>*/}
          </View>)
        }
      </View>
    )
  }
}
