import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

class App extends React.Component {
  static propTypes = {
    dollars: PropTypes.number.isRequired,
    onAddCode: PropTypes.func.isRequired
  }

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
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  dollars: state.dollars
})

const mapDispatchToProps = (dispatch) => ({
  onAddCode: (id) => {
    dispatch({ type: 'ADD_DOLLARS', payload: 1 })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
