import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtSearchBar, AtMessage, AtPagination, AtList, AtListItem } from 'taro-ui'
import './tangPoem.scss'
import { jisu_api_, jisu_mine_ } from '../../../config/api'
import { set as setGlobalData } from '../../global_data'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '诗词查询'
  }

  constructor () {
    super(...arguments)
    this.state = {
      actionName: '搜索',
      titleText: '',
      searchWord: '',
      option: '',
      details: {},
      authorIndexs: [],
      currentIndexs: [],
      currentPage: 1,
      pageSize: 25,
      isDisplayDetails: false,
      isDisplaySearchList: false
    }
  }

  componentWillMount () {
    //获取路由参数
    let params = this.$router.params.option
    let titleText = ''
    if(params === 'tang'){
      titleText = '唐诗列表'
    }else if(params === 'song'){
      titleText = '宋词列表'
    }else if(params === 'yuan'){
      titleText = '元曲列表'
    }
    this.setState({
      option: params,
      titleText: titleText
    })
  }

  componentDidMount () {
    this.getLists()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  // wx转发
  onShareAppMessage (res) {
    return {
      title: '学生辞典大全，唐诗宋词元曲，李杜诗篇万口传...',
      path: `pages/searchPoem/tangPoem?option=${this.state.option}`
    }
  }

  onActionClick () {
    // 关键字查询 修改列表数据
    this.handleSearchResult()  //死循环
  }
  handleSearchResult(){
    let url = ''
    if(this.state.option === 'tang'){
      url = jisu_api_ + '/tangshi/search'
    }else if(this.state.option === 'song'){
      url = jisu_api_ + '/songci/search'
    }else if(this.state.option === 'yuan'){
      url = jisu_api_ + '/yuanqu/search'
    }
    // let url  = jisu_api_ + '/tangshi/search'
    Taro.request({
      url: url,
      data: { appkey: jisu_mine_, keyword: this.state.searchWord, pagesize: 4, pagenum: this.state.currentPage }
    }).then((res)=>{
      if(res.data.status === 0){
        this.setState({
          currentIndexs: res.data.result.list,
          searchResultTotal: res.data.result.total,
          isDisplaySearchList: true,
          isDisplayDetails: false,
        })
        // this.handleSearchListPageChange({ current: 1 })
      } else
        Taro.atMessage({ type: 'error', message: res.data.msg })
    }).catch((error)=>{
      Taro.atMessage({ type: 'error', message: error })
    })
  }
  onChange (value) {
    this.setState({
      searchWord: value
    })
  }
  getLists(){
    let url = ''
    if(this.state.option === 'tang'){
      url = jisu_api_ + '/tangshi/chapter'
    }else if(this.state.option === 'song'){
      url = jisu_api_ + '/songci/chapter'
    }else if(this.state.option === 'yuan'){
      url = jisu_api_ + '/yuanqu/chapter'
    }
    // let url  = jisu_api_ + '/tangshi/chapter'
    Taro.request({
      url: url,
      data: { appkey: jisu_mine_ }
    }).then((res)=>{
      if(res.data.status === 0){
        this.setState({ authorIndexs: res.data.result })
        this.handlePageChange({ current: 1 })
      } else
        Taro.atMessage({ type: 'error', message: res.data.msg })
    }).catch((error)=>{
      Taro.atMessage({ type: 'error', message: error })
    })
  }
  handleAuthIndex(detail){
    // 带id和类别option跳转至结果页 其中搜索列表的时候没有id
    const { option } = this.state
    if(detail.title){ // 传入是对象 说明是搜索列表 存入全局数据
      setGlobalData('searchData', detail)
      Taro.navigateTo({
        url: `/pages/searchPoem/tangPoemResult?detailid=&option=${option}`
      })
    }else { // 传入是id 说明是索引列表
      Taro.navigateTo({
        url: `/pages/searchPoem/tangPoemResult?detailid=${detail}&option=${option}`
      })
    }
  }
  handlePageChange(params){
    const { current } = params
    let that = this
    this.setState({ currentPage: current },()=>{
      let aimObject = that.state.authorIndexs.slice((that.state.currentPage-1)*25, that.state.pageSize * that.state.currentPage - 1)
      that.setState({ currentIndexs: aimObject, isDisplayDetails: true })
    })
  }
  handleSearchListPageChange(params){
    const { current } = params
    this.setState({ currentPage: current },()=>{
     this.handleSearchResult()
    })
  }
  handleClear () {
    this.setState({ searchWord: '' })
    this.getLists()
  }

  render () {
    const { currentIndexs, authorIndexs, searchWord, searchResultTotal, actionName, isDisplayDetails, isDisplaySearchList, currentPage, pageSize, titleText } = this.state
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
              <Text className='panel-title'>{titleText}</Text>
              <AtList>
                {
                  currentIndexs.length > 0 && currentIndexs.map((item,index)=>{
                    return (<AtListItem key={index} title={item.name||item.title} note={item.author} onClick={()=>{ this.handleAuthIndex(item.detailid) }} arrow='right' />)
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
          </View>)
        }
        { //搜索列表没有id
          isDisplaySearchList && (<View className='details-box'>
            <View className='base-details'>
              <Text className='panel-title'>{titileText}</Text>
              <AtList>
                {
                  currentIndexs.length > 0 && currentIndexs.map((item,index)=>{
                    return (<AtListItem key={index} title={item.name||item.title} note={item.author} onClick={()=>{ this.handleAuthIndex(item) }} arrow='right' />)
                  })
                }
              </AtList>
              <AtPagination
                total={searchResultTotal}
                pageSize={4}
                current={currentPage}
                onPageChange={this.handleSearchListPageChange.bind(this)}
                className='paging'
              >
              </AtPagination>
            </View>
          </View>)
        }
      </View>
    )
  }
}
