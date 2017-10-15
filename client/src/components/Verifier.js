import React, { Component } from 'react'
import EventContract from '../contracts/Event.json'
import QrReader from 'react-qr-reader'
import { CircularProgress } from 'react-md'
import { sha3_256 } from 'js-sha3'
import { Grid, Cell, Card, CardTitle, MediaOverlay, Media, CardText, Button} from 'react-md'

class Verifier extends Component {
  constructor(props) {
    super(props)

    const contract = require('truffle-contract')
    const eventContract = contract(EventContract)
    const contractAddress = this.props.match.params.contractAddress

    eventContract.setProvider(this.props.web3.currentProvider)

    eventContract.at(contractAddress).then(instance => this.setState({contract: instance}))

    this.state = {
      contract: null,
      scan: null,
      verified: null,
      error: ""
    }

    this.handleError = this.handleError.bind(this)
    this.handleScan = this.handleScan.bind(this)
  }

  handleError(err) {
    if (err != null)
      this.setState({error: err})
  }

  handleScan(scan) {
    if (scan != null) {
      let parts = scan.split("|")
      if (parts.length !== 3) {
        this.setState({error: "Invalid QR Code"})
      } else {
        let newScan = {
          name: parts[2],
          full: scan
        }
        let ownerHash = sha3_256(scan);
        this.setState({scan: newScan, verified: null})
        let ticketID = parseInt(parts[0], 10)
        console.log(scan, ticketID)
        this.state.contract.getTicketHash.call(ticketID).then(hash => {
          this.setState({verified: ownerHash === hash})
        })
      }
    }
  }

  reset() {
    this.setState({scan: null, verified: null, error: ""})
  }

  render() {
    // TODO: Display Error?
    if (this.state.contract == null) {
      return <CircularProgress id="loader" />
    } else if (this.state.scan == null) {
      const preview = {
        width: '100%',
        display: 'inline'
      }
      return (
        <Grid>
          <Cell size={8} offset={2}>
            <Card>
              <Media>
                <QrReader
                  delay={100}
                  style={preview}
                  onError={this.handleError}
                  onScan={this.handleScan}
                />
                <MediaOverlay>
                  <CardTitle title="Verify ticket" subtitle="Place your ticket's QR code in front of your camera">
                  </CardTitle>
                </MediaOverlay>
              </Media>
            </Card>
          </Cell>
        </Grid>
          )
    } else {

      let valid = (
          <div>
            Verifying:
            <CircularProgress id="loader"/>
          </div>
          )
      if (this.state.verified === true) {
        return (
          <Grid>
            <Cell size={4} offset={4}>
              <Card>
                <CardTitle style={{background:'yellowgreen'}} title='Ticket Verified!' />
                <CardText>
                  <h3>We successfully validated this ticket</h3>
                  <h4>Name on the Ticket: {this.state.scan.name}</h4>
                </CardText>
                <Button raised primary onClick={this.reset.bind(this)}> Next Ticket</Button>
              </Card>
            </Cell>
          </Grid>
        )
      } else if (this.state.verified === false) {
        return (
          <Grid>
            <Cell size={4} offset={4}>
              <Card>
                <CardTitle style={{background:'orangered'}} title='Ticket Refuted!' />
                <CardText>
                  <h3>We could not verify this ticket</h3>
                  <h4>Name on the Ticket: {this.state.scan.name}</h4>
                </CardText>
                <Button raised primary onClick={this.reset.bind(this)}> Next Ticket</Button>
              </Card>
            </Cell>
          </Grid>
        )
      }
      return ('')
    }
  }
}

export default Verifier;
