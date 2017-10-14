import React, { Component } from 'react';
import EventContract from './contracts/Event.json'
import getWeb3 from './utils/getWeb3'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      array: []
    }
  }

  componentWillMount() {
    getWeb3
    .then(results => {
      this.setState({ web3: results.web3 })
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    const contract = require('truffle-contract')
    const eventContract = contract(EventContract)
    eventContract.setProvider(this.state.web3.currentProvider)

    eventContract.deployed().then((instance) => {
      instance.getArray.call().then((array) => {
        return this.setState({array: array})
      })
    })
  }

  render() {
    return (
      <div>
        {this.state.array.toString()}
      </div>
    );
  }
}

export default App;
