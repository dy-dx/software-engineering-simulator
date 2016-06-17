import React from 'react'

export default class App extends React.Component {
  static propTypes = {
    dollars: React.PropTypes.number.isRequired,
    onAdd: React.PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    this.addCode = this.addCode.bind(this)
  }

  addCode () {
    this.props.onAdd(1)
  }

  render () {
    return (
      <div className='ayy'>
        <h1>
          Dollars:&nbsp;<span>{this.props.dollars}</span>
        </h1>
        <button onClick={this.addCode}>write code</button>
      </div>
    )
  }
}
