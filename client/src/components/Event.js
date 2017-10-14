import React, { Component } from 'react'
import PropTypes from 'prop-types'
import EventContract from '../contracts/Event.json'
import getWeb3 from '../utils/getWeb3'

class Event extends Component {
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
    const contractAddress = this.props.match.params.contractAddress

    eventContract.setProvider(this.state.web3.currentProvider)

    eventContract.at(contractAddress).then((instance) => {
      instance.getTickets.call().then((data) => {
        let tickets = []
        let numTickets = data[0].length
        for (let i = 0; i < numTickets; i++) {
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

Event.propTypes = {
  contractAddress: PropTypes.string
};

export default Event;
