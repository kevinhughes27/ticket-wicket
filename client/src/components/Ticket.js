import React, { Component } from 'react'
import QRCode from 'qrcode.react'
import { Grid, Cell, Card, CardTitle, CardText } from 'react-md'

class Ticket extends Component {
  render () {
    const secret = this.props.location.hash

    return (
      <Grid>
        <Cell size={4} offset={4}>
          <Card>
            <CardTitle title="Your Ticket"/>
            <CardText>
              <div style={{textAlign: 'center'}}>
                <QRCode value={secret} />
              </div>
            </CardText>
          </Card>
        </Cell>
      </Grid>
    )
  }
}

export default Ticket;
