import React, { Component } from 'react'
import createEvent from '../actions/createEvent'

class NewEvent extends Component {
  constructor(props) {
    super(props)

    let numTickets = 10
    let identifiers = [];
    let prices = [];

    for (let i = 0; i < numTickets; i++) {
      identifiers.push(i+1);
      prices.push(100);
    }

    this.state = {
      numTickets: numTickets,
      identifiers: identifiers,
      prices: prices
    }

    this.submit = this.submit.bind(this)
  }

  submit() {
    let history = this.props.history

    createEvent(
      this.props.web3,
      this.state.numTickets,
      this.state.identifiers,
      this.state.prices,
    ).then(contract => {
      history.push(`/${contract.address}`)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  render () {
    return (
      <div>
        <h1>New Event</h1>
        <p>{this.state.numTickets}</p>
        <p>{this.state.identifiers.toString()}</p>
        <p>{this.state.prices.toString()}</p>
        <button onClick={this.submit}>Create</button>
      </div>
    )
  }
}

export default NewEvent
