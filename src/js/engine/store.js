/* @flow */
import { createStore } from 'redux'

type State = {
  dollars: number,
  keystrokes: number,
  workers: {
    engineers: number
  }
};

const initialState: State = {
  dollars: 0,
  keystrokes: 0,
  workers: {
    engineers: 0
  }
}

const reducer = (state: State, action): State => {
  switch (action.type) {
    case 'ADD_DOLLARS':
      return {
        ...state,
        dollars: state.dollars + action.payload
      }
    case 'ADD_KEYSTROKES':
      return { ...state, dollars: state.dollars + action.payload }
    case 'ADD_ENGINEERS':
      return {
        ...state,
        dollars: state.dollars - 10,
        workers: {
          ...state.workers,
          engineers: state.workers.engineers + action.payload
        }
      }
    default:
      return state
  }
}

const store = createStore(
  reducer,
  initialState,
  window.devToolsExtension && window.devToolsExtension()
)

export default store
