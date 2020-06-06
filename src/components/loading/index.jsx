import Taro, { Component } from '@tarojs/taro'
// import { View } from '@tarojs/components'
import {AtToast} from 'taro-ui'
import './index.scss'

export default class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: '正在加载中...',
      status: 'loading',
      hasMask: true
    }
  }

  componentWillMount () {

  }

  componentDidMount () {
    
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { loading, status,hasMask } = this.state
    const { isLoading } = this.props

    return (
        <AtToast 
          className='my-loading'
          duration={0} 
          hasMask={hasMask} 
          isOpened={isLoading}
          text={loading} 
          status={status} 
        >
        </AtToast>
    )
  }
}
