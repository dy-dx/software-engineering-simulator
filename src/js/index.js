import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Animator from './components/Animator'
import App from './components/App'

const TIMESTEP = 1000 / 60 // https://icecreamyou.github.io/MainLoop.js/docs/#!/api/MainLoop-method-setSimulationTimestep
const MAX_FPS = Infinity
const animate = new Animator(TIMESTEP, MAX_FPS)

const initialState = {
  dollars: 0
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_DOLLARS':
      return { ...state, dollars: state.dollars + action.payload }
    default:
      return state
  }
}
const store = createStore(reducer, initialState, window.devToolsExtension && window.devToolsExtension())

// https://icecreamyou.github.io/MainLoop.js/docs/#!/api/MainLoop-method-setUpdate

// const update = (delta) => (
//   // ??? what is this ??? https://github.com/ThomWright/react-mainloop
//   {
//     context: {},
//     props: {
//       dollars: store.getState()
//     }
//   }
// )
const update = (delta) => ({})

const MyAnimatedComponent = animate(App, update)
const elem = React.createElement(MyAnimatedComponent)
const root = React.createElement(Provider, { store }, elem)
ReactDOM.render(root, document.querySelector('#main'))
