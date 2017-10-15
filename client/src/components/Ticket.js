import React, { Component } from 'react'
import QRCode from 'qrcode.react'
import { Grid, Cell, Card, CardTitle, CardText, Button } from 'react-md'

class Ticket extends Component {
  constructor(props) {
    super(props)

    this.verifyLink = this.verifyLink.bind(this)
  }

  verifyLink() {
    let history = this.props.history
    const contractAddress = this.props.match.params.contractAddress

    history.push(`/${contractAddress}/verify`)
  }

  render () {
    // substring to remove the '#' off the front
    const secret = this.props.location.hash.substring(1)

    return (
      <div style={{background:"#795548", height:"100vh"}}>
        <Grid>
          <Cell size={4} offset={4}>
            <Card>
              <CardTitle title="Here's your ticket"/>
              <CardText>
                <div style={{textAlign: 'center'}}>
                  <QRCode value={secret} />
                </div>
              </CardText>
              <Button raised primary onClick={this.verifyLink}>Verify</Button>
            </Card>
          </Cell>
        </Grid>
      </div>
    )
  }
}

export default Ticket;
