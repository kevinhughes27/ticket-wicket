import React, { Component } from 'react';
import EventContract from './contracts/Event.json'
import getWeb3 from './utils/getWeb3'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      tickets: []
    }
  }

  componentWillMount() {
    getWeb3
    .then(results => {
      this.setState({ web3: results.web3 })
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    const contract = require('truffle-contract')
    const eventContract = contract(EventContract)
    eventContract.setProvider(this.state.web3.currentProvider)

    eventContract.deployed().then((instance) => {
      instance.getTickets.call().then((data) => {
        let tickets = []
        for (let i = 0; i < 10; i++) {
          tickets.push({
            identifier: data[0][i].toNumber(),
            price: data[1][i].toNumber()
          })
        }
        return this.setState({tickets: tickets})
      })
    })
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.tickets.map(this.renderTicket)}
        </ul>
      </div>
    );
  }

  renderTicket(ticket) {
    return (
      <li key={ticket.identifier}>
        {ticket.identifier} {ticket.price}
      </li>
    )
  }
}

export default App;
