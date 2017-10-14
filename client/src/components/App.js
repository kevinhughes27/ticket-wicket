import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import getWeb3 from '../utils/getWeb3'
import NewEvent from './NewEvent'
import Event from './Event'

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
            <Route exact path="/" render={(props) => (
              <NewEvent {...props} web3={this.state.web3}/>
            )}/>
            <Route path="/:contractAddress" render={(props) => (
              <Event {...props} web3={this.state.web3}/>
            )}/>
          </div>
        </BrowserRouter>
      )
    } else {
      return (
        <div>
          No Web3
        </div>
      )
    }
  }
}

export default App;
