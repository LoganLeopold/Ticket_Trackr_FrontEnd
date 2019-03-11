import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom'
import Tester from './Tester'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      test: []
    }
  }
  render() {
    return (
      <Route path='/tester' exact render={(routerProps) => <Tester {...routerProps}{...this.state}/>} />
    );
  }
}

export default App;
