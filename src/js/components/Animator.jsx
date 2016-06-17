// stolen from https://github.com/ThomWright/react-mainloop/blob/622b6c33bb58603c406647ccb46514ced2aff10d/src/Animator.jsx
import React from 'react'
import MainLoop from 'mainloop.js'

// https://icecreamyou.github.io/MainLoop.js/docs/#!/api/MainLoop-method-setSimulationTimestep
const TIMESTEP = 1000 / 60
const MAX_FPS = 60

const noop = () => {}

/**
 * A wrapper to animate a given component.
 * All props are passed down to the child component.
 *
 * The getUpdate callback takes a reference to the animated component's backing instance,
 * and returns the update function.
 *
 * The update function takes the elapsed time (in milliseconds) since the last update,
 * and returns the props and context for the animated component.
 *
 * @param  {ReactComponent} AnimatedComponent
 * @param  {function} userUpdate
 * @param {function} userBegin
 * @return {ReactComponent} An animated version of the given component.
 */
const AnimatorFn = (timestep = TIMESTEP, maxFPS = MAX_FPS) =>
  (AnimatedComponent, userUpdate, userBegin) =>
    class Animator extends React.Component {
      static propTypes = {
        run: React.PropTypes.bool
      }

      static defaultProps = {
        run: true
      }

      static childContextTypes = {
        animContext: React.PropTypes.any
      }

      constructor (props) {
        super(props)

        this.state = {
          animatedProps: {}
        }
      }

      getChildContext () {
        return {
          animContext: this.state.context
        }
      }

      componentDidMount () {
        const begin = userBegin || noop

        const update = (delta) => {
          const { context, props } = userUpdate(delta)
          this.setState({
            context,
            animatedProps: props
          })
        }

        const draw = (/* interpolationPercentage */) => this.forceUpdate()

        let loop = null

        const endOfFrame = (/* fps */_, panic) => {
          // TODO let user supply callback for this
          if (panic) {
            loop.resetFrameDelta()
          }
        }

        loop = MainLoop
          // .setMaxAllowedFPS(maxFPS)
          .setSimulationTimestep(timestep)
          .setBegin(begin)
          .setUpdate(update)
          .setDraw(draw)
          .setEnd(endOfFrame)

        this.setState({
          loop,
          animatedProps: {}
        })

        if (this.props.run) {
          loop.start()
        }
      }

      componentWillReceiveProps (nextProps) {
        if (nextProps.run) {
          this.state.loop.start()
        } else {
          this.state.loop.stop()
        }
      }

      shouldComponentUpdate () {
        // doesn't affect initial render
        return false // take control of when we render using forceUpdate
      }

      componentWillUnmount () {
        this.state.loop.stop()
      }

      render () {
        return (
          <AnimatedComponent
            // ref='animated' // Warning: Stateless function components cannot be given refs
            {...this.props}
            {...this.state.animatedProps}
            context={this.state.context}
          />
        )
      }
    }

export default AnimatorFn
