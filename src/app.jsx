import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'
import { Provider } from '@tarojs/redux'
import configStore from './store'
// import rootReducer from './store/reducers'

import './app.scss'
import 'taro-ui/dist/style/index.scss' // 全局引入一次即可


// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  componentDidMount () {
    // 云开发初始化
    if(!Taro.cloud){
      console.error('请使用2.2.3或以上的基础库以使用云能力')
    }else {
      Taro.cloud.init({
        env: 'miniapp-5mce1',
        traceUser: true
      })
      this.globalData = {}
    }
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  config = {
    pages: [
      // 'pages/mine/index',
      // 'pages/blank/index',
      'pages/index/index',
      'pages/home/home',
      'pages/searchCharacter/index',
      'pages/searchIndex/index',
      'pages/searchTextLists/index',
      'pages/searchResult/index',
      'pages/searchIdiom/index',
      'pages/searchBreAfterWord/index',
      'pages/searchPoem/index',
      'pages/searchPoem/tangPoem',
      'pages/searchPoem/tangPoemResult',
      'pages/searchSaying/index',
      // 'pages/mine/index',
      'pages/mine/details',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
