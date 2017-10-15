import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { CircularProgress, Toolbar } from 'react-md'
import getWeb3 from '../utils/getWeb3'
import NewEvent from './NewEvent'
import Event from './Event'
import Ticket from './Ticket'
import Verifier from './Verifier'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      web3: null
    }
  }

  componentWillMount() {
    getWeb3
    .then(results => {
      this.setState({ web3: results.web3 })
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  render () {
    if (this.state.web3) {
      return (
        <BrowserRouter>
          <div>
            <Toolbar colored title="" children={[<img src="/logo.png" width="205" height="51" style={{marginTop: 7, marginLeft: 15}} />]}/>
            <Route exact path="/" render={(props) => (
              <NewEvent {...props} web3={this.state.web3}/>
            )}/>
            <Route exact path="/:contractAddress" render={(props) => (
              <Event {...props} web3={this.state.web3}/>
            )}/>
            <Route path="/:contractAddress/verify" render={(props) => (
              <Verifier {...props} web3={this.state.web3}/>
            )}/>
            <Route path="/:contractAddress/ticket" component={Ticket} />
          </div>
        </BrowserRouter>
      )
    } else {
      return (
        <CircularProgress id="loader"/>
      )
    }
  }
}

export default App;
