import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Toolbar, Grid, Cell, TextField, Button } from 'react-md'
import Arena from './Arena'
import EventContract from '../contracts/Event.json'
import { sha3_256 } from 'js-sha3'

class Event extends Component {
  constructor(props) {
    super(props)

    this.state = {
      seat: null,
      name: '',
      password: '',
      tickets: []
    }

    this.selectSeat = this.selectSeat.bind(this)
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

  selectSeat(identifier) {
    this.setState({seat: identifier})
  }

  purchaseTicket() {
    const ticket = this.state.tickets.find((t) => t.identifier === this.state.seat)
    const ticketID = this.state.tickets.findIndex((t) => t.identifier === this.state.seat)
    const ticketPrice = ticket.price

    const contract = require('truffle-contract')
    const eventContract = contract(EventContract)
    const contractAddress = this.props.match.params.contractAddress
    eventContract.setProvider(this.props.web3.currentProvider)

    eventContract.at(contractAddress).then((instance) => {
      let purchaserSecret = this.state.password;
      let purchaserName = this.state.name;
      let ownerHash = sha3_256(purchaserSecret + "|" + purchaserName);

      instance.purchaseTicket(ticketID, ownerHash, {from: this.props.web3.eth.accounts[0], to: contractAddress, value: ticketPrice, gas: 500000}).then((data) => {
        let newTickets = this.state.tickets;
        newTickets[ticketID].isSold = true;

        this.setState({tickets: newTickets});
        document.write("<img src='https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" + purchaserSecret + "|" + purchaserName + "'>");
      })
    })
  }

  render() {
    return (
      <div>
        <Toolbar colored title="Eth Tickets / Event"/>
        <Grid>
          <Cell size={4} offset={1}>
            {this.state.seat ? `seat: ${this.state.seat}` : "Select a seat by clicking on it"}
            <TextField
              id="name"
              label="Enter your name"
              type="text"
              value={this.state.name}
              onChange={(value) => this.setState({name: value})}
            />

            <TextField
              id="password"
              label="Enter a password to protect your purchase"
              type="password"
              passwordIcon={null}
              value={this.state.password}
              onChange={(value) => this.setState({password: value})}
            />
            <br/>
            <Button raised secondary onClick={this.purchaseTicket}>Purchase</Button>
          </Cell>
          <Cell size={5} offset={1}>
            <Arena
              tickets={this.state.tickets}
              numTickets={this.state.tickets.length}
              numRows={2}
              selectedSeat={this.state.seat}
              selectSeat={this.selectSeat}
            />
          </Cell>
        </Grid>
      </div>
    );
  }
}

Event.propTypes = {
  contractAddress: PropTypes.string
};

export default Event;
