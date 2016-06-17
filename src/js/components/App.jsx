import React from 'react'

export default class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      dollars: 0
    }

    this.addCode = this.addCode.bind(this)
  }

  addCode () {
    this.setState({ dollars: this.state.dollars + 1 })
  }

  render () {
    return (
      <div className='ayy'>
        <h1>
          Dollars:&nbsp;<span>{this.state.dollars}</span>
        </h1>
        <button onClick={this.addCode}>write code</button>
      </div>
    )
  }
}
