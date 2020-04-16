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

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  config = {
    pages: [
      'pages/home/home',
      'pages/index/index',
      'pages/searchCharacter/index',
      'pages/searchIndex/index',
      'pages/searchTextLists/index',
      'pages/searchResult/index',
      'pages/searchIdiom/index',
      'pages/searchBreAfterWord/index',
      'pages/searchPoem/index',
      'pages/searchPoem/tangPoem',
      'pages/searchPoem/tangPoemResult',
      'pages/searchSaying/index'
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
