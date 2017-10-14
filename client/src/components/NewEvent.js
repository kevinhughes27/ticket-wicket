import React, { Component } from 'react'
import createEvent from '../actions/createEvent'

class NewEvent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      numTickets: 10,
      ticketPrice: 100
    }

    this.submit = this.submit.bind(this)
  }

  submit() {
    let history = this.props.history

    let identifiers = []
    let prices = []

    for (let i = 0; i < this.state.numTickets; i++) {
      identifiers.push(i+1);
      prices.push(this.state.ticketPrice);
    }

    createEvent(
      this.props.web3,
      this.state.numTickets,
      identifiers,
      prices,
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

        <br/>

        <label>
          Number of Tickets
          <input value={this.state.numTickets} onChange={(ev) => this.setState({numTickets: ev.target.value})}/>
        </label>

        <br/>

        <label>
          Ticket Price
          <input value={this.state.ticketPrice} onChange={(ev) => this.setState({ticketPrice: ev.target.value})}/>
        </label>

        <br/>

        <button onClick={this.submit}>Create</button>
      </div>
    )
  }
}

export default NewEvent
