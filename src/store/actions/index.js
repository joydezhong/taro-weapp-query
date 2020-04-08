import * as types from '../constants/index'

export function updateTextLists(data) {
  console.log(data,'action data') // have
  return {
    type: types.UPDATE_TEXT_LISTS,
    payload: data
  }
}
