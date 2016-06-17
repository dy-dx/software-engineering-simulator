import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import Animator from './components/Animator'
import App from './components/App'

const TIMESTEP = 1000 / 60 // https://icecreamyou.github.io/MainLoop.js/docs/#!/api/MainLoop-method-setSimulationTimestep
const MAX_FPS = Infinity
const animate = new Animator(TIMESTEP, MAX_FPS)

const dollarCounter = (state = 0, action) => {
  switch (action.type) {
    case 'ADD_DOLLARS':
      return state + action.payload
    default:
      return state
  }
}
const store = createStore(dollarCounter)

// https://icecreamyou.github.io/MainLoop.js/docs/#!/api/MainLoop-method-setUpdate
const update = (delta) => (
  // ??? what is this ??? https://github.com/ThomWright/react-mainloop
  {
    context: {},
    props: {
      dollars: store.getState()
    }
  }
)

const MyAnimatedComponent = animate(App, update)
const elem = React.createElement(MyAnimatedComponent, {
  dollars: store.getState(),
  onAdd: (diff) => {
    store.dispatch({ type: 'ADD_DOLLARS', payload: diff })
  }
})
ReactDOM.render(elem, document.querySelector('#main'))
