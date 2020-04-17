import * as types from '../constants/index'

export function updateTextLists(data) {
  return {
    type: types.UPDATE_TEXT_LISTS,
    payload: data
  }
}
