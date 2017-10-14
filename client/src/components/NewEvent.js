import React, { Component } from 'react';
import EventContract from '../contracts/Event.json'
import getWeb3 from '../utils/getWeb3'

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
      web3: null,
      numTickets: numTickets,
      identifiers: identifiers,
      prices: prices
    }

    this.submit = this.submit.bind(this)
  }

  componentWillMount() {
    getWeb3
    .then(results => {
      this.setState({ web3: results.web3 })
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  submit() {
    let history = this.props.history
    const contract = require('truffle-contract')
    const eventContract = contract(EventContract)
    eventContract.setProvider(this.state.web3.currentProvider)

    eventContract.new(
      this.state.numTickets,
      this.state.identifiers,
      this.state.prices,
      { from: this.state.web3.eth.accounts[0], gas: 4712388 }
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
