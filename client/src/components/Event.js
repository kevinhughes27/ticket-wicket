import React, { Component } from 'react'
import PropTypes from 'prop-types'
import EventContract from '../contracts/Event.json'
import { sha3_256 } from 'js-sha3'

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
            price: data[1][i].toNumber(),
            isSold: data[2][i],
          })
        }
        return this.setState({tickets: tickets})
      })
    })
  }

  render() {
    return (
      <div>
        <div>
          Enter a secret key to protect your purchase:
          <input type="text" id="purchaser_secret" />
        </div>
        <div>
          Enter your name:
          <input type="text" id="purchaser_name" />
        </div>
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
        (Owner: {ticket.isSold ? "Sold" : "Available"}) <button onClick={this.purchaseTicket.bind(this, ticket.identifier, ticket.price)}>Purchase ticket</button>
      </li>
    )
  }

  purchaseTicket(ticketID, ticketPrice) {
    const contract = require('truffle-contract')
    const eventContract = contract(EventContract)
    const contractAddress = this.props.match.params.contractAddress
    eventContract.setProvider(this.props.web3.currentProvider)

    eventContract.at(contractAddress).then((instance) => {
      let purchaserSecret = document.getElementById("purchaser_secret").value;
      let purchaserName = document.getElementById("purchaser_name").value;
      let ownerHash = sha3_256(purchaserSecret + "|" + purchaserName);

      instance.purchaseTicket(ticketID, ownerHash, {from: this.props.web3.eth.accounts[0], to: contractAddress, value: ticketPrice, gas: 500000}).then((data) => {
        let newTickets = this.state.tickets;
        newTickets[ticketID].isSold = true;

        this.setState({tickets: newTickets});
        document.write("<img src='https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" + purchaserSecret + "|" + purchaserName + "'>");
      })
    })
  }
}

Event.propTypes = {
  contractAddress: PropTypes.string
};

export default Event;
