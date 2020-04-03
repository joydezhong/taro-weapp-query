import { UPDATE } from '../constants/index'

const INITIAL_STATE = {
  current: 1
}


export default function dictionary (state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE:
      return {
        ...state,
        current: state.current
      }
    // case MINUS:
    //   return {
    //     ...state,
    //     num: state.num - 1
    //   }
    default:
      return state
  }
}
