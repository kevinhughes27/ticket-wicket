import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import NewEvent from './NewEvent'
import Event from './Event'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={NewEvent}/>
          <Route path="/:contractAddress" component={Event}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
