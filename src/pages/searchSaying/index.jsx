import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import {AtSearchBar, AtMessage, AtPagination, AtNoticebar, AtCard} from 'taro-ui'
import './index.scss'
import { jisu_api_, jisu_mine_ } from '../../../config/api'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '歇后语查询'
  }

  constructor () {
    super(...arguments)
    this.state = {
      actionName: '搜索',
      searchWord: '',
      details: [],
      total: null,
      currentPage: 1,
      pageSize: 2
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onActionClick () {
    console.log(this.state.searchWord, '启动搜索')
    // 关键字查询 修改列表数据
    this.handleSearchResult()
  }
  handleSearchResult(){
    const {searchWord, pageSize, currentPage} = this.state
    let url  = jisu_api_ + '/xhy/search'
    Taro.request({
      url: url,
      data: { appkey: jisu_mine_, keyword: searchWord, pagesize: pageSize, pagenum: currentPage }
    }).then((res)=>{
      console.log(res,'res')
      if(res.data.status === 0){
        this.setState({
          details: res.data.result.list,
          total: res.data.result.total
        })
      } else
        Taro.atMessage({ type: 'error', message: res.data.msg })
    }).catch((error)=>{
      Taro.atMessage({ type: 'error', message: error })
      console.log(error,'error')
    })
  }
  onChange (value) {
    this.setState({
      searchWord: value
    })
  }
  handlePageChange(params){
    const { current } = params
    this.setState({ currentPage: current }, ()=>{
      this.handleSearchResult()
    })
  }
  handleClear () {
    this.setState({ searchWord: '', details: [] })
  }

  render () {
    const { searchWord, actionName, details, total, pageSize, currentPage } = this.state
    return (
      <View className='search-result-box'>
        <AtMessage />
        <View>
          <AtSearchBar
            value={searchWord}
            actionName={actionName}
            placeholder='请输入要查询的关键词'
            onChange={this.onChange.bind(this)}
            onActionClick={this.onActionClick.bind(this)}
            onClear={this.handleClear.bind(this)}
          />
        </View>
        <View className='notic'>
          <AtNoticebar icon='volume-plus' close={false}>
            查询尽可能详尽的关键字，已到达精准搜索！
          </AtNoticebar>
        </View>
        {
          details.length > 0 && details.map((item,index)=>{
            return(
              <View key={index} className='item-box'>
                <AtCard
                  title={item.content}
                >
                  {item.answer}
                </AtCard>
              </View>
            )
          })
        }
        {
          details.length > 0 && (
            <AtPagination
              total={total}
              pageSize={pageSize}
              current={currentPage}
              onPageChange={this.handlePageChange.bind(this)}
              className='paging'
            >
            </AtPagination>
          )
        }
      </View>
    )
  }
}
