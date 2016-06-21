/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './engine/store'
import Animator from './components/Animator'
import App from './components/App'
import Game from './engine/Game'

const TIMESTEP: number = 1000 / 60 // https://icecreamyou.github.io/MainLoop.js/docs/#!/api/MainLoop-method-setSimulationTimestep
const MAX_FPS: number = Infinity
const animate = new Animator(TIMESTEP, MAX_FPS)
const game = new Game()
game.setStore(store)

// https://icecreamyou.github.io/MainLoop.js/docs/#!/api/MainLoop-method-setUpdate
const update = (delta: number) => {
  game.update(delta)
//   // ??? what is this ??? https://github.com/ThomWright/react-mainloop
//   {
//     context: {},
//     props: {
//       dollars: store.getState()
//     }
//   }
// )
  return {}
}

const MyAnimatedComponent = animate(App, update)
const elem = React.createElement(MyAnimatedComponent)
const root = React.createElement(Provider, { store }, elem)
ReactDOM.render(root, document.querySelector('#main'))
