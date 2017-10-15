import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Cell, TextField, Button } from 'react-md'
import Arena from './Arena'
import loadTickets from '../actions/loadTickets'
import purchaseTicket from '../actions/purchaseTicket'
import { sha3_256 } from 'js-sha3'

class Event extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      seat: null,
      name: '',
      password: '',
      tickets: []
    }

    this.selectSeat = this.selectSeat.bind(this)
    this.purchaseTicket = this.purchaseTicket.bind(this)
  }

  componentWillMount() {
    const contractAddress = this.props.match.params.contractAddress
    loadTickets(this.props.web3, contractAddress).then(tickets => {
      this.setState({tickets: tickets})
    })
  }

  selectSeat(identifier) {
    this.setState({seat: identifier})
  }

  purchaseTicket() {
    const ticket = this.state.tickets.find((t) => t.identifier === this.state.seat)
    const ticketID = this.state.tickets.findIndex((t) => t.identifier === this.state.seat)
    const ticketPrice = ticket.price
    const contractAddress = this.props.match.params.contractAddress
    const purchaserSecret = this.state.password;
    const purchaserName = this.state.name;
    const secret = ticketID + "|" + purchaserSecret + "|" + purchaserName
    const ownerHash = sha3_256(secret)
    let history = this.props.history

    this.setState({loading: true})

    purchaseTicket(this.props.web3, contractAddress, ownerHash, ticketID, ticketPrice).then(data => {
      history.push(`/${contractAddress}/ticket#${secret}`)
    })
  }

  render() {
    return (
      <div>
        <Grid>
          <Cell size={4} offset={1}>
            <span style={{fontSize:'1.5em', paddingBottom:'5px'}}>Enter your information:</span>
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
            <Button raised secondary onClick={this.purchaseTicket} disabled={this.state.loading}>{this.state.loading ? "Processing..." : "Purchase"}</Button>
          </Cell>
          <Cell size={5} offset={1}>
            <span style={{fontSize:'1.5em', paddingBottom:'5px'}}>Select your seat:</span>
            <Arena
              tickets={this.state.tickets}
              numTickets={this.state.tickets.length}
              numRows={2}
              selectedSeat={this.state.seat}
              selectSeat={this.selectSeat}
            />
            <span style={{fontSize:'2em', marginTop:"5px"}}>{this.state.seat ? `Seat: ${this.state.seat}` : ""}</span>
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
