import React from 'react'
import ReactDOM from 'react-dom'
import Animator from './components/Animator'
import App from './components/App'

const TIMESTEP = 1000 / 60 // https://icecreamyou.github.io/MainLoop.js/docs/#!/api/MainLoop-method-setSimulationTimestep
const MAX_FPS = Infinity
const animate = new Animator(TIMESTEP, MAX_FPS)
// https://icecreamyou.github.io/MainLoop.js/docs/#!/api/MainLoop-method-setUpdate
const update = (delta) => (
  // ??? what is this ??? https://github.com/ThomWright/react-mainloop
  {
    context: {},
    props: {}
  }
)

const MyAnimatedComponent = animate(App, update)

ReactDOM.render(React.createElement(MyAnimatedComponent), document.querySelector('#main'))
