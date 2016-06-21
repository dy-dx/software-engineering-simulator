/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { addKeystrokes, addEngineers } from '../engine/actioncreators'

class App extends React.Component {
  static propTypes = {
    dollars: PropTypes.number.isRequired,
    engineers: PropTypes.number.isRequired,
    onAddCode: PropTypes.func.isRequired,
    onAddEngineer: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className='ayy'>
        <h1>
          Dollars:&nbsp;<span>{this.props.dollars}</span>
        </h1>
        <button onClick={this.props.onAddCode}>write code</button>
        <h1>
          Engineers:&nbsp;<span>{this.props.engineers}</span>
        </h1>
        <button onClick={this.props.onAddEngineer}>hire engineer</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  dollars: state.dollars,
  engineers: state.workers.engineers
})

const mapDispatchToProps = (dispatch) => ({
  onAddCode: () => {
    dispatch(addKeystrokes(1))
  },
  onAddEngineer: () => {
    dispatch(addEngineers(1))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
