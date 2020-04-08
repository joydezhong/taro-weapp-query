import * as types from '../constants/index';

let init = {
  // 此处定义 store里面某个模块的初始state
  // current: 1,
  // pageTotal: null,
  // dataArray: []
}

export function textLists(state = init, action){
  console.log(state,'reduce state', action.payload, 'reduce action.payload') //null //不要忘记action传入的数据在action.payload
  switch(action.type) {
    case types.UPDATE_TEXT_LISTS:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
