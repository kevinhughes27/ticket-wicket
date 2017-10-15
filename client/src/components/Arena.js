import React, { Component } from 'react'
import { Card, CardTitle, CardText } from 'react-md'
import SeatIcon from './SeatIcon'

class Arena extends Component {
  render() {
    let rows
    if (this.props.tickets) {
      rows = buildRowsFromTickets(this.props)
    } else {
      rows = buildRows(this.props)
    }

    return (
      <Card>
        <CardTitle title="Air Canada Centre"/>
        <CardText>
          <table>
            <tbody>
              {rows}
            </tbody>
          </table>
        </CardText>
      </Card>
    )
  }
}

function buildRowsFromTickets(props) {
  const {tickets, numRows, selectSeat, selectedSeat } = props
  const numTickets = tickets.length
  const seatsPerRow = Math.ceil(numTickets / numRows)

  let rows = []
  for(let i = 0; i < numRows; i++) {
    let seats = []
    for(let j = 0; j < seatsPerRow; j++) {
      const seatIndex = j*numRows+i
      if (seatIndex < numTickets) {
        const ticket = tickets[seatIndex]
        const identifier = ticket.identifier
        const isSold = ticket.isSold
        const isSelected = identifier === selectedSeat

        if (isSold) {
          seats.push(<td key={j}><SeatIcon style={{color: 'red', zoom: 2}}/></td>)
        } else if (isSelected) {
          seats.push(<td key={j}><SeatIcon style={{color: 'yellowgreen', zoom: 2}}/></td>)
        } else {
          seats.push(
            <td key={j} onClick={selectSeat.bind(this, identifier)}>
              <SeatIcon style={{zoom: 2}}/>
            </td>
          )
        }
      }
    }
    rows.push(<tr key={i}>{seats}</tr>)
  }

  return rows
}

function buildRows(props) {
  const { numRows, numTickets } = props
  const seatsPerRow = Math.ceil(numTickets / numRows)

  let rows = []
  for(let i = 0; i < numRows; i++) {
    let seats = []
    for(let j = 0; j < seatsPerRow; j++) {
      const seatIndex = j*numRows+i
      if (seatIndex < numTickets) {
        seats.push(<td key={j}><SeatIcon style={{zoom: 2}}/></td>)
      }
    }
    rows.push(<tr key={i}>{seats}</tr>)
  }

  return rows
}

export default Arena
