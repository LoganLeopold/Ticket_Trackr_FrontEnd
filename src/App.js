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

  componentDidMount() {
    console.log('App mounted yo')
  }

  render() {
    console.log('App rendered boi')
    return (
      <main>
      <Route path='/tester' exact render={(routerProps) => <Tester {...routerProps}{...this.state}/>} />
      </main>
    );
  }
}

export default App;
