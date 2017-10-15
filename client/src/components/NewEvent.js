import React, { Component } from 'react'
import { Grid, Cell, TextField, Button, SVGIcon } from 'react-md'
import Arena from './Arena'
import createEvent from '../actions/createEvent'

const EthereumIcon = props => (
  <SVGIcon {...props}>
    <path d="M7.963 11.98l-4.91-2.9 4.91 6.92 4.913-6.92-4.914 2.9zM8.037 0l-4.91 8.148 4.91 2.903 4.91-2.9-4.91-8.151z"></path>
  </SVGIcon>
)

class NewEvent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      numTickets: 10,
      numRows: 2,
      ticketPrice: 10
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
              rightIcon={<EthereumIcon style={{zoom: 1.5}}/>}
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
