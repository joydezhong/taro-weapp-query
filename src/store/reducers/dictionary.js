import * as types from '../constants/index';

let init = {
  // 此处定义 store里面某个模块的初始state
  current: 1,
  dataArray: []
}

export function textLists(state = init, action){
  console.log(state,'reduce state')
  switch(action.type) {
    case types.UPDATE_TEXT_LISTS:
      return state
    default:
      return state
  }
}
