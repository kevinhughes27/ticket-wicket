import React, { Component } from 'react'
import PropTypes from 'prop-types'
import EventContract from '../contracts/Event.json'

class Event extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tickets: []
    }

    this.renderTicket = this.renderTicket.bind(this)
    this.purchaseTicket = this.purchaseTicket.bind(this)
  }

  componentWillMount() {
    this.instantiateContract()
  }

  instantiateContract() {
    const contract = require('truffle-contract')
    const eventContract = contract(EventContract)
    const contractAddress = this.props.match.params.contractAddress

    eventContract.setProvider(this.props.web3.currentProvider)

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
        (Owner: {ticket.owner}) <button onClick={this.purchaseTicket.bind(ticket.identifier)}>Purchase ticket</button>
      </li>
    )
  }

  purchaseTicket(ticketID) {
    const contract = require('truffle-contract')
    const eventContract = contract(EventContract)
    eventContract.setProvider(this.props.web3.currentProvider)

    eventContract.deployed().then((instance) => {
      instance.purchaseTicket(1, "Very secret", {from: this.props.web3.eth.accounts[0], gas: 42000}).then((data) => {
        alert("You got it!")
      })
    })
  }
}

Event.propTypes = {
  contractAddress: PropTypes.string
};

export default Event;
