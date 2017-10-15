import React, { Component } from 'react'
import EventContract from '../contracts/Event.json'
import QrReader from 'react-qr-reader'
import { CircularProgress } from 'react-md'
import { sha3_256 } from 'js-sha3'

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
        width: 100,
        height: 100
      }
      return (
          <div>
            <QrReader
              delay={100}
              previewStyle={preview}
              onError={this.handleError}
              onScan={this.handleScan}
            />
          </div>
          )
    } else {
      let valid = (
          <div>
            Verifying:
            <CircularProgress id="loader"/>
          </div>
          )
      if (this.state.verified === true) {
        valid = <p> True </p>
      } else if (this.state.verified === false) {
        valid = <p> False </p>
      }
      return (
        <div>
          <p> Scanned: {this.state.scan.name} </p>
          {valid}
          <button onClick={this.reset.bind(this)}> Next Ticket </button>
        </div>
        )
    }
  }
}

export default Verifier;
