import React, { Component } from 'react'
import { Grid, Cell, TextField, Button } from 'react-md'
import Arena from './Arena'
import createEvent from '../actions/createEvent'

class NewEvent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      numTickets: 10,
      numRows: 2,
      ticketPrice: 100
    }

    this.submit = this.submit.bind(this)
  }

  submit() {
    let history = this.props.history

    let identifiers = []
    let prices = []

    for (let i = 0; i < this.state.numTickets; i++) {
      identifiers.push(i+1)
      prices.push(this.state.ticketPrice)
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
        <Grid>
          <Cell size={4} offset={1}>
            <TextField
              id="numTickets"
              label="Number of Tickets"
              type="number"
              customSize="title"
              value={this.state.numTickets}
              onChange={(value) => this.setState({numTickets: value})}
            />

            <TextField
              id="numRows"
              label="Number of Rows"
              type="number"
              customSize="title"
              value={this.state.numRows}
              onChange={(value) => this.setState({numRows: value})}
            />

            <TextField
              id="price"
              label="Ticket Price"
              type="number"
              customSize="title"
              value={this.state.ticketPrice}
              onChange={(value) => this.setState({ticketPrice: value})}
            />
            <br/>
            <Button raised secondary onClick={this.submit}>Create</Button>
          </Cell>
          <Cell size={5} offset={1}>
            <Arena numTickets={this.state.numTickets} numRows={this.state.numRows}/>
          </Cell>
        </Grid>
      </div>
    )
  }
}

export default NewEvent
